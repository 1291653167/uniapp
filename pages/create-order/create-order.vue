<template>
	<view class="page">
		<view class="address">
			<view class="info">
				<view class="content">
					<text>{{address.name}}</text>
					<text>{{address.tel}}</text>
				</view>
				<view class="detail">
					{{address.addr_text}}{{address.detail}}
				</view>
			</view>
			<view class="more">
				<text class="icon icon-pull-left"></text>
			</view>
		</view>
		<view class="box">
			<view class="box-header">
				<text class="icon icon-store"></text>
				<text class="store-title">商城专营店</text>
				<text class="icon icon-pull-left"></text>
			</view>
			<view class="product" v-for="(data,index) in order.goods" :key="data._id">
				<view class="product-info">
					<view class="image">
						<image :src="data.img" mode=""></image>
					</view>
					<view class="content">
						<view class="title line-2">
							{{data.name}}
						</view>
						<view class="sku">
							{{data.attr}}
						</view>
					</view>
					<view class="num">
						x {{data.num}}
					</view>
				</view>
				<view class="product-price">
					<text>￥{{data.price}}</text>
				</view>
			</view>
			<view class="cell">
				<view class="label">
					配送时效
				</view>
				<view class="content">
					按时配送
				</view>
			</view>
			<view class="cell">
				<view class="label">
					退换无忧
				</view>
				<view class="content">
					自签收后7天内退货,15天内换货,可免费享1次上门取件服务
				</view>
			</view>
			<view class="cell">
				<view class="label">
					备注
				</view>
				<view class="content">
					<textarea placeholder="请填写备注" v-model="desc"> </textarea>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="cell">
				<view class="label">
					商品金额
				</view>
				<view class="content">
					￥{{order.base_money}}
				</view>
			</view>
			<view class="cell">
				<view class="label">
					运费
				</view>
				<view class="content">
					￥{{order.shipping}}
				</view>
			</view>
			<view class="cell">
				<view class="label">
					促销立减
				</view>
				<view class="content">
					￥{{order.reduction}}
				</view>
			</view>
		</view>

		<view class="box">
			<view class="cell">
				<view class="label">
					发票
				</view>
				<view class="content">
					开发票
				</view>
			</view>
			<view class="cell">
				<view class="label">
					支付方式
				</view>
				<view class="content">
					在线支付
				</view>
			</view>

		</view>
		<view class="fix-bar">
			<view class="price">
				￥{{order.all_amount}}
			</view>
			<button @click="pay">立即支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address:'',
				cart_id:'',
				type:'',
				order:'',
				desc:''
			}
		},
		onLoad(params) {
			//console.log(params)
			this.cart_id = params.cart_id;
			this.type = params.type;
			this.getAddress();
			this.getCheckOrder()
		},
		methods: {
			getAddress(){
				let uid = this.$store.getters.uid;
				this.$api.getDefaultAddress({uid}).then(reponse=>{
					//console.log(reponse)
					this.address = reponse.data[0];
				})
			},
			getCheckOrder(){
				let uid = this.$store.getters.uid;
				let token = this.$store.getters.token;
				let {cart_id,type} = this;
				this.$api.checkOrder({uid,token,cart_id,type}).then(response=>{
					console.log(response);
				    this.order = response.data
				})
			},
			pay(){
				let uid = this.$store.getters.uid;
				let token = this.$store.getters.token;
				let {cart_id,desc,address} = this;
				this.$api.submitOrder({uid,token,cart_id,desc,address}).then(response=>{
					console.log(response);
					if(response.code==1){
						let orderId=response.data;
						let all_amount=this.order.all_amount;
						uni.redirectTo({
							url:'/pages/pay/pay?orderId='+orderId+'&all_amount='+all_amount
						})
					}else{
						this.toast(response.msg)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	textarea{
		height: 100%;
		font-size: 28rpx;
	}
	.page {
		width: 100%;
		height: 100%;
		
		.address {
			background: #fff url(/static/address-line.png);
			background-repeat-y: no-repeat;
			background-position: left bottom;
			background-size: 128rpx 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 16rpx 32rpx;
			font-size: 28rpx;

			.content {
				color: #333;
				font-weight: 700;
			}

			.detail {
				color: #666;
			}
		}

		.box {
			background-color: #fff;
			border-radius: 24rpx;
			margin: 32rpx 0;
			padding: 0 32rpx;

			.box-header {
				padding: 16rpx 0;
				display: flex;
				align-items: center;

				.icon {
					font-size: 28rpx;
				}

				.icon-store {
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
					display: flex;
					align-items: center;

					.image {
						width: 150rpx;
						height: 150rpx;
						flex-shrink: 0;
						border-radius: 24rpx;
						overflow: hidden;

						image {
							height: 100%;
							width: 100%;

						}
					}

					.content {
						margin-left: 10rpx;
						flex: 1;
						.title {
							font-size: 28rpx;
						}

						.sku {
							font-size: 24rpx;
						}
					}

					.num {
						font-size: 28rpx;
						color: #ccc;
					}
				}

				.product-price {
					display: flex;
					justify-content: flex-end;
				}
			}

			.cell {
				padding: 0;

				.label {
					font-size: 28rpx;
				}

				.content {
					text-align: right;
					font-size: 24rpx;

				}
			}
		}

		.fix-bar {
			position: fixed;
			bottom: 0;
			right: 0;
			left: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			padding: 0 32rpx;
			height: 88rpx;

			.price {
				font-size: 36rpx;
				color: #e13130;
			}

			button {
				margin: 0; 
				background-color: #e13031;
				height: 80rpx;
				color: #fff;
				margin: 4rpx 0;
				line-height: 80rpx;
				border-radius: 80rpx;
				font-size: 28rpx;
			}
		}
	}
</style>
