<template>
	<view class="page">
		<view class="header">
			<view class="back">
				<text class="icon icon-xiangzuojiantou"></text>
			</view>
			<view class="title">
				<view>商品</view>
				<view>评价</view>
				<view>详情</view>
			</view>
			<view class="share">
				<text class="icon icon-fenxiang"></text>
			</view>
		</view>
		<view class="main">
			<view class="swiper-container">

				<swiper class="swiper" indicator-dots="true" indicator-color="#fff" autoplay="true">
					<swiper-item v-for="(item,index) in data.banner" :key="index">
						<image :src="item"></image>
					</swiper-item>
					<!-- <swiper-item>
						<image src="../../static/img1.jpg"></image>
					</swiper-item>
					<swiper-item>
						<image src="../../static/img1.jpg"></image>
					</swiper-item> -->
				</swiper>
			</view>
			<view class="box">
				<view class="goods-price">
					<text class="price">
						￥<text>{{data.price}}</text>.00
					</text>
					<text class="old-price">
						￥{{data.old_price}}
					</text>
				</view>
				<view class="goods-title">
					{{data.name}}
				</view>
				<view class="info">
					<text>快递: 包邮</text>
					<text>销量: {{data.sales}}</text>
				</view>
			</view>
		</view>
		<view class="evaluate">
			<view class="title">
				<view class="label">
					<text>评价</text>
					<text>{{commentCount}}</text>
				</view>
				<view class="more">
					<text>查看更多</text>
					<text class="icon icon-pull-left"></text>
				</view>
			</view>
			<view class="lists">
				<view class="box bottom" v-for="item in comment" :key="item._id">
					<view class="box-title ">
						<image src="../../shopss/src/static/youxuan.png" mode=""></image>
						<text>{{item.username}}</text>
					</view>
					<view class="box-content">
						<text class="line-3">
							{{item.content}}
						</text>
					</view>
					<view class="box-images" v-for='(value,index) in item.img' :key="index">
						<image :src="value" mode=""></image>
						<!-- 	<image src="../../static/img1.jpg" mode=""></image>
						<image src="../../static/img1.jpg" mode=""></image>
						<image src="../../static/img1.jpg" mode=""></image> -->
					</view>
				</view>
			</view>
		</view>
		<view class="detail">
			<view class="title">
				<text>图文详情</text>
			</view>
			<view class="content">
				<rich-text :nodes="data.desc"></rich-text>
			</view>
		</view>
		<view class="nav-footer">
			<view @click="love"><text class="icon icon-love" :class="is_fav?'active':''"></text> <text>收藏</text></view>
			<view  @click="goCart"><text class="icon icon-cart"></text> <text>购物车</text></view>
			<view><text class="icon icon-kefu"></text> <text>客服</text></view>
			<button class="btn btn-cart" @click="addCart">加入购物车</button>
			<button class="btn btn-buy" @click="addBuy">立即购买</button>
		</view>
		<view class="popup" v-show="showPopup">
			<view class="mask"></view>
			<view class="popup-content">
				<text class="close icon icon-cuowu" @click="showPopup=false"></text>
				<view class="popup-header">
					<view class="images">
						<image :src="data.img"></image>
					</view>
					<view class="info">
						<view class="price">￥{{sku.price}}</view>
						<view class="sku-info">{{sku.text}}</view>
					</view>
				</view>
				<view class="popup-body">
					<view class="sku-row" v-for="(item,i) in data.attr" :key="i">
						<view class="title">{{item.text}}</view>
						<view class="sku" @click="changeSku(i,childrenIndex)"
							v-for="(children,childrenIndex) in item.values" :key="childrenIndex"
							:class="item.checked==childrenIndex?'active':''">{{children.text}}</view>
					</view>
				</view>
				<view class="popup-footer">
					<button class="btn" @click="buy">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_id: '',
				data: {},
				comment: [],
				commentCount: 0,
				sku: {},
				showPopup: false,
				is_fav: 0,
				type: '',
				num: 1
			}
		},
		onLoad(params) {
			this.goods_id = params.id;

			this.getDetail();
			this.getcomment()
		},
		methods: {
			goCart(){
				uni.switchTab({    //跳转tab页面
					url:'/pages/cart/cart'
				})
			},
			buy() {
				
				let {_id,	name,	price,	img	} = this.data;
				let uid = this.$store.getters.uid;
				if(!uid){
					this.toast('请先登陆');
					this.showPopup=false
					return;
					// this.to('/pages/login/login')
				}
				let type = this.type;
				let num = this.num;
				let attr = this.sku.text.join() == '暂无规格' ? '' : this.sku.text.join();
				
				this.$api.addCart({
					name,
					price,
					img,
					type,
					num,
					attr,
					uid,
					goods_id: _id
				}).then(response => {
					// console.log(response);
					if (response.code == 1) {
						if (this.type == 'buy') {
							//后期需要传值
							this.to('/pages/create-order/create-order')
						} else {
							this.toast('加入购物车成功', 'success');
							this.showPopup = false;
						}
					} else {
						this.toast(response.msg)
					}
				})
			},
			addBuy() {
				this.showPopup = true;
				this.type = "buy"
			},
			addCart() {
				this.showPopup = true;
				this.type = "cart"
			},
			love() {
				let {
					_id,
					name,
					price,
					img
				} = this.data;
				let uid = this.$store.getters.uid;
				let is_fav = this.is_fav;
				this.$api.fav({
					uid,
					is_fav,
					name,
					price,
					img,
					goods_id: _id
				}).then(response => {
					console.log(response);
					if (response.code == 1) {
						this.toast(response.msg, "success");
						this.is_fav = this.is_fav ? 0 : 1;
					} else {
						this.toast(response.msg)
					}
				})
			},
			//商品详情
			getDetail() {
				let {
					goods_id
				} = this;
				let uid = this.$store.getters.token;
				// console.log(uid)
				this.$api.getProductDatail({
					goods_id,
					uid
				}).then(response => {
					//console.log(response);
					this.data = response.data[0];
					//console.log(response)
					this.fav = response.is_fav
					if (this.data.attr.length == 0) {
						this.sku = {
							price: this.data.price,
							text: ["暂无规格"],
							stock: this.data.stock
						};
						return;
					}
					this.data.attr.forEach(v => {
						v.checked = 0; //设置选中索引
					});
					this.getSku();
				})
			},
			//商品评价
			getcomment() {
				let {
					goods_id
				} = this

				this.$api.getProductComment({
					goods_id,
					skip: 0,
					limit: 10
				}).then(response => {
					//console.log(response);
					this.comment = response.data;
					this.commentCount = response.count;
				})
			},
			getSku() {
				let arr = this.data.attr.map(v => {
					return v.values[v.checked].text;
				}).join();
				//console.log(arr);
				this.sku = this.data.table.find(v => {
					return v.text.join() == arr;
				})
			},
			changeSku(index, childrenIndex) {

				this.data.attr[index].checked = childrenIndex
				//更新视图
				this.$forceUpdate();
				this.getSku();
			}
		}
	}
