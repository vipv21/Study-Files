const Koa = require('koa'); //声明常量 引入koa
const app = new Koa();      //实例化 Koa
const mongoose = require('mongoose');
const {connect,initSchemas} =require('./database/init.js')



//立即执行函数
;(async()=>{
    await connect();
    initSchemas();
    const User = mongoose.model('User');
    let oneUser = new User({userName:'xiaoxin',password:'123456'})
    oneUser.save().then(()=>{
        console.log('插入成功');
    })
    let user = await User.findOne({}).exec();   //查询

    console.log('这是'+user);

})()

app.use(async(ctx)=>{       
    ctx.body = " <h1>111111</h1>"   //页面输出内容
})

app.listen(3000,()=>{       //监听3000端口
    console.log('监听端口3000成功~');
})
