import Vue from 'vue'
import App from './App'
import ClUni from "cl-uni";
import store from './store'
Vue.use(ClUni, {
	homePage: "/"
});
Vue.config.productionTip = false

import api from "api/api.js"

Vue.prototype.$api = api; //绑定原型
App.mpType = 'app'

import mixin from './utils/mixins'
Vue.mixin(mixin);
const app = new Vue({
	...App,
	store
})
app.$mount()
