<template>
	<view class="page">
		<view class="user">
			<view class="info">
				<view class="pre">
					<view class="avator">
						<image :src="avatar" mode=""></image>
					</view>
					<view class="name" @click="login">
						<text>{{nickname}}</text>
						<text>{{username}}</text>
					</view>
				</view>
				<view class="setting" @click="toAuth('/pages/user-edit/user-edit')">
					<!-- 跳转 goUserEdit -->
					<!-- <navigator url="/pages/user-edit/user-edit"> -->
					<text class="icon icon-shezhi"></text>
					</navigator>
				</view>
			</view>
			<view class="count">
				<view class="item" @click="to('/pages/fav-list/fav-list')">
					<view class="num">6</view>
					<view class="label">
						商品收藏
					</view>
				</view>
				<view class="item">
					<view class="num">6</view>
					<view class="label">
						商品收藏
					</view>
				</view>
				<view class="item">
					<view class="num">6</view>
					<view class="label">
						商品收藏
					</view>
				</view>
			</view>
		</view>
		<view class="order">
			<view class="item" @click="toAuth('/pages/order-list/order-list?status=1')">
				<view class="item-icon">
					<text class="icon icon-daifukuan1"></text>
				</view>
				<view class="label">
					待付款
				</view>
			</view>
			<view class="item"  @click="toAuth('/pages/order-list/order-list?status=3')">
				<view class="item-icon">
					<text class="icon icon-daifukuan1"></text>
				</view>
				<view class="label">
					待收货
				</view>
			</view>
			<view class="item"  @click="toAuth('/pages/order-list/order-list?status=6')">
				<view class="item-icon">
					<text class="icon icon-daipingjia1"></text>
				</view>
				<view class="label">
					待评价
				</view>
			</view>
			<view class="item"  @click="toAuth('/pages/order-list/order-list?status=0')">
				<view class="item-icon">
					<text class="icon icon-tuikuan"></text>
				</view>
				<view class="label">
					全部
				</view>
			</view>
		</view>
		<view class="cells">
			<view class="cell bottom " @click="toAuth('/pages/address-list/address-list')">
				<view class="label">
					地址管理
				</view>
				<view class="content">
					<text class="icon icon-pull-left"></text>
				</view>
			</view>
			<view class="cell bottom">
				<view class="label">
					修改密码
				</view>
				<view class="content">
					<text class="icon icon-pull-left"></text>
				</view>
			</view>
			<view class="cell bottom">
				<view class="label">
					关于我们
				</view>
				<view class="content">
					<text class="icon icon-pull-left"></text>
				</view>
			</view>
			<view class="cell bottom" @click="to('/pages/contact/contact')">
				<view class="label">
					联系我们
				</view>
				<view class="content">
					<text class="icon icon-pull-left"></text>
				</view>
			</view>
			<view class="cell bottom" @click="toAbout">
				<view class="label">
					关于小莱
				</view>
				<view class="content">
					<text class="icon icon-pull-left"></text>
				</view>
			</view>
			<!-- #ifdef APP-PLUS  -->
			<view class="cell bottom">
				<view class="label">
					清除缓存
				</view>
				<view class="content">
					<text class="icon icon-pull-left"></text>
				</view>
			</view>

			<view class="cell bottom">
				<view class="label">
					检查更新
				</view>
				<view class="content">
					<text class="icon icon-pull-left"></text>
				</view>
			</view>
			<!-- #endif -->

		</view>
		<view class="logout">
			<button class="btn" @click="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
	//	import {mapActions} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			this.$store.dispatch('getUser', this.$store.getters.token);
			//this.getUsers(this.$store.getters.token)
			// this.info = this.$store.state.userInfo;
			//昵称没有  1.未登陆  2.登陆成功,没有编辑个人信息
		},
		computed: {
			info(){
				return{
					...this.$store.state.userInfo
				}
			},
			nickname() {
				if (!this.$store.getters.uid) {
					return '请登录'
				}
				let nickname = this.info.nickname;
				let username = this.info.username;
				return nickname || username;
			},
			username() {
				if (!this.$store.getters.uid) {
					return ''
				}
				return "用户名:" + this.info.username
			},
			avatar() {
				if (!this.$store.getters.uid) {
					return '../../static/youxuan1.png'
				}
				let avatar = this.info.avatar;
				return avatar || '../../static/youxuan1.png'
			}
		},
		methods: {
			goUserEdit() {
				uni.navigateTo({ // uni-app 提供的API页面跳转
					url: "/pages/user-edit/user-edit"
				})
			},
			goAddresslist() {
				uni.navigateTo({
					url: "/pages/address-list/address-list"
				})
			},
			toContatc() {
				uni.navigateTo({
					url: "/pages/contact/contact"
				})
			},
			toAbout() {
				uni.navigateTo({
					url: "/pages/about/about"
				})
			},
			logout() {
				this.$store.commit('logout');
				this.toast('退出成功')
			},
			//...扩展运算符,数组或对象
			// ...mapActions({
			// 	getUsers:'getUser'
			// })
			login(){
				if(!this.$store.getters.uid){
					this.to('/pages/public/login')
				}
			}
		}
	}
</script>

<style lang="scss">
	.page {
		width: 100%;
		height: 100%;

		.user {
			background: linear-gradient(90deg, #eb3c3c, #ff7459);
			padding: 40rpx 32rpx;
			color: #fff;

			.info {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.pre {
					display: flex;
					align-items: center;

					.avator {
						width: 160rpx;
						height: 160rpx;
						margin-right: 32rpx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 50%;
							background-color: #fff;
						}
					}

					.name {
						display: flex;
						flex-direction: column;
					}
				}

				.setting {
					font-size: 40rpx;

					.icon {
						font-size: 40rpx;
					}
				}
			}

			.count {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 160rpx;

				.item {
					flex: 1;
					text-align: center;

					.num {
						font-size: 32rpx;
					}

					.label {
						margin-top: 10rpx;
					}
				}
			}
		}

		.order {
			display: flex;
			background-color: #fff;
			height: 160rpx;
			align-items: center;
			justify-content: center;
			border-radius: 24rpx;
			margin-top: -20rpx;

			.item {
				flex: 1;
				text-align: center;
				font-size: 28rpx;

				.item-icon {
					margin-bottom: 10rpx;

					.icon {
						font-size: 60rpx;
					}
				}
			}
		}



		.logout {
			background-color: #FFFFFF;
			border-radius: 24rpx;
			overflow: hidden;

			.btn {
				background-color: #fff;
				font-size: 32rpx;

				&::after {
					border: 0;
				}
			}
		}
	}
</style>
