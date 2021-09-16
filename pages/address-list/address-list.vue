<template>
	<view class="page">
		<view class="address-list">
			<view class="panel" v-for="(data,index) in lists" :key="data._id">
				<view class="panel-body bottom">
					<view class="info">
						<text class="nick">{{data.name}}</text>
						<text class="telphone">{{data.tel|VisibileTel}}</text>
					</view>
					<view class="detail">{{data.addr_text}}{{data.detail}}</view>
				</view>

				<view class="panel-footer">
					<button class="btn del" @click="del(data._id,index)">删除地址</button>
					<button class="btn" @click="toAuth('/pages/address-edit/address-edit?id='+data._id)">编辑地址</button>
					<button class="btn " :class="data.is_default?'active':''" @click="setDefault(data._id,index)">默认地址</button>
				</view>
			</view>
		</view>
		<view class="btn-add">
			<button @click="goAddressEdit">新增收货地址</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists:[]
			}
		},
		onShow() {
			this.getAddressLists();
		},
		methods: {
			getAddressLists(){
				let uid = this.$store.getters.uid;
				let token = this.$store.getters.token;
				this.$api.getAddresslists({uid,token}).then(response=>{
					//console.log(response);
					this.lists=response.data
				})
			},
			setDefault(id,index){
				let uid=this.$store.getters.uid;
				let _id=id
				this.$api.setDefaultAddress({uid,_id}).then(response=>{
					// console.log(response);
					this.toast(response.msg)
					this.lists.map(v=>{
						v.is_dafult=false
					});
					this.lists[index].is_default=true;
					this.$forceUpdate()
				})
			},
			del(id,index){
				let uid = this.$store.getters.uid;
				this.$api.deleteAddress({_id:id,uid}).then(response=>{
					this.lists.splice(index,1);
					this.$forceUpdate()
				})
			},
			goAddressEdit() {
				uni.navigateTo({
					url: "/pages/address-edit/address-edit"
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		width: 100%;
		height: 100%;

		.address-list {
			margin: 32rpx;

			.panel {
				background-color: #fff;
				border-radius: 24rpx;
				padding: 16rpx;
				margin: 32rpx 0;

				.panel-body {
					padding: 16rpx 0;
					display: flex;
					flex-direction: column;

					.info {
						margin-bottom: 20rpx;

						text {
							margin-right: 32rpx;
						}
					}
				}

				.panel-footer {
					display: flex;
					justify-content: flex-end;
					padding-top: 20rpx;

					.btn {
						font-size: 24rpx;
						margin: 0;
						border-radius: 24rpx;
						background-color: rgba(0, 0, 0, 0);
						color: #333;
						line-height: 1.8;
						margin-left: 20rpx;
						border: 1px solid #ccc;
					}
					.active{
						background-color:$uni-color-primary ;
						color: #fff;
						border-color: $uni-color-primary;
					}
					.btn::after {
						border: none;
					}

					.del {
						border: 1px solid $uni-color-primary;
						color: $uni-color-primary;
					}

				}
			}
		}

		.btn-add {
			margin: 0 32rpx;

			button {
				background-color: #e13031;
				color: #fff;
				border-radius: 60rpx;
				width: 80%;
			}
		}
	}
</style>
