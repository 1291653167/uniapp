<template>
	<view class="page">
		<view class="header">
			<view class="search">
				<text class="icon icon-search"></text>
				<input type="text" placeholder="请填写商品名称" v-model="value"/>
			</view>
			<view class="right">
				<button size="mini" @click="search">搜索</button>
			</view>
		</view>
		<view class="title">
			<text>最近搜索</text>
			<text class="icon icon-delete" @click="deleteSearch"></text>
		</view>
		<view class="history">
			<text v-for="data in lists">{{data}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:'',
				lists:[]
			}
		},
		onLoad() {
			this.lists = uni.getStorageSync('search') || [];
		},
		methods: {
			search(){
				let {value}=this;
				let list = uni.getStorageSync('search') || [];
				list.push(value);
				uni.setStorageSync("search",list);
				this.to('/pages/search-list/search-list?key='+value)
			},
			deleteSearch(){
				uni.clearStorageSync("search");
				this.lists=[]
			}
		}
	}
</script>

<style lang="scss">
	.page{
		width: 100%;
		height: 100%;
		.header{
			display: flex;
			align-items: center;
			height: 90rpx;
			.search{
				flex: 1;
				margin: 0 15rpx;
				position: relative;
				input{
					background-color: #fff;
					padding: 10rpx 50rpx;
					border-radius: 60rpx;
				}
				.icon{
					position: absolute;
					top: 20rpx;
					left: 15rpx;
				}
			}
			.right{
				width: 130rpx;
				button{
					background-color: #e13031;
					color: #fff;
				}
			}
		}
	}
	.title{
		display: flex;
		justify-content: space-between;
		margin: 20rpx;
		align-items: center;
	}
	.history{
		display: flex;
		margin: 0 20rpx;
		width: 100%;
		text{
			background-color: #d5d5d5;
			padding: 10rpx 20rpx;
			border-radius: 30rpx;
			font-size: 24rpx;
			flex: 0 0 10%;
			margin: 0 15rpx;
			text-align: center;
		}
	}
</style>
