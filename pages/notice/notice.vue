<template>
	<view class="page">
		<view class="box" v-for="i in 8" :key="i">
			<view class="date">
				<text>2021年8月6日 11:44</text>
			</view>
			<view class="info">
				<view class="cover">
					<img src="/static/slider/g_banner.jpg"/>
				</view>
				<view class="title">
					数码电脑数码电脑电脑
				</view>
				<view class="desc">
					数码电脑数码电脑电脑
					数码电脑数码电脑电脑
					数码电脑数码电脑电脑
					数码电脑数码电脑电脑
					数码电脑数码电脑电脑
					数码电脑数码电脑电脑
					数码电脑数码电脑电脑
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.page{
		height: 100%;
		width: 100%;
		.box{
			.date{
				margin: 20rpx auto;
				color: #FFFFFF;
				text-align: center;
				text{
					background-color: #ccc;
					border-radius: 30rpx;
					padding:0 20rpx;
					font-size: 24rpx;
				}
			}
			.info{
				margin: 0 15rpx;
				border-radius: 15rpx;
				overflow: hidden;
				background-color: #fff;
				padding-bottom: 30rpx;
				.cover{
					width: 100%;
					img{
						width: 100%;
					}
				}
				.title{
					margin: 10rpx;
				}
				.desc{
					margin: 0 10rpx;
					font-size: 24rpx;
				}
			}
		}
	}
</style>
