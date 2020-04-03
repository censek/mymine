import Vue from 'vue'
import App from './App'
//导入 vue router
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import Vuetify from 'vuetify'
// vuetify样式
import 'vuetify/dist/vuetify.min.css'
// 表单验证
import Vuelidate from 'vuelidate'
// 百度地图
import BaiduMap from 'vue-baidu-map'
import store from './store'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);
Vue.prototype.$axios = axios
Vue.use(Vuetify);
Vue.use(Vuelidate)
Vue.config.productionTip = false
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'iybSMvqfTMHZlgVySASC6donCu3daCEF'
})

Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount('#app')