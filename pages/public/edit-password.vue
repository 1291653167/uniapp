<template>
	<view class="page">
		<view class="logo">
			<img src="../../shopss/src/static/youxuan.png" />
		</view>
		<form>
			<view class="form-box">
				<view class="input">
					<!-- placeholder-class  提示信息的类名 -->
					<input placeholder-class="input-placeholder" placeholder="请输入手机号">
				</view>
				 
				<view class="input">
					<input placeholder-class="input-placeholder" type="password" placeholder="请设置原密码">
				</view>
				<view class="input">
					<input placeholder-class="input-placeholder" type="password" placeholder="请设置新密码">
				</view>
				<view class="input">
					<input placeholder-class="input-placeholder" type="password" placeholder="请再次输入新密码">
				</view>
			</view>
			<view class="submit">
				<button>立即注册</button>
			</view>
		</form>
		<view class="other">
			 
			<view>
				密码登陆
			</view>
		</view>
		<view class="argument">
			登陆即代表您已经同意商城隐私
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.page {
		width: 100%;
		height: 100%;
	}

	.logo {
		width: 150rpx;
		height: 150rpx;
		margin: 90rpx auto;

		img {
			width: 100%;
		}
	}

	.form-box {
		background-color: #fff;
		margin: 0 30rpx;
		border-radius: 24rpx;
		padding: 30rpx;

		.input {
			height: 100rpx;
			line-height: 100rpx;
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);

			input {
				height: 100%;
			}

			&:last-child {
				//选择器 &:
				border: 0;
			}
		}
	}

	.input-placeholder {
		color: rgba(0, 0, 0, 0.3);
	}

	
	.submit{
		margin: 60rpx 30rpx 0;
		button{
			border-radius: 60rpx;
			border: 0;
			background-color: #e13031;
			color: #fff;
		}
	}
	.other{
		margin:20rpx 30rpx;
		display: flex;
		justify-content: flex-end;
		padding-right: 20rpx;
		align-items: center;
		color: rgba(0,0,0,0.3);
		font-size: 24rpx;
	}
	.argument{
		margin-top: 100rpx;
		font-size: 24rpx;
		color: rgba(0,0,0,0.3);
		text-align: center;
	}
</style>
