<template>
	<view class="content">
		<view class="status_bar">
			
		</view>
		<scroll-view scroll-y @scroll="pageScroll" class="container" @scrolltolower="getLike">
			<view class="header ":class="active?'active':''">
				<view class="search" @click="to('/pages/search/search')">
					<text class=" icon icon-search"></text>
					<input type="text" />
				</view>
				<view class="no">
					<text class="icon icon-ling"></text>
				</view>
			</view>
			<view class="swiper-container">
				<view class="bg"></view>
				<swiper class="swiper" indicator-dots="true" indicator-color="#fff" autoplay="true">
					<swiper-item v-for="item in banner" :key="item._id">
						<image :src="item.img"></image>
					</swiper-item>
					<!-- <swiper-item>
						<image src="../../static/slider/g_banner.jpg"></image>
					</swiper-item>
					<swiper-item>
						<image src="../../static/slider/g_banner.jpg"></image>
					</swiper-item> -->
				</swiper>
			</view>
			<view class="nav-cate">
				<view class="item" v-for="item in cate" :key="item._id">
					<img :src="item.img" />
					<text>{{item.name}}</text>
				</view>
			</view>
			<view class="title">
				热门推荐
			</view>
			<view class="hot">
				<scroll-view scroll-x @scrolltolower="getCompetitive()">
					<view class="box">
						<view class="item" v-for="item in competitive" :key="item._id">
							<view class="cover">
								<img :src="item.img" />
							</view>
							<view class="name line-2">{{item.name}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="title">
				猜你喜欢
			</view>
			<view class="list">
				<view class="box" v-for="item in like" :key="item._id">
					<view class="cover">
						<img :src="item.img" />
					</view>
					<view class="name line-2">{{item.name}}</view>
					<view class="price">
						￥{{item.price}}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		// onLaunch: function() {  //当第一次启动项目时触发, 全局只触发一次
		// 	this.http.post("api/get_banner").then(function(response){
		// 		console.log(response);
		// 	});
		// 	console.log('App Launch')
		// },
		// onShow: function() {  //当uniapp启动,从后台进入前台显示
		// 	console.log('App Show')
		// },
		// onHide: function() {  //当uniapp 从前台进入后台
		// 	console.log('App Hide')
		// },
		// omPageNotFound:function(){  //当查找不存在时触发
		// 	console.log('页面不存在');
		// 	uni.switchTab({
		// 		url:"pages/index/index"
		// 	})
		// },
		onLoad(params) { //页面加载会回调
			//console.log(params);
			// uni.showToast({            //显示消息提示
			// 	title:"正在加载中...",
			// 	icon:"loading",
			// 	duration:3000
			// })
			// uni.showLoading({
			// 	title: "正在加载中...",
			// })
			// uni.showModal({           //模态框
			// 	title:'消息提示',
			// 	content:"确定要取消吗"
			// })
			// uni.showActionSheet({    //弹出框
			// 	itemList:["取消"]
			// })
			// this.$http.post("api/get_banner").then(response => {
			// uni.hideToast();
			//uni.hideLoading()
			// console.log(response);
			// this.banner=response.data;
			// })
			this.getBanner();
			this.getCate();
			this.getCompetitive();
			this.getLike()
		},
		data() {
			return {
				title: 'Hello',
				banner: [],
				cate: [],
				competitive: [],
				CompetitiveSkip: 0,
				like:[],
				likeSkip:0,
				active:false 
			}
		},
		methods: {
			getBanner() { //获取轮播图
				this.$api.getBanner().then(response => {
					this.banner = response.data;
				})
			},
			getCate() { //获取导航分类
				this.$api.getCate({
					position: "index"
				}).then(response => {
					//	console.log(response.data)
					this.cate = response.data;
				})
			},
			getCompetitive() { //获取精选//滚动监听动态加载数据
				//skip 代表从第几个数据开始获取, limit 查询几条数据
				let limit = 4;
				this.$api.getCompetitive({
					skip: this.CompetitiveSkip,
					limit: limit
				}).then(response => {
					this.competitive.push.apply(this.competitive, response.data);
					this.CompetitiveSkip += limit;
				})
			},         
			getLike(){           //获取猜你喜欢
				this.$api.getLike({skip:this.likeSkip}).then(response=>{
					//console.log(response);
					this.like.push.apply(this.like,response.data)
					this.likeSkip+=10
				})
			},
			pageScroll(e){
				//console.log("页面滚动");
				this.active=e.detail.scrollTop>44
			},
			
		}


	}
</script>

<style lang="scss">
	.content{
		height: 100%;
		width: 100%;
		.container{
			width: 100%;
			height: 100vh;
		}
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
		color: #fff;
		position: fixed;
		top: 0;
		z-index: 999;

		.search {
			flex-grow: 1;
			flex-shrink: 1;
			box-sizing: border-box;

			input {
				background-color: #fff;
				border-radius: 60rpx;
				padding: 30rpx 20rpx;
				margin-left: 30rpx;
				box-sizing: border-box;
			}

			.icon {
				position: absolute;
				left: 50rpx;
				color: #000;
				top: 30rpx;
			}
			
			
		}

		.no {
			width: 50px;
			text-align: center;
			margin-top: 10rpx;

			.icon {
				font-size: 56rpx;
			}
		}
		&.active{
			background-color: #e13031;
		}

	}

	.swiper-container {
		width: 100%;
		height: 380rpx;
		position: relative;

		.bg {
			background-image: linear-gradient(0deg, #f1503b, #c82519 50%);
			position: absolute;
			top: 0;
			left: -25%;
			height: 290rpx;
			width: 150%;
			border-bottom-left-radius: 100%;
			border-bottom-right-radius: 100%;
		}

		.swiper {
			padding-top: 90rpx;

			uni-image {
				width: calc(100% - 60rpx);
				height: 100%;
				margin: 0 30rpx;
				box-sizing: border-box;
				border-radius: 20rpx;
			}
		}
	}

	.nav-cate {
		display: flex;
		flex-wrap: wrap;
		margin: 30rpx;
		padding-top: 30rpx;

		.item {
			flex: 1 0 20%;
			text-align: center;
			margin-bottom: 30rpx;

			img {
				width: 100rpx;
				display: block;
				margin: 0 auto;
			}

			text {
				font-size: 24rpx;
				color: #333;
			}
		}
	}

	.hot {
		background-color: #fff;

		.box {
			display: flex;
			background-color: #fff;

			.item {
				flex: 0 0 calc(33.33% - 20rpx);
				padding: 0 10rpx;

				.cover {
					width: 100%;

					img {
						width: 100%;
					}
				}

				.name {
					font-size: 24rpx;
					margin: 20rpx 10rpx 30rpx 10rpx;
				}
			}
		}
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: 0 16rpx;
		margin-top: 40rpx;

		.box {
			flex: 0 0 calc(50% - 10rpx);
			margin-bottom: 10rpx;
			background-color: #fff;
			border-radius: 20rpx;
			overflow: hidden;

			.cover {
				width: 100%;

				img {
					width: 100%;
				}
			}

			.name {
				font-size: 28rpx;
				padding: 10rpx;
				height: 84rpx;
				line-height:84rpx;
			}

			.price {
				padding: 10rpx;
				color: #ee3031;
				padding-bottom: 20rpx;
			}
		}
	}

	.title {
		margin: 40rpx 20rpx;
	}
</style>
