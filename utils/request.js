let Fly= require("flyio/dist/npm/wx"); //引入flyio
let fly=new Fly();                    //创建flyio对象
fly.config.baseURL="https://6262a340-a425-4e93-a938-868ca3a0e26f.bspapp.com/http/" //请求基地址
fly.interceptors.request.use(function(request){  //请求拦截
	// console.log("请求拦截");
	// return request;  //可写,可不写  默认会返回request
	let token = uni.getStorageSync('token')
	request.headers.token=token;
	// #ifdef APP-PLUS
	request.headers.platform="app-plus"
	// #endif
	// #ifdef H5
	request.headers.platform="H5"
	// #endif
	uni.showLoading({
		title:"正在加载"
	})
	// console.log(request);
	return request
});
fly.interceptors.response.use(function(response){
	uni.hideLoading()
	// console.log("响应拦截");
	// console.log(response);
	return response.data;
})
fly.config.timeout=3000;

export default fly;