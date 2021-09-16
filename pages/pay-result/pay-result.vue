<template>
	<view class="page">
		<view class="pay-result" v-if="status==0">
			<text class="icon icon-check"></text>
			<text class="label">支付成功</text>
		</view>
		<view class="pay-result error" v-else>
			<text class="icon icon-cuowu"></text>
			<text class="label">支付失败</text>
		</view>
		<view class="btn">
			<navigator class="nav" url="/pages/order-list/order-list" open-type="redirect">查看订单</navigator>
			<navigator class="nav" url="/pages/index/index" open-type="switchTab">返回首页</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:0
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
    .page{
		width: 100%;
		height: 100%;
		.pay-result{
			height: 240rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			.icon {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 80rpx;
				height: 80rpx;
				background-color: $uni-color-success;
				padding: 30rpx;
				font-size: 92rpx;
				color: #fff;
				border-radius: 50%;
				margin: 20rpx 0 ;
			}
			.label{
				font-size: 28rpx;
			}
		}
		.error{
			.icon {
				background-color: $uni-color-error;
			}
		}
		.btn{
			margin: 120rpx 32rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.nav{
				// margin-top: 20px;
				background-color: #fff;
				padding: 12rpx 48rpx;
				font-size: 28rpx;
				border-radius: 40rpx;
			}
		}
	}
</style>
