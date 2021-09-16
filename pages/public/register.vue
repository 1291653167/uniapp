<template>
	<view class="page">
		<view class="logo">
			<img src="../../shopss/src/static/youxuan.png" />
		</view>
		<form>
			<view class="form-box">
				<view class="input">
					<!-- placeholder-class  提示信息的类名 -->
					<input placeholder-class="input-placeholder" placeholder="请输入手机号" v-model="username" />
				</view>
				<view class="input input-code">
					<input placeholder-class="input-placeholder" placeholder="请输入验证码" v-model="vercode">
					<!-- <view class="code">	获取验证码</view> -->
					<verCode   :username="username" type="register"></verCode>
				</view>
				<view class="input">
					<input placeholder-class="input-placeholder" type="password" placeholder="请输入密码" v-model="password">
				</view>
			</view>
			<view class="submit">
				<button :loading="loading" @click="submit">立即注册</button>
			</view>
		</form>
	</view>
</template>

<script>
	import verCode from '../../components/ver-code/ver-code.vue'
	export default {
		components: {
			verCode
		},
		data() {
			return {
				username: '',
				password: '',
				vercode: '',
				loading:false
			}
		},
		methods:{
			submit(){
				this.loading=true;
				let {username,password,vercode}=this;
				if(!/^1[3-9]\d{9}$/.test(username)){
					this.toast('手机格式错误');
					return;
				}
				if(!/^\d{6}$/.test(vercode)){
					this.toast('验证码格式错误');
					return;
				}
				if(!/^\w{6,12}$/.test(password)){
					this.toast("密码格式错误");
					return
				}
				this.$api.register({username,vercode,password}).then(response=>{
					if(response.code==0){
						this.loading=false;
						this.toast(response.msg);
						setTimeout(v=>{
							this.to('/pages/public/login')
						},2000);
					}else{
						this.toast(response.msg);
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

	.input-code {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.code {
			width: 200rpx;
			box-sizing: border-box;
			text-align: center;
			position: relative;
			margin-left: 20rpx;
			color: rgba(0, 0, 0, 0.5);

			&::before {
				position: absolute;
				content: "";
				width: 1px;
				height: 40rpx;
				background-color: rgba(0, 0, 0, 0.3);
				top: 30rpx;
				left: 0;
			}
		}

		input {
			flex: 1;
		}
	}

	.submit {
		margin: 60rpx 30rpx;

		button {
			border-radius: 60rpx;
			border: 0;
			background-color: #e13031;
			color: #fff;
		}
	}
</style>
