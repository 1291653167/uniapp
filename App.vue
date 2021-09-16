<script>
	export default {
		onLaunch: function() {  //当第一次启动项目时触发, 全局只触发一次
			//this.$http.post("api/get_banner").then(function(response){
				//console.log(response);
			//});
			console.log('App Launch')
		},
		onShow: function() {  //当uniapp启动,从后台进入前台显示
			console.log('App Show')
		},
		onHide: function() {  //当uniapp 从前台进入后台
			console.log('App Hide')
		},
		omPageNotFound:function(){  //当查找不存在时触发
			console.log('页面不存在');
			uni.switchTab({
				url:"pages/index/index"
			})
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url("/static/icon.css");
	@import  "cl-uni/index.scss";
	@import url("/static/common.css");
	body{
		background-color: $uni-bg-color;
		font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		height: 100%;
		-webkit-font-smoothing:antialiased;
		font-weight: lighter;
	}
	.input-placeholder{
		color: rgba(0,0,0,0.3);
	}
	.cells {
		background-color: #fff;
		margin: 32rpx 0;
		border-radius: 24rpx;
	}
	.cell {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 88rpx;
		padding: 0 32rpx;
		.label{
			font-size: 28rpx;
		}
		.content{
			flex: 1;
		}
	}
	/**条件编译**/
	/* #ifdef H5*/
	uni-scroll-view .uni-scroll-view::-webkit-scrollbar{
		display: none;
		//隐藏滚动条但还具备滚动功能
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance:none;
		background: transparent;
		color: transparent;
	}
	/* #endif */
	
	/* 微信小程序 app滚动条*/
	/* #ifdef MP-WEIXIN || APP-PLUS */
	::-webkit-scrollbar{
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance:none;
		background: transparent;
		color: transparent;
	}
	/* #endif */
</style>
