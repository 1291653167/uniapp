<template>
	<view>
		<view class="list col-1" >
			<view class="box" v-for="(data,index) in lists"  :key="data._id"  @longpress="showOptions(index)" >
				<view class="options" v-if="data.options">
					<view class="mask"></view>
					<view class="op">
						<view  class="delete" @click="del(data.goods_id,index)">删除</view>
					</view>
				</view>
				<view class="cover">
					<img :src="data.img" />
				</view>
				<view class="info">
					<view class="title line-2">
						{{data.name}}
					</view>
					<view class="price-line">
							<view class="price">￥<text>{{data.price}}</text></view><!-- 
							<view class="sales" @click="to(`/pages/product/product?id=`+data._id)">进入</view> -->
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
 
				skip:0,
				limit:10,
				lists:[],
				finished:false
			}
		},
		onLoad() {
		
			this.getFavLists()
		},onReachBottom() {
			if(this.finished){
				this.toast('没有更多数据了');
				return
			}
			this.getFavLists()
		},
		methods: {
			getFavLists(){
				let uid=this.$store.getters.uid;
				let {skip,limit}=this;
				this.$api.getFavLists({uid,skip,limit}).then(reponse=>{
					console.log(reponse)
					this.lists.push.apply(this.lists,reponse.data);
					this.lists.forEach(v=>{
						v.options=false
					})
					this.skip+=this.limit;
					if(this.lists.length>=reponse.count){
						this.finished=true
					}
				})
			},
			showOptions(index){
				console.log(index)
				this.lists[index].options=true;
				console.log(this.lists[index]);
				this.$forceUpdate();
			},
			del(id,index){
				let goods_id=id
				let uid=this.$store.getters.uid;
				let is_fav=1;
				this.$api.fav({goods_id,uid,is_fav}).then(reponse=>{
					console.log(reponse);
					if(reponse.code==1){
						this.toast(reponse.msg);
						this.lists.splice(index,1)
					}
					return;
			    })
		    }
		
		}
	}
</script>

<style lang="scss">
 
		.col-1 {
			margin: 30rpx 0;

			.box {
				padding: 10rpx;
				display: flex;
				background-color: #fff;
				border-bottom: 1px solid #f8f8f8;
				position: relative;
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
</style>
