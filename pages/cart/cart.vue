<template>
	<view class="page">
<!-- 		<view class="nav">
			<view class="location">
				<text class="icon icon-location"></text>
				<text class="location-name">北京市朝阳区</text>
			</view>
			<view class="btn"> 编辑商品 </view>
		</view> -->
		<view class="list">
			<view class="box" v-for="(data,index) in lists" :key="data._id" @longpress="showOptions(index)">
				<view class="options" v-if="data.options">
					<view class="mask"></view>
					<view class="op">
						<view class="delete" @click="del(data._id,index)">删除</view>
					</view>
				</view>
				<view class="check" @click="toggleChecked(index)">
					<text class="icon " :class="data.checked?'icon-check':'icon-round'"></text>
				</view>
				<view class="image">
					<image :src="data.img" mode=""></image>
				</view>
				<view class="content">
					<view class="title line-2">
						{{data.name}}
					</view>
					<view class="sku" v-if='data.attr'>
						<text>{{data.attr}}</text>
					</view>
					<view class="price-line">
						<view class="price">￥{{data.price}}</view>
						<view>
							<tui-numberbox @change="changeNumber"
							 :step="1" :index="index" :value="data.num" :max="data.stock" :min='1'></tui-numberbox>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fix-bar">
			<view class="amount">
				<text class="icon " :class="totalChecked?'icon-check':'icon-round'" @click="toggleAllChecked"></text>
				<text>全选</text>
				<text>总价:￥{{totalPrice}}</text>
			</view>
			<view class="btn">
				<button @click="createOrder">去结算({{total}}件)</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { BigNumber } from 'bignumber.js'
	export default {
		data() {
			return {
				login:false,
				lists:[]
			}
		},
		onLoad() {
			let uid = this.$store.getters.uid;
			if(uid){
				this.login=true;
				this.getCartlists(uid)
			}
		},
		computed:{
			totalChecked(){     //判断是否全部选中
				//every( )   检测数组所有元素都符合条件
				return this.lists.every(v=>v.checked)
			},
			totalPrice(){
				// let big = new BigNumber(1);
				// return big.plus(2);   //返回bignumber对象
				
				
				
				return this.lists.reduce((total,v)=>{
					if(v.checked){
						//new BigNumber(v.price)
						total=new BigNumber(v.price).times(v.num).plus(total).toString();
						
						
					}
					return total;
				},0);
			},
			total(){
				if(this.lists.length==0) return 0;
				return this.lists.reduce((total,v)=>{
					if(v.checked){
						total+=v.num;
					}
					return total
				},0)
			}
		},
		methods: {
			getCartlists(uid){
				this.$api.getCartLists({uid}).then(response=>{
					//console.log(response);
					if(response.code==1){
						this.lists=response.data;
						this.lists.map(v=>{
							v.options=false
						});
						console.log(this.lists)
					}else{
						this.toast(response.msg);
					}
				})
			},
			showOptions(index){
				this.lists[index].options=true;
				this.$forceUpdate()
			},
			del(id,index){
				this.$api.deleteCart({_id:id}).then(reponse=>{
					this.lists.splice(index,1)
				})
			},
			toggleChecked(index){
				let _id=this.lists[index]._id;
				let checked=this.lists[index].checked?false:true;
				this.$api.changeCartChecked({_id,checked:this.lists[index].checked}).then(response=>{
					if(response.code==1){
						this.lists[index].checked=checked//this.lists[index].checked?false:true;
					}else{
						this.toast(response.msg)
					}
				})
				 
			},
			toggleAllChecked(){
				let checked = this.totalChecked;
				
				this.lists.forEach(v=>{
					v.checked=!checked;
				})
			},
			changeNumber(e){
				let  {value,type}=e;
				this.$api.changeCartNum({_id:this.lists[e.index]._id,num:value}).then(reponse=>{
					//console.log(reponse);
					if(reponse.code==1){
						this.lists[e.index].num=value;
					}else{
						this.toast(reponse.msg)
					}
				})
			},
			createOrder(){    //获取商品id
				let list = this.lists.filter(v=>{
					return v.checked;
				})
				if(list.length==0){
					this.toast('至少选择一件商品');
					return
				}
				let ids = list.map(v=>{
					return v._id;
				}).join();
				this.to('/pages/create-order/create-order?cart_id='+ids);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		width: 100%;
		height: 100%;

		.nav {
			background-color: #fff;
			padding: 16rpx 32rpx;
			border-bottom-left-radius: 24rpx;
			border-bottom-right-radius: 24rpx;
			display: flex;
			justify-content: space-between;

			.location {
				font-size: 28rpx;
				display: flex;
				align-items: center;

				.icon {
					font-size: 40rpx;
				}
			}

			&::before {
				content: '';
				width: 100%;
				height: 1px;
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				background-color: #f1f1f1;
				transform: scaleY(0.5);
			}
		}

		.list {
			margin: 32rpx 0;
			background-color: #fff;
			border-radius: 24rpx;
			padding: 16px 0;
			.box {
				margin-bottom: 32rpx;
				display: flex;
				padding: 0 16rpx;
				position: relative;
				.check{
					width: 80rpx;
					flex-shrink: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					.icon{
						font-size: 48rpx;
					}
					.icon-check{
						color: $uni-color-primary;
					}
				}
				.image{
					width: 200rpx;
					height: 200rpx;
					flex-shrink: 0;
					border-radius: 24rpx;
					overflow: hidden;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.content{
					margin-left: 10rpx;
					flex: 1;
					.title{
						font-size: 28rpx;
					}
					.sku{
						font-size: 24rpx;
						text{
							margin-right: 20rpx;
							background-color: #eee;
							padding: 4rpx;
							border-radius: 8rpx;
						}
					}
					.price-line{
						margin-top: 20rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.price{
							color: #e13031;
						}
					}
				}
				&::after {
					content: '';
					width: 100%;
					height: 1px;
					position: absolute;
					left: 0;
					bottom: 0;
					right: 0;
					background-color: #f1f1f1;
					transform: scaleY(0.5);
				}
			}
		}
		.fix-bar{
			background-color: #fff;
			position: fixed;
			bottom: 50px;
			left: 0;
			right: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 32rpx;
			height: 88rpx;
			.amount{
				font-size: 28rpx;
				display: flex;
				align-items: center;
				flex: 1;
				text{
					margin-right: 10rpx;
				}
				.icon{
					font-size: 48rpx;
				}
				.icon-check{
					color: $uni-color-primary;
				}
			}
			.btn{
				width: 240rpx;
				display: flex;
				align-items: center;
				button{
					background-color: #e13031;
					color: #fff;
					font-size: 28rpx;
					height: 80rpx;
					line-height: 80rpx;
					border-radius: 80rpx;
				}
			}
		}
		.options{
			z-index: 1000;
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			.mask{
				position: absolute;
				top: 0;
				bottom: 0;
				right: 0;
				left: 0;
				background-color: rgba(0,0,0,0.3);
			}
			.op{
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
				z-index: 1001;
				position: absolute;
				top: 0;
				bottom: 0;
				right: 0;
				left: 0;
				.delete{
					width: 140rpx;
					height: 140rpx;
					background-color: #e13031;
					border-radius: 50%;
					color: #fff;
					text-align: center;
					line-height: 140rpx;
					font-size: 36rpx;
				}
			}
		}
	}
</style>
