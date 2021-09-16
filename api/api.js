import fly from "utils/request"

export default{
	getBanner(params) {                           //获取轮播图
		return fly.post("api/get_banner",params);
	},
	getCate(params){                             //获取导航
		return fly.post("api/get_cate",params);
	},
	getCompetitive(params={skip:0,limit:3}){     //获取精选
		return fly.post("api/get_competitive",params);
	},
	getLike(params={skip:0,limit:10}){           //获取猜你喜欢在
		return fly.post('api/get_like',params)
	},
	getProductLists(params){                    //获取商品列表
		return fly.post('api/get_goods_list',params);
	},
    getProductDatail(params){               	//获取商品详情
		return fly.post('api/get_goods_detail',params);
	},
	getProductComment(params){               	//获取商品评价
		return fly.post('api/get_goods_comment',params);
	},
	sendSms(params){                         	//发送验证码
		return fly.post('user/sendSms',params);
	},
	register(params){
		return fly.post('user/reg',params);
	},
	login(params){
		return fly.post('user/login',params);
	},
	codeLogin(params){
		return fly.post('user/code_login',params);
	},
	forgetPassword(params){
		return fly.post('user/forget',params)
	},
	fav(params){
		return fly.post('api/toggle_fav',params)
	},
	addCart(params){
		return fly.post('api/add_cart',params)
	},
	getUser(params){
		return fly.post('user/getuserInfo',params)
	},
	getUpgrade(params){
		return fly.post('api/upgrade',params)
	},
	getAbout(params){
		return fly.post('api/get_about',params)
	},
	saveUserInfo(params){      //保存个人信息
		return fly.post('user/editUserInfo',params)
	},
	getAddresslists(params){   //获取收货地址列表
		return fly.post('order/getAddrList',params)
	},
	setDefaultAddress(params){   //设置默认收货地址
		return fly.post('order/set_default_addr',params)
	},
	deleteAddress(params){   //删除收货地址
		return fly.post('order/del_addr',params)
	},
	getAddressDetail(params){   //获取收货地址详情
		return fly.post('order/get_addr_detail',params)
	},
	saveAddress(params){   //保存收货地址
		return fly.post('order/saveAddress',params)
	},
	getCartLists(params){   //获取购物车列表
		return fly.post('api/get_cart_list',params)
	},
	changeCartNum(params){   //更改购物车数量
		return fly.post('api/change_cart_num',params)
	},
	changeCartChecked(params){   //购物车后台数量
		return fly.post('api/toggle_check_cart',params)
	},
	deleteCart(params){   //购物车删除
		return fly.post('api/remove_cart',params)
	},
	getDefaultAddress(params){   //获取默认收货地址
		return fly.post('order/get_default_addr',params)
	},
	checkOrder(params){   
		return fly.post('order/checkOrder',params)
	},
	submitOrder(params){   
		return fly.post('order/submitOrder',params)
	},
	getAlipayPay(params){
		return fly.post('order/payOrder',params)
	},
	getFavLists(params){
		return fly.post('api/get_fav_list',params)
	},
	getSearchListt(params){
		return fly.post('api/get_search_list',params)
	},
	getOrderLists(params){
		return fly.post('order/getOrderList',params)
	},
	getOrderListsById(params){
		return fly.post('order/query_order',params)
	},
	getOrderDetail(params){
		return fly.post('order/getOrderDetail',params)
	},
	cancalOrder(params){
		return fly.post('order/cancel_order',params)
	},
	delOrder(params){
		return fly.post('order/del_order',params)
	},
	payTest(params){
		return fly.post('order/payTest',params)
	},
	expressSend(params){
		return fly.post('order/send',params)
	},
	shouhuo(params){
		return fly.post('order/shouhuo',params)
	},
	wuliu(params){
		return fly.post('order/wuliu',params)
	},
	
}
