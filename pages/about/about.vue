<template>
	<view class="page">
		<view class="box">
			<rich-text :nodes="content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:"<h3>我们是卖宠物食品的</h3>"
			}
		},
		onLoad() {
			this.$api.getAbout().then(response=>{
				this.content=response.data[0].desc;
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
    .page{
		width: 100%;
		height: 100%;
		.box{
			margin: 60rpx 200rpx;
		}
	}
</style>
