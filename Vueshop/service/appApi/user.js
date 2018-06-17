const Router = require('koa-router');

let router =new Router() 
    router.get('/' ,async(ctx)=>{
        ctx.body='这是用户操作首页'
    })
 
//用户注册接口
router.post('/register', async (ctx) => {
    console.log(ctx.request.body);
    ctx.body=ctx.request.body;
})

//暴露接口
module.exports= router ;




