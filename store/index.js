import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
	state: { //数据对象 和 本地存储相结合
		token: '' || uni.getStorageSync('token'),
		tokenExpired: '' || uni.getStorageSync('tokenExpired'),
		uid: '' || uni.getStorageSync('uid'),
		username: '',
		userInfo: ''
	},
	getters: { //获取数据
		token(state) {
			return state.token;
		},
		uid(state) {
			return state.uid;
		},
		tokenExpired(state) {
			return state.tokenExpired;
		}
	},
	mutations: { //设置数据  , 同步
		setToken(state, token) {
			state.token = token;
		},
		setTokenExpired(state, tokenExpired) {
			state.tokenExpired = tokenExpired;
		},
		setUid(state, uid) {
			state.uid = uid;
		},
		setUsername(state, username) {
			state.username = username;
		},
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		},
		logout(state) {
			state.uid = '';
			state.token = '';
			state.tokenExpired = '';
			state.username = '';
			state.userInfo = '';
			uni.removeStorageSync('uid');
			uni.removeStorageSync('token');
			uni.removeStorageSync('tokenExpired');
		}
	},
	actions: { //间接设置数据  , 异步
		//getUser(context){}
		getUser({
			commit
		}, token) {
			//this.$api
			Vue.prototype.$api.getUser({
				token
			}).then(response => {
				console.log(response);
				commit("setUserInfo", response.userInfo)
			})
		}
	},
	modules: {

	}
})
