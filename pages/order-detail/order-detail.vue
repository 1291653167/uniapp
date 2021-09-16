<template>
	<view class="page">
		<view v-if="tag">

			<view class="ord-status">
				<text class="icon icon-order"></text>
				<text class="order-text">{{detail.status|statusText}}</text>
			</view>
			<view class="address">
				<view class="info">
					<view class="content">
						<text v-if="detail.address">{{detail.address.name}}</text>
						<text v-if="detail.address">{{detail.address.tel|VisibileTel}}</text>
					</view>
					<view class="detail" v-if="detail.address">
						{{detail.address.addr_text}}{{detail.address.detail}}
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
				<view class="product" v-for="goods in detail.goods" :key="goods.goods_id">
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
				<view class="cell">
					<view class="label">配送时效</view>
					<view class="content">
						按时配送
					</view>
				</view>
				<view class="cell">
					<view class="label">退还无忧</view>
					<view class="content">
						自签收后7天内退货，15天内换货，可免费享1次上门取件服务
					</view>
				</view>
				<view class="cell">
					<view class="label">备注</view>
					<view class="content">
						{{detail.desc||'无'}}
					</view>
				</view>
			</view>
			<view class="box">
				<view class="cell">
					<view class="label">商品金额</view>
					<view class="content">
						￥{{detail.base_money}}
					</view>
				</view>
				<view class="cell">
					<view class="label">运费</view>
					<view class="content">
						￥{{detail.shipping}}
					</view>
				</view>
				<view class="cell">
					<view class="label">促销立减</view>
					<view class="content">
						￥{{detail.reduction}}
					</view>
				</view>
			</view>
			<view class="box">
				<view class="cell">
					<view class="label">发票</view>
					<view class="content">
						不开发票
					</view>
				</view>

			</view>
			<view class="box">
				<view class="cell">
					<view class="label">下单时间</view>
					<view class="content">{{detail.add_time|time}}</view>
				</view>
				<view class="cell">
					<view class="label">订单编号</view>
					<view class="content">{{detail.order_sn}}</view>
				</view>
			</view>
			<!-- 已付款才显示 -->
			<view class="box" v-if="detail.status!=1 && detail.status!=8">
				<view class="cell">
					<view class="label">付款金额</view>
					<view class="content">￥{{detail.all_amount}}</view>
				</view>
				<view class="cell">
					<view class="label">支付方式</view>
					<view class="content">花呗</view>
				</view>
				<view class="cell">
					<view class="label">付款时间</view>
					<view class="content">2021年5月28日 15:30</view>
				</view>
			</view>
			<!-- 已发货才显示 -->
			<view class="box">
				<view class="cell">
					<view class="label">物流</view>
					<view class="content">{{detail.express_com|ExpressText}}</view>
				</view>
				<view class="cell">
					<view class="label">物流单号</view>
					<view class="content">{{detail.express_no}}</view>
				</view>
			</view>
			<view class="fix-bar">
				<text>共计:</text>
				<view class="price">￥{{detail.all_amount}}</view>
				<button class="btn" v-if="detail.status==1" @click="pay">去付款</button>
				<button class="btn" v-if="detail.status==1" @click="cancel">取消订单</button>
				<button class="btn " v-if="detail.status==2" @click="faHuo">去发货</button>
				<button class="btn" v-if="detail.status==3" @click="wuliu">查看物流</button>
				<button class="btn" v-if="detail.status==3" @click="shouhuo">收货确认</button>
				<button class="btn" v-if="detail.status==6" 
					@click="to('/pages/evaluate/evaluate?orderId='+detail._id+'&goods_id='+detail.goods[0].goods_id)"
				
				>去评价</button>
				<button class="btn" v-if="detail.status==8" @click="delOrder">删除订单</button>
			</view>

			<view class="popup" v-show="showPopup">
				<view class="mask"></view>
				<view class="popup-content">
					<text class="close icon icon-cuowu" @click="showPopup=false"></text>
					<view class="popup-header">
						<text>请说明取消原因</text>
					</view>
					<view class="popup-body">
						<textarea class="cancel" v-model="cancel_text" value="" placeholder="" />
					</view>
					<view class="popup-footer">
						<button class="btn" @click="cancelOrder">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let status_text = {

			"1": "待付款",
			"2": "待发货",
			"3": "待收货",
			"6": "待评价",
			"7": "已完成",
			"8": "已取消",

		};
		let express = {
			"HTKY": "百世快递",
			"STO": "申通快递",
			"YTO": "圆通快递",
			"HHTT": "天天快递"
		}
	export default {
		data() {
			return {
				order_status: 0,
				id: '',
				detail: '',
				tag: 0,
				showPopup: false,
				cancel_text: ''
			}
		},

		onLoad(params) {
			this.id = params.id;
			this.getOrderDetail()
		},
		filters: {
			statusText(status) {
				return status_text[status]
			},
			ExpressText(value){
				return express[value]
			},
			time(data) {
				let date = new Date(data);
				// console.log(date.getFullYear())
				// console.log(date.getMonth())
				// console.log(date.getDay())
				// console.log(date.getDate())
				// console.log(date.getHours())
				// console.log(date.getMinutes())
				// console.log(date.getSeconds())
				let minutes = date.getMinutes()
				let month = (date.getMonth() + 1)
				if (month < 10) {
					month = "0" + month;
				}
				if (minutes < 10) {
					minutes = '0' + minutes
				}
				return date.getFullYear() + "年" + month + "月" + date.getDate() + "日 " + date.getHours() +
					":" + minutes + ":" + date.getSeconds();
			}
		},
		methods: {
			getOrderDetail() {
				let uid = this.$store.getters.uid;
				if (!uid) {
					this.toast("请登录")
					this.to("/pages/public/login");
					return;
				}
				let orderId = this.id;
				this.$api.getOrderDetail({
					orderId,
					uid
				}).then(response => {
					console.log(response);
					this.detail = response.data[0];
					this.tag = 1;
				})
			},
			cancel() {
				this.showPopup = true
			},
			cancelOrder() {
				let orderId = this.id;
				let {
					cancel_text
				} = this;
				if (cancel_text == '') {
					this.toast('请填写取消原因')
					return
				}
				this.$api.cancalOrder({
					orderId,
					cancel_text
				}).then(response => {
					console.log(response)
					if (response.code == 1) {
						this.showPopup = false
						this.getOrderDetail()
					}
				})
			},
			delOrder() {
				let orderId = this.id
				uni.showModal({
					title: "消息提示",
					content: "您确定要删除吗",
					success: () => {
						this.$api.delOrder({
							orderId
						}).then(response => {
							console.log(response);
							this.getOrderDetail()
						})
					}
				})
			},
			pay() {
				let orderId = this.id;
				this.$api.payTest({
					orderId
				}).then(response => {
					console.log(response);
					if (response.code == 1) {
						this.getOrderDetail()
					}
				})
			},
			faHuo(){
				let orderId=this.id;
				let express_com="STO";
				let express_no="123645"
				this.$api.expressSend({
					orderId,express_com,express_no
				}).then(response => {
					console.log(response);
					this.getOrderDetail()
				 
				})
			},
			shouhuo(){
				let orderId = this.id;
				this.$api.shouhuo({
					orderId
				}).then(response => {
					 
					if (response.code == 1) {
						this.getOrderDetail()
					}
				})
			},
			wuliu(){
				this.to('/pages/Express/Express?express_com='+this.detail.express_com+'&express_no='+this.detail.express_no)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		width: 100%;
		height: 100%;
		padding-bottom: 76rpx;

		.ord-status {
			height: 240rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			background-color: $uni-color-success;
			color: #fff;

			.icon {
				font-size: 60rpx;
				border: 1px solid #fff;
				border-radius: 50%;
				padding: 25rpx;
			}

			.order-text {
				margin-top: 20rpx;
			}
		}

		.address {
			background: #FFFFFF url(/static/address-line.png);
			background-repeat-y: no-repeat;
			background-position: bottom;
			background-size: 64px 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 16rpx 32rpx;
			font-size: 28rpx;

			.info {
				padding-bottom: 10rpx;

				.content {
					color: #333;
					font-weight: 700;
				}

				.detail {
					color: #666;
				}
			}
		}

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

		.fix-bar {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #fff;
			padding: 0 32rpx;
			height: 88rpx;
			border-top: 1px solid #f8f8f8;

			.price {
				font-size: 36rpx;
				color: #e13130;
				flex-grow: 1;
			}

			button {
				background-color: #e13031;
				height: 64rpx;
				line-height: 64rpx;
				margin: 4rpx 10rpx;
				font-size: 28rpx;
				color: #fff;
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
					margin: 32rpx;
				}

				.popup-body {
					margin: 60rpx 32rpx 32rpx 32rpx;

					.cancel {
						width: 100%;
						height: 200rpx;
						border: 1px solid $uni-bg-color-grey;
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
	}
</style>
