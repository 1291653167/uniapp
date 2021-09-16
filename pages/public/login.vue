<template>
	<view class="page">
		<view class="logo">
			<img src="../../shopss/src/static/youxuan.png" />
		</view>
		<form>
			<view class="form-box">
				<view class="switch">
					<view class="password-login current">
						密码登陆
					</view>
					<view class="password-login" @click="to('/pages/public/code-login')" >
						验证码登陆
					</view>
				</view>
				<view class="input">
					<!-- placeholder-class  提示信息的类名 -->
					<input placeholder-class="input-placeholder" placeholder="请输入手机号" v-model="username">
				</view>
				<view class="input">
					<input placeholder-class="input-placeholder" type="password" placeholder="请输入密码" v-model="password">
				</view>
			</view>
			<view class="submit">
				<button @click="login" >立即登陆</button>
			</view>
		</form>
		<view class="other">
			<view @click="to('/pages/public/register')">
				立即注册
			</view>
			<view >
				忘记密码
			</view>
		</view>
		<view class="argument">
			登陆即代表您已经同意商城隐私
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				username:'',
				password:'',
				loading:false
			}
		},
		methods:{
			login(){
				this.loading=true
				let {username,password}=this;
				if(!/^1[3-9]\d{9}$/.test(username)){
					this.toast('手机格式错误');
					return;
				}
				if(!/^\w{6,12}$/.test(password)){
					this.toast("密码格式错误");
					return
				}
				this.$api.login({username,password}).then(response=>{
					console.log(response);
					this.loading=false;
					if(response.code==0){
						this.toast(response.msg,"success");
						this.$store.commit('setToken',response.token);
						this.$store.commit('setTokenExpired',response.tokenExpired);
						this.$store.commit('setUid',response.uid);
						this.$store.commit('setUsername',response.username);
						this.$store.commit('setUserInfo',response.userInfo);
						uni.setStorageSync('token',response.token);
						uni.setStorageSync('tokenExpired',response.tokenExpired);
						uni.setStorageSync('uid',response.uid);
						setTimeout(v=>{
							uni.navigateBack({
								delta:1
							})
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

	
	.submit{
		margin: 60rpx 30rpx 0;
		button{
			border-radius: 60rpx;
			border: 0;
			background-color: #e13031;
			color: #fff;
		}
	}
	.switch{
		display: flex;
		justify-content: space-between;
		align-items: center;
		view{
			flex: 1;
			text-align: center;
			height: 80rpx;
		}
		.current{
			color: #e13031;
			border-bottom: 1px solid #e13031;
		}
	}
	.other{
		margin:20rpx 30rpx;
		display: flex;
		justify-content: space-between;
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
