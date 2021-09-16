<template>
	<view>
		<view class="box">
			<view class="product-info">
				<view class="image">
					<image :src="goods.img" mode=""></image>
				</view>
				<view class="info">
					<view class="title line-3">{{goods.name}}</view>
					<view class="sku">{{goods.attr}}</view>
				</view>
				<view class="num">x{{goods.num}}</view>
			</view>
			<view class="product-price">
				<text>￥{{goods.price}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId:'',
				goods_id:'',
				goods:''
			}
		},
		onLoad(params) {
			 this.orderId=params.orderId;
			this.goods_id=params.goods_id;
			this.getOrderDetail()
		},
		methods: {
			getOrderDetail(){
				let {orderId}=this;
				let uid = this.$store.getters.uid;
				this.$api.getOrderDetail({uid,orderId}).then(response=>{
					
					let goods = response.data[0].goods;
					let data = goods.filter(v=>{
						return v.goods_id==this.goods_id
					})
					console.log(response);
					 this.goods=data[0] ;
					// console.log(goods.price);
				})
			}
		}
	}
</script>

<style lang="scss">
.box {
			background-color: #fff;
			margin: 32rpx 0;
			border-radius: 24rpx;
			padding: 0 16rpx;

			.box-header {
				padding: 16rpx 0;
				display: flex;
				align-items: center;

				.icon {
					font-size: 28rpx;
				}

				.icon-dianpu {
					font-size: 40rpx;
					margin-right: 10rpx;
				}

				.store-title {
					font-size: 28rpx;
				}
			}

			.product {
				margin-bottom: 32rpx;

				.product-info {
					margin-top: 20rpx;
					display: flex;
					align-items: center;

					.info {
						flex-grow: 1;
					}

					.image {
						width: 150rpx;
						height: 150rpx;
						border-radius: 24rpx;
						overflow: hidden;
						flex-shrink: 0; //不会被影响而导致缩放

						image {
							width: 100%;
							height: 100%;
						}
					}

					.content {
						margin-left: 10rpx;

						.title {
							width: 440rpx;
							font-size: 28rpx;
						}

						.sku {

							padding-top: 20rpx;
							font-size: 26rpx;
						}
					}

					.num {
						flex: 1;
						text-align: center;
						font-size: 28rpx;
						color: #999;
					}
				}

				.product-price {
					display: flex;
					justify-content: flex-end;
					font-size: 30rpx;
				}
			}

			.cell {
				.label {
					font-size: 28rpx;
					width: 70px;
				}

				.content {
					text-align: right;
					font-size: 24rpx;
					color: #999;
				}
			}
		}
</style>
