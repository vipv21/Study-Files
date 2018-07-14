import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'


Vue.use(Router);


export default new Router({
  routes: [
    //首页路由
    {
      path: '/',
      name: 'ShoppingMall',
      component: ShoppingMall
    },
    //注册路由
    {path:'/register' ,name:'Register' ,component:Register },
    //登录路由
    { path: '/login', name: 'Login', component: Login },
  ]
})

