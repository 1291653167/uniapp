<template>
	<view>
		<cl-timeline>
			<cl-timeline-item :contnet='item.content' :timestamp='item.time' v-for="(item,index) in traces" :key="index">
				
			</cl-timeline-item>
			 
		</cl-timeline>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				express_com:'',
				express_no:'',
				traces:[]
			}
		},
		onLoad(params) {
			 
			this.express_com=params.express_com;
			this.express_no=params.express_no;
			this.Express()
		},
		methods: {
			 Express(){
			let {express_com,express_no}=this;
			this.$api.wuliu({express_com,express_no}).then(response=>{
				console.log(response)
				this.traces=response.data.data.Traces;
			})
		}
		}
	}
</script>

<style>

</style>
