const Koa =require('koa');  //引入koa
const app = new Koa();      //实例化 Koa

app.use(async(ctx)=>{
    ctx.body=" <h1>111111</h1>"
})

app.listen(3000,()=>{       //监听3000端口
    console.log('监听端口3000成功~');
})
