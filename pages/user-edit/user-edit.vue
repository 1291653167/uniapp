<template>
	<view class="page">
		<view class="cells user-edit">
			<view class="cell bottom">
				<view class="label">
					头像
				</view>
				<view class="content">
					<text class="value">
						<yq-avatar @upload='upload' selWidth="400rpx" selHeight="400rpx" :avatarSrc="info.avatar || '../../static/ruibite.png'" avatarStyle="width:60rpx;height:60rpx"></yq-avatar>
					</text>
					<text class="icon icon-pull-left"></text>
				</view>
			</view>
			<view class="cell bottom">
				<view class="label">
					用户名
				</view>
				<view class="content">
					<text class="value">{{info.username}}</text>
					<text class="icon icon-pull-left"></text>
				</view>
			</view>
			<view class="cell bottom">
				<view class="label">
					昵称
				</view>
				<view class="content">
					<text class="value">
						<input placeholder="请输入用户昵称,1-8个字符" v-model="info.nickname" />
					</text>
					<text class="icon icon-pull-left"></text>
				</view>
			</view>
			<view class="cell bottom" @click="showSex=true">
				<view class="label">
					性别
				</view>
				<view class="content">
					<text class="value">{{info.sex||"请选择性别"}}</text>
					<text class="icon icon-pull-left"></text>
				</view>
			</view>
			<view class="cell bottom" @click="showDate=true">
				<view class="label">
					出生日期
				</view>
				<view class="content">
					<text class="value">{{info.birthday||'请选择出生日期'}}</text>
					<text class="icon icon-pull-left"></text>
				</view>
			</view>
			<view class="cell bottom" @click="showAddress=true">
				<view class="label">
					所在地
				</view>
				<view class="content">
					<text class="value">{{info.addr||'请选择所在地'}}</text>
					<text class="icon icon-pull-left"></text>
				</view>
			</view>
			<view class="cell bottom">
				<view class="label">
					手机号
				</view>
				<view class="content">
					<text class="value">{{info.username}}</text>
					<text class="icon icon-pull-left"></text>
				</view>
			</view>

		</view>
		<button class="btn" @click="save">保存</button>
		
		<w-picker default-type='value' :value="info.addr_Code" mode="region"
		 :visible="showAddress" @confirm='confirm($event,"addr")'
		  @cancel='showAddress=false'></w-picker>
		  
		<w-picker :value="info.birthday" @confirm='confirm($event,"date")' 
		@cancel='showDate=false' mode="date" :visible="showDate" startYear="1970" 
		endYear="2030" :current="false" fields="day"></w-picker>
		
		<w-picker mode='selector' :visible="showSex" :options='sex' 
		:value="info.sex" @cancel='showSex=false'
		 @confirm='confirm($event,"sex")' ref='sex'></w-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showAddress: false,
				showDate:false,
				showSex:false,
				sex:[{label:'男',value:'男'},
					 {label:'女',value:'女'},
					 {label:'保密',value:'保密'},
				]
			}
		},
		computed: {
			info() {
				return {
					...this.$store.state.userInfo
				}
			}
		},
		onLoad() {
			//console.log(this.$store.state.userInfo)
			this.$store.dispatch('getUser',this.$store.getters.token);
		},
		methods: {
			confirm(v,type) {
				if(type=='addr'){
					this.showAddress = false;
					this.info.addr = v.result;
					this.info.addr_code=v.value;
				}else if(type=='date'){
					this.showDate=false;
					this.info.birthday=v.value;
				}else if(type=='sex'){
					this.info.sex=v.value;
					this.showSex=false;
				}
			},
			upload(v){
				console.log(v);
				this.info.avatar=v.path;
				this.$forceUpdate();
			},
			async save(){
				let{avatar,nickname,sex,birthday,addr,addr_code}=this.info;
				let uid=this.$store.getters.uid;
				
				if(avatar&&avatar.startsWith('blob')||avatar.startWith('_doc')){
					this.toast("正在上传...");
	
					let result = await new Promise((resolve,reject)=>{
						uni.uploadFile({        //异步函数
							url:'http://81.70.99.163:8000/common/upload',
							filePath:avatar,
							name:'file.png',
							success:(response)=>{
								console.log(response);
								if(response.statusCode==200){
									resolve("http://81.70.99.163:8000"+response.data);
								}else{
									reject("上传错误");
								}
							}
						})
					})
					avatar = result;
					//需要把上传头像保存成一个同步函数 await  Async promise
					
				}
				//个人信息数据保存到后台
				this.$api.saveUserInfo({avatar,nickname,sex,birthday,addr,addr_code,uid}).then(response=>{
					console.log(response);
					if(response.code==1){
						this.toast(response.msg);
						this.$store.dispatch('getUser',this.$store.getters.token);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.user-edit {
		.content {
			color: #999;
			font-size: 24rpx;
			text-align: right;
			display: flex;
			align-items: center;
			justify-content: flex-end;

			.value {
				input {
					font-size: 24rpx;
					color: #999;
				}
			}

			.icon {
				font-size: 24rpx;
			}
		}
	}
	.btn{
		margin: 32rpx;
		background-color: #e13031;
		color: #fff;
		border-radius: 120rpx;
	}
</style>
