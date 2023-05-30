import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import TDesign from 'tdesign-vue';
// 引入组件库的少量全局样式变量
import 'tdesign-vue/es/style/index.css';
Vue.use(TDesign);

/* 引入 axios 并挂载到 Vue 实例上，在各 Vue 组件通过 this.$axios 进行使用 */
Vue.prototype.$axios = axios

/* 指定 axios 发送请求的目标后端地址的根路径，一般为后端服务器IP+端口，若有部署域名则可以是域名地址；如果是在本地同时跑前后端，则可能是 http://localhost:8000 */
axios.defaults.baseURL = 'https://intth1.2022martu1.cn';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.config.productionTip = false