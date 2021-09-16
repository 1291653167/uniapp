export default{
	data(){
		return{
			
		}
	},
	filters:{
		VisibileTel(tel){
			tel= tel.replace(/^(\d{3})\d+(\d{4})$/,"$1****$2");
			return tel
		}
	},
	methods:{
		to(url){
			uni.navigateTo({     //跳转非tab页面
				url:url
			})
		},
		toAuth(url){
			if(!this.$store.getters.uid){
				this.toast('请登录');
				setTimeout(()=>{
					uni.navigateTo({
						url:'/pages/public/login'
					})
				},1500);
				return;
			}
			uni.navigateTo({
				url:url
			})
		},
		toast(title,icon="none"){
			uni.showToast({
				title:title,
				icon:icon 
			})
		}
	}
}