const Router = require('koa-router');
const mongoose = require('mongoose'); //引入mongoose

let router =new Router() 

//用户操作接口
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

//用户登录接口
router.post('/login', async (ctx) => {
    let loginUser =ctx.request.body;    //获取登录信息
    console.log(loginUser);
    let userName = loginUser.userName;
    let password = loginUser.password;
    //引入User中的model
    const User = mongoose.model('User');

    await User.findOne({userName:userName}).exec()
    .then(async(result)=>{
        console.log(result);
        if (result) {   //判断用户是否存在 开始对比密码
            console.log(result);
            let newUser =new User();    //因为是实例方法 必须要new出对象 才能调用
            await newUser.comparePassword(password,result.password)
            .then(isMatch =>{
                ctx.body={ code:200 ,message:isMatch};
            }).catch(error=>{
                ctx.body={ code:500, message:error};
            })
        } else {
            ctx.body={code:200 , message:'用户名不存在'};
        }
    }).catch(error=>{
        ctx.body={code:500, message:error };
    })
})


//暴露接口
module.exports= router ;




