const Koa= require('koa')   //引入Koa
const app = new Koa();          
const {connect} = require('./dataBase/init.js')


//立即执行函数
;(async()=>{
    await connect()
})();


app.use(async(ctx)=>{
    ctx.body = '我就是测试啊'
})


//监听服务器3000 端口
app.listen(3000,()=>{
    console.log('服务启动成功')
})








