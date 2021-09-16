<template>
	<view class="content">
		<view class="status_bar">
		
	</view>
		<view class="header">
			<view class="search">
				<text class=" icon icon-search"></text>
				<input type="text" />
			</view>
		</view>
		<view class="menu">
			<scroll-view scroll-y class="left">
				<view class="row"> 
					<view class="item" @click="change(index)" v-for="(item,index) in lists" :key="item._id" :class="key==index?'active':''">{{item.name}}</view>
				</view>
			</scroll-view>
			<scroll-view scroll-y class="right">
				<view class="row" v-for="(item,index) in lists" :key="item._id" v-show="index==key">
					<view class="item" v-for="data in item.children" :key="data._id" @click="to(`/pages/product-list/product-list?id=`+data._id+`&title`+data.name)">
						<view >
							<img :src="data.img" />
						</view>
						<text>{{data.name}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists:[],
				key:0
			}
		},
		methods: {
			change(index){
				this.key=index;
			},
			// toList(id,title){   //跳转商品列表
			// 	uni.navigateTo({
			// 		url:"/pages/product-list/product-list?id="+id+"&title"+title
			// 	})
			// }
		},
		onLoad(params) {
			this.$api.getCate().then(response=>{
				//console.log(response);
				this.lists=response.data
			})
		},
		
	}
	
	//uni-app 也可以使用生命周期函数 但是不推荐
</script>

<style lang="scss">
	.content{
		height: 100%;
		width: 100%;
		.container{
			width: 100%;
			height: 100vh;
		}
		.status_bar{
		height: var(--status-bar-height);
		width: 100%;
		}
		.header {
			width: 100%;
			height: 88rpx;
			display: flex;
			align-items: center;
		
			background-color: #FFFFFF;
		
			.search {
				flex-grow: 1;
				flex-shrink: 1;
				padding-left: 40rpx;
				padding-right: 40rpx;
				position: relative;
		
				input {
					background-color: #f8f8f8;
					height: 60rpx;
					border-radius: 60rpx;
				}
		
				.icon {
					position: absolute;
					left: 60rpx;
					color: #000;
					top: 15rpx;
				}
			}
		}
		.menu{
			display: flex;
			width: 100%;
			height:calc(100% - 88rpx);
			.left{
				width: 240rpx;
				height: 100%;
				.row{
					height: 100%;
					display: flex;
					flex-direction: column;
					.item{
						height: 92rpx;
						line-height: 92rpx;
						text-align: center;
						font-size: 28rpx;
					}
					.active{
						background-color: #fff;
						color: #e13031;
					}
				}
			}
			.right{
				flex: 1;
				background-color: #fff;
				.row{
					display: flex;
					flex-wrap: wrap;
					.item{
						flex: 0 0 33.33%;
						text-align: center;
						margin: 20rpx 0;
						img{
							width: 60rpx;
						}
						text{
							font-size: 24rpx;
						}
					}
				}
			}
		}
}
	
	
	
	
</style>
