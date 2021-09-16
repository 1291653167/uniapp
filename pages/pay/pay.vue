<template>
	<view class="page">
		<view class="amount">
			<view class="price">￥{{all_amount}}</view>
			<text class="label">支付金额</text>
		</view>
		<view class="cells">
			<view class="cell bottom" @click="changeType('alipay')">
				<view class="label ">
					<image src="../../static/zhifubaozhifu.png" mode=""></image>
					<text>支付宝支付</text>
				</view>
				<view class="content">
					<text class="icon icon-round" :class="type=='alipay'?'icon-check':'icon-roundcheckfill'"></text>
				</view>
			</view>
			<view class="cell bottom" @click="changeType('wxpay')">
				<view class="label">
					<image src="../../static/weixinzhifu.png" mode=""></image>
					<text>微信支付</text>
				</view>
				<view class="content">
					<text class="icon " :class="type=='wxpay'?'icon-check':'icon-roundcheckfill'"></text>
				</view>
			</view>
			
			<view class="cell bottom" >
				<view class="label">
					<image src="../../static/zhongguojiansheyinhanglogo.png" mode=""></image>
					<text>建设银行支付</text>
				</view>
				<view class="content">
					<text class="icon "  ></text>
				</view>
			</view>
		</view>
		<view class="btn">
			<button @click="pay">确认支付 (￥{{all_amount}})</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId:'',
				all_amount:'',
				type:'alipay'
			}
		},
		onLoad(params) {
			this.orderId = params.orderId;
			this.all_amount = params.all_amount;
		},
		methods: {
			changeType(type){
				this.type=type;
			},
			getOrderInfo(){
				if(this.type=='alipay'){
					let {orderId,type}=this;
					let info = this.$api.getAlipayPay({
						orderId,type
					});
					return info.data.orderInfo;
				}
			},
			pay(){
				let {type}=this;
				let orderInfo = this.getOrderInfo();
				uni.requestPayment({
					provider:type,
					orderInfo:orderInfo,
					success:(response)=>{
						this.toast('支付成功');
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.page{
	width: 100%;
	height: 100%;
	.amount{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 200rpx;
		background-color: #fff;
		border-bottom-right-radius: 24rpx;
		border-bottom-left-radius: 24rpx;
		.price{
			color: #e13130;
			font-size: 48rpx;
		}
		.label{
			color: #999;
			font-size: 28rpx;
		}
	}
	.content{
		text-align: right;
		.icon{
			font-size: 48rpx;
			color: #E13031;
		}
	}
	.cell{
		.label{
			display: flex;
			align-items: center;
			image{
				width: 48rpx;
				height: 48rpx;
				margin-right: 10rpx;
			}
		}
	}
	.btn{
		margin: 16rpx;
		button{
			background-color: #e13031;
			color: #fff;
			font-size: 28rpx;
			border-radius: 120rpx;
			width: 80%;
		}
	}
}
</style>
