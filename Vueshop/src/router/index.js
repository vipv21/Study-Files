import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Main from '@/components/pages/Main'
import Member from '@/components/pages/Member'

Vue.use(Router);


export default new Router({
  routes: [
    //首页 底部tabbar
    {path:'/main',component:Main,
        children:[
            //首页路由
            {path: '/', name: 'ShoppingMall', component: ShoppingMall},
            //商品类别路由
            { path: '/CategoryList', name: 'CategoryList', component: CategoryList },
            //购物车路由
            { path: '/Cart', name: 'Cart', component: Cart },
            //个人中心
            {path:'/Member',name:'Member',component:Member},
        ]
    },
    //注册路由
    {path:'/register' ,name:'Register' ,component:Register },
    //登录路由
    { path: '/login', name: 'Login', component: Login },
    //商品详情路由
    { path: '/goods', name: 'Goods', component: Goods },

  ]
})

