<template>
	<view class="page">
		<view class="nav">
			<view class="search">
				<view class="icon icon-search"></view>
				<input placeholder="搜索订单" confirm-type="search" @confirm="searchOrder"/>
			</view>
			<view class="tabs">
				<view class="tab" :class="status==0?'active':''" @click="changeStatus(0)"><text>全部</text></view>
				<view class="tab" :class="status==1?'active':''" @click="changeStatus(1)"><text>待付款</text></view>
				<view class="tab" :class="status==3?'active':''" @click="changeStatus(3)"><text>待收货</text></view>
				<view class="tab" :class="status==7?'active':''" @click="changeStatus(7)"><text>已完成</text></view>
			</view>
		</view>
		<view class="empty" v-if='lists.length<=0&&tag==1'>
			<view class="title">
				您还没有相关订单
			</view>
		</view>
		<view class="list" v-else>
			<view class="order-box" v-for="(order,index) in lists" :key="order._id"
			@click="toAuth('/pages/order-detail/order-detail?id='+order._id)"
			>
				<view class="box-header">
					<view class="store-info">
						<text class="icon icon-store"></text>
						<text class="store-title">商城专营店</text>
						<text class="icon icon-pull-left"></text>
					</view>
					<view class="status">
						<text class="label">{{order.status|statusText}}</text>
						<text class="icon icon-delete"></text>
					</view>
				</view>
				<view class="box-body bottom">
					<view v-if='order.goods.length==1'>
						<view class="order-pruduct" v-for='goods in order.goods' :key="goods.goods_id">
							<view class="image">
								<image :src="goods.img" mode=""></image>
							</view>
							<text class="content">
								<text class="title line-2">{{goods.name}}</text>
								<text>{{goods.attr}}</text>
							</text>
							<text class="num">x{{goods.num}}</text>
						</view>
					</view>
					<view  v-else>
						<view class="order-pruduct more-goods">
							<view class="image" v-for='goods in order.goods' :key="goods.goods_id">
								<image :src="goods.img" ></image>
							</view>
							<view class="num">x{{order.goods.length}}</view>
						</view>
					</view>
					<view class="order-amount">共计: ￥{{order.all_amount}}</view>
				</view>
				<view class="box-footer">
					<button class="btn-red" v-if="order.status==1">去付款</button>
					<button class="btn-red" v-if="order.status==1">取消订单</button>
					<button class="btn-red" v-if="order.status==2">去发货</button>
					<button class="btn-red" v-if="order.status==3">查看物流</button>
					<button class="btn-red" v-if="order.status==3">收货确认</button>
					<button class="btn-red" v-if="order.status==6">去评价</button>
					<button class="btn-red" v-if="order.status==7">删除订单</button>
					 
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

	}
	export default {
		data() {
			return {
				status: 0,
				skip: 0,
				limit: 10,
				lists: [],
				tag: 0,
				finished:false,
				keyWord:""
			}
		},
		filters: {
			statusText(stauts) {
				return status_text[stauts];
			}
		},
		onLoad(params) {
			this.status = params.status;
			this.getLists();
		},
		onReachBottom() {
			if(this.finished){
				this.toast("没有更多数据加载了");
				return
			 
			}
			this.getLists()
		},
		methods: {
			changeStatus(status) {
				this.status = status;
				this.lists=[]
				this.skip=0;
				this.getLists()
			},
			searchOrder(params){
				// console.log(params)
				this.keyWord=params.detail.value;
				console.log(this.keyWord)
				this.$api.getOrderListsById({order_id:this.keyWord }).then(response=>{              this.lists=response.data
				})
			},
			getLists() {
				let uid = this.$store.getters.uid;
				let {
					skip,
					limit,
					status
				} = this;
				this.$api.getOrderLists({
					skip,
					limit,
					status,
					uid
				}).then(response => {
					console.log(response);
					//this.lists = response.data;
					this.lists.push.apply(this.lists,response.data);
					this.skip+=response.data.length;
					if(this.lists.length>=response.count){
						this.finished
					}
					if (this.lists.length == 0) {
						this.tag = 1
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		width: 100%;
		height: 100%;

		.empty {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			padding-top: 120rpx;

		}

		.nav {
			height: 176rpx;

			.search {
				background-color: #fff;
				height: 88rpx;
				position: relative;
				display: flex;
				align-items: center;
				padding: 0 32rpx;

				input {
					border: 1px solid $uni-border-color;
					padding: 12rpx 60rpx;
					flex: 1;
					border-radius: 40rpx;
				}

				.icon {
					position: absolute;
					top: 28rpx;
					left: 50rpx;
				}
			}

			.tabs {
				display: flex;
				height: 88rpx;
				justify-content: center;
				align-items: center;
				font-size: 28rpx;
				text-align: center;
				background-color: #fff;

				.tab {
					flex: 1;
					flex-shrink: 1;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.active {
					text {
						color: $uni-color-error;
						border-bottom: 1rpx solid $uni-color-error;
						height: 88rpx;
						line-height: 88rpx;
					}
				}
			}
		}

		.list {
			margin: 32rpx 20rpx;
			padding-bottom: 20rpx;

			.order-box {
				background-color: #fff;
				padding: 32rpx 16rpx;
				border-radius: 24rpx;
				box-shadow: 0 2rpx 4rpx 0 rgba(186, 186, 186, 0.1);
				margin: 32rpx 0;

				.box-header {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 32rpx;

					.store-info {
						display: flex;

						.icon-dianpu {
							font-size: 36rpx;
							margin-right: 10rpx;
						}

						.store-title {
							font-size: 28rpx;
						}
					}

					.status {
						color: #999;
						font-size: 28rpx;
						display: flex;
						align-items: center;

						.label {
							margin-right: 10rpx;
						}
					}
				}

				.box-body {
					padding-bottom: 32rpx;
					.more-goods{
						.num{
							flex-grow: 1;
							text-align: right !important;
							padding-right: 30rpx;
						}
					}
					.order-pruduct {
						display: flex;
						align-items: center;

						.image {
							width: 150rpx;
							height: 150rpx;
							flex-shrink: 0;
							border-radius: 24rpx;
							overflow: hidden;

							image {
								width: 100%;
								height: 100%;
							}
						}

						.content {
							flex-grow: 1;

							.title {
								margin-left: 10rpx;
								font-size: 28rpx;
								height: 60rpx;
								line-height: 30rpx;
								align-items: center;
								width: 400rpx;
							}
						}

						.num {
							color: #999;
							display: flex;
							align-items: center;
							justify-content: center;
							flex: 1;
						}
					}

					.order-amount {
						display: flex;
						justify-content: flex-end;
					}
				}

				.box-footer {
					display: flex;
					margin-top: 32rpx;
					justify-content: flex-end;

					button {
						font-size: 24rpx;
						height: 54rpx;
						line-height: 54rpx;
						border-radius: 24rpx;
						margin: 0 4rpx;
						border: 1px solid $uni-border-color;

						&:after {
							border: 0;
						}
					}

					.btn-red {
						border: 1px solid $uni-color-error;
						color: $uni-color-error;
					}
				}
			}
		}
	}
</style>
