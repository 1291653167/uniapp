<template>
	<button :loading="loading" :disabled="disabled" @click="sendSms">{{text}}</button>
</template>

<script>
	export default{
		data(){
			return{
				disabled:false,
				text:'获取验证码',
				loading:false
			}
		},
		props:['username','type'],
		methods:{
			sendSms(){
				this.loading=true;
				this.disabled=true
				let {username,type}=this;
				//验证手机号
				if(!/^1[3-9]\d{9}$/.test(username)){
					this.toast('手机格式错误');
					return;
				}
				this.$api.sendSms({mobile:username,type}).then(response=>{
					console.log(response)
					if(response.code==0){
						this.toast('发送成功',"success");
						this.loading=false;
						let time=60;
						let timer=null;
						timer=setInterval(v=>{
							time--;
							if(time==0){
								clearInterval(timer);
								time=60;
								this.disabled=false;
								this.text="重新获取"
							}else{
								this.text=time+'s后重新获取'
							}
						},1000);
					}else{
						this.toast(response.msg);
						this.loading=false;
						this.disabled=false;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	button{
		background-color: transparent;
		font-size: 28rpx;
		padding: 0;
		&::after{
			border:0;
		}
	}
</style>