</script>

<style lang="scss">
	.header {
		height: 90rpx;
		width: 100%;
		position: fixed;
		top: 0;
		display: flex;
		align-items: center;
		z-index: 1000;

		.back,
		.share {
			width: 60rpx;
			height: 60rpx;
			margin: 0 20rpx;
			background-color: rgba(0, 0, 0, 0.2);
			border-radius: 50%;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;

			.icon {
				font-size: 28rpx;
			}
		}

		.title {
			display: flex;
			flex: 1;

			view {
				flex: 0 0 33.33%;
				text-align: center;
			}
		}
	}

	.swiper-container {
		width: 100%;
		height: 700rpx;

		.swiper {
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}


	}

	.main {
		.box {
			background-color: #fff;
			padding: 30rpx 20rpx;
			border-bottom-left-radius: 24rpx;
			border-bottom-right-radius: 24rpx;
		}

		.goods-price {
			.price {
				color: #e13031;

				text {
					font-size: 60rpx;
				}
			}

			.old-price {
				color: #ccc;
				font-size: 24rpx;
				margin-left: 20rpx;
				text-decoration: line-through;
			}
		}

		.goods-title {
			color: #333;
			font-weight: 700;
		}

		.info {
			display: flex;
			justify-content: space-between;
			font-size: 24rpx;
			color: #ccc;
			margin-top: 30rpx;
		}
	}

	.evaluate {
		background-color: #FFFFFF;
		margin: 32rpx 0;
		border-radius: 24rpx;
		padding: 24rpx;

		.title {
			display: flex;
			justify-content: space-between;

			.label {
				font-size: 28rpx;

				text {
					margin-right: 10rpx;
				}
			}

			.more {
				font-size: 24rpx;
				color: #ccc;

				.icon {
					font-size: 24rpx;
				}
			}
		}

		.lists {
			margin: 32rpx 0;

			.box {
				font-size: 28rpx;
				margin-bottom: 32rpx;

				.box-title {
					display: flex;
					align-items: center;
					margin-bottom: 32rpx;

					image {
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
						margin-right: 20rpx;

					}
				}

				.box-images {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					margin: 16rpx 0;

					image {
						width: 160rpx;
						height: 160rpx;
						margin: 10rpx;
						flex: 1;

					}
				}


			}
		}
	}

	.detail {
		background-color: #fff;
		border-radius: 24rpx;
		margin: 16rpx 0;
		padding: 32rpx 0;

		.title {
			padding: 0 32rpx;
		}

		.content {
			width: 100%;
			margin-top: 32rpx;

		}
	}

	.nav-footer {
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		height: 90rpx;
		align-items: center;

		view {
			display: flex;
			flex-direction: column;
			align-items: center;
			flex: 1;

			text {
				font-size: 12px;
			}
		}

		.icon {
			flex: 1;
			font-size: 48rpx;
			text-align: center;
		}

		.active {
			color: #e13031;
		}

		.btn {
			height: 80rpx;
			width: 200rpx;
			color: #fff;
			border-radius: 40rpx;
			font-size: 28rpx;
			margin-right: 32rpx;
			line-height: 80rpx;
		}

		.btn-buy {
			background-color: #e13031;
		}

		.btn-cart {
			background-color: #ffc30d;
		}
	}

	.popup {
		.mask {
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			background-color: rgba(0, 0, 0, 0.3);
			z-index: 10000;
		}

		.popup-content {
			position: fixed;
			background: #fff;
			bottom: 0;
			z-index: 100001;
			left: 0;
			reght: 0;
			border-top-left-radius: 24rpx;
			border-top-right-radius: 24rpx;
			width: 100%;

			.close {
				position: absolute;
				color: #ccc;
				font-size: 48rpx;
				right: 32rpx;
				top: 32rpx;
			}

			.popup-header {
				margin: 0 32rpx;
				padding: 20rpx 0;
				display: flex;

				.images {
					width: 200rpx;
					height: 200rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.info {
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					padding: 24rpx 40rpx 24rpx 0;

					.price {
						color: #e13031;
						font-size: 60rpx;
					}

					.sku-info {
						color: #999;
						font-size: 24rpx;
						margin-top: 16rpx;
					}
				}
			}

			.popup-body {
				margin-top: 24rpx;

				.sku-row {
					margin: 0 32rpx 24rpx;

					.title {
						padding-bottom: 24rpx;
					}

					.sku {
						display: inline-flex;
						justify-content: center;
						align-items: center;
						margin: 0 24rpx 24rpx 0;
						font-size: 24rpx;
						background-color: #f1f1f1;
						border-radius: 8rpx;

						padding: 8rpx 16rpx;

					}

					.active {
						background-color: #e13031;
						color: #fff;
					}
				}
			}

			.popup-footer {
				margin: 32rpx;

				.btn {
					background-color: #e13031;
					color: #ffffff;
					border-radius: 120rpx;
				}
			}
		}
	}
</style>
