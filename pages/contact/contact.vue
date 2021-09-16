<template>
	<view class="page">
		<view class="logo">
			<image src="../../static/ruibite.png" mode=""></image>
		</view>
		<view class="cells">
			<view class="cell bottom" @click="toQQ">
				<view class="label">
					<text class="icon icon-kefu"></text>
					<text>客服QQ</text>
				</view>
				<view class="content">
					<text>{{qq}}</text>
					<text class="icon icon-pull-left"></text>
				</view>
			</view>
			<view class="cell bottom" @click="call">
				<view class="label">
					<text class="icon icon-kefu"></text>
					<text>客服电话</text>
				</view>
				<view class="content">
					<text>{{tel}}</text>
					<text class="icon icon-pull-left"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qq:'',
				tel:''
				
			}
		},
		onLoad() {
			this.$api.getUpgrade().then(response=>{
				console.log(response)
				this.qq=response.data[0].qq;
				this.tel=response.data[0].tel;
			})
		},
		methods: {
			call(){
				uni.makePhoneCall({
					phoneNumber:this.tel
				})
			},
			toQQ(){
				
				// #ifdef APP-PLUS
				plus.runtime.openURL(`mqqwpa://im/chat?chat_type=wpa&uin=${this.qq}&version=l&src_type=web&web_src=oicqzone.com`)
				// #endif
				// #ifdef H5
				window.open(`http://wpa.qq.com/msgrd?v=3&uin=${this.qq}&site=在线客服&menu=yes`)
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
    .page{
		width: 100%;
		height: 100%;
		.logo{
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			overflow: hidden;
			margin: 80rpx auto;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.cell{
			.label{
				display: flex;
				align-items: center;
				text{
					padding: 0 6rpx;
				}
			}
			.content{
				font-size: 30rpx;
				text-align: right;
				color: #999;
			}
		}
	}
</style>
