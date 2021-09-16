<template>
	<view class="page">
		 
		
		<view class="list" :class="[col?'col-2':'col-1']">
			<view class="box" v-for="data in lists" :key="data._id" @click="to(`/pages/product/product?id=`+data._id)">
				<view class="cover">
					<img :src="data.img" />
				</view>
				<view class="info">
					<view class="title line-2">
						{{data.name}}
					</view>
					<view class="price-line">
							<view class="price">￥<text>{{data.price}}</text></view>
							<view class="sales">销量:  {{data.sales}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				col: true,
				skip:0,
				key:'',
				lists:[],
				finished:false   //是否全部数据加载
			}
		},
		onLoad(params){
			//console.log(params);
			this.key=params.key;
 
			this.getproductLists(); 
		},
		onReachBottom(){  //页面滚动到底部的事件 (不是scroll-view滚到底),常用于下拉下一页数据
			console.log(1);
			if(this.finished){
				this.toast('已经没有数据')
				return;
			}
			this.getproductLists();
		},
		methods: {
			getproductLists(){
				//ES6 对象简写
				let {key,skip}=this;  //对象的解构赋值
				this.$api.getSearchListt({keyword:key,skip,limit:10}).then(response=>{
					//console.log(response);  //response.count 是当前分类下全部数据数量
								// 数据合并
					this.lists.push.apply(this.lists,response.data);
					// if(this.lists.length>=response.count){
					// 	this.finished=true;
					// }   
					this.finished=this.lists.length>=response.count
					this.skip+=10;
				});
			},
		 
			 
		}
	}
</script>

<style lang="scss">
	.page {
		width: 100%;
		height: 100%;

		.header {
			display: flex;
			align-items: center;
			height: 90rpx;
			background-color: #FFFFFF;

			.search {
				flex: 1;
				margin: 0 15rpx;
				position: relative;

				input {
					background-color: #f8f8f8;
					padding: 10rpx 80rpx;
					border-radius: 60rpx;
				}

				.icon {
					position: absolute;
					top: 15rpx;
					left: 20rpx;
				}
			}

			.right {
				width: 90rpx;
				text-align: center;

				.icon {
					font-size: 48rpx;
				}
			}
		}

		.col-2 {
			margin: 30rpx 20rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.box {
				flex: 0 0 calc(50% - 10rpx);
				background-color: #fff;
				margin-bottom: 20rpx;
				border-radius: 12rpx;
				overflow: hidden;

				.cover {
					width: 100%;

					img {
						width: 100%;
					}
				}

				.info {
					margin: 20rpx;

					.title {
						display: -webkit-box;
						-webkit-line-clamp: 2;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-box-orient: vertical;
						font-size: 28rpx;
						color: #333;
					}

					.price-line {
						display:flex;
						justify-content: space-between;
						margin-top: 20rpx;
							.price{
								color: #e13031;
								font-size: 28rpx;
								
								text {
									font-size: 36rpx;
								}
							}
						.sales{
							font-size: 24rpx;
							color: $uni-text-color-grey;
						}
					}
				}
			}
		}

		.col-1 {
			margin: 30rpx 0;

			.box {
				padding: 10rpx;
				display: flex;
				background-color: #fff;
				border-bottom: 1px solid #f8f8f8;

				.cover {
					width: 240rpx;
					height: 240rpx;
					flex-shrink: 0; //是否缩小

					img {
						width: 100%;
					}
				}

				.info {
					margin: 20rpx;
					.title {
						
						font-size: 28rpx;
						color: #333;
						height: 140rpx;
					}

					.price-line {
						display:flex;
						justify-content: space-between;	
						
							.price{
								color: #e13031;
								font-size: 28rpx;
								
								text {
									font-size: 36rpx;
								}
							}
						.sales{
							font-size: 24rpx;
							color: $uni-text-color-grey;
						}
					}
				}
			}
		}
	}
</style>
