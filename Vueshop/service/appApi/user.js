const Router = require('koa-router');
const mongoose = require('mongoose'); //引入mongoose

let router =new Router() 
    router.get('/' ,async(ctx)=>{
        ctx.body='这是用户操作首页'
    })
 
//用户注册接口
router.post('/register', async (ctx) => {
    const User =mongoose.model('User');     
    let newUser = new User(ctx.request.body); //把从前端接收到的数据 封装成一个新的user对象

    await newUser.save().then(() => { //用mongoose的save方法存储数据
        ctx.body={
            code:200,
            message:'注册成功'
        }
    }).catch(error=>{
        ctx.body={
            code:500,
            message:error
        }
    })



})

//暴露接口
module.exports= router ;




