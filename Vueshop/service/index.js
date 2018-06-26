const Koa = require('koa'); //声明常量 引入koa
const app = new Koa();      //实例化 Koa
const {connect,initSchemas} =require('./database/init.js')
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');   //中间件 解析post请求
const Router =require('koa-router');    //引入路由
const Cors = require('koa2-cors');      //解决跨域处理

 //使用app.use()   来注册使用
app.use(bodyParser());
app.use(Cors());   

let user= require('./appApi/user.js')   //引入user模块


//装载子路由
let router = new Router()
router.use('/user', user.routes());


//加载路由中间件
app.use(router.routes());   //加载路由上的routes
app.use(router.allowedMethods());










//立即执行函数
// ;(async()=>{
//     await connect();
//     initSchemas();
//     const User = mongoose.model('User');
//     let oneUser = new User({userName:'xiaoxin',password:'123456'})
//     oneUser.save().then(()=>{
//         console.log('插入成功');
//     })
//     let user = await User.findOne({}).exec();   //查询
//     console.log('这是'+user);
// })()

app.use(async(ctx)=>{       
    ctx.body = " <h1>111111</h1>"   //页面输出内容
})

app.listen(3000,()=>{       //监听3000端口
    console.log('监听端口3000成功~');
})
