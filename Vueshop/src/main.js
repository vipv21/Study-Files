// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button} from 'vant'   //配置后的按需引入

Vue.use(Button);

// import Vant from 'vant'   //引入vant组件
// import 'van/lib/vant-css/index.css'   //引入vant组件样式
// Vue.use(Vant);    //使用vant



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
