//封装AXios    数据请求接口  公共接口
const BASEURL = 'https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/' ;  
const LOCALURL = 'http://127.0.0.1:3000/';

const URL={
    getShoppingMallInfo: BASEURL + 'index' ,    //商城首页 数据
    getGoodsInfo: BASEURL + 'getGoodsInfo' ,    //商城产品信息
    registerUser: LOCALURL+'user/register' ,    //用户注册接口
    login:LOCALURL + 'user/login',              //用户登录接口
    getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', //获取商品信息详情
}

module.exports = URL    //对外暴露接口 方便引用

