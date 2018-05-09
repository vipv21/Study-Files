// 入口页

// 加载 express
var express = require('express');

//加载模板 处理模块
var swig = require('swig');

//加载数据库模块
var mongoose = require('mongoose');

//加载 body-parser 用来处理post提交的数据
var bodyParser = require('body-parser');

//加载cookies模块
var Cookies = require('cookies');

//创建app 服务端对象
var app= express();

//用户模型   读取数据库用户信息
var User = require('./modules/User');

//设置静态文件托管
//用户访问url以/public 开始，那么直接返回对应的__dirname + './public' 下的文件
app.use('/public' , express.static( __dirname + '/public' )  );


// 配置模板  定义模板引擎
//定义 当前使用的模板引擎  第一个参数 模板引擎名称  第二个参数 解析处理模板引擎 内容的方法
app.engine('html', swig.renderFile );
//设置 模板存放路径  第一个必须是views 第二个是参数目录
app.set('views' , './views');
//注册 所使用的模板引擎 一：view engine  二：参数和app.engine 和方法中定义的模板名称(html)一致
app.set('view engine' , 'html')

//开发中  禁用模板缓存
swig.setDefaults({ cache:false });

// body-parser设置
app.use(bodyParser.urlencoded({extended:true }) )  //解码编码的

//设置cookie
app.use( function(req, res, next) {
    req.cookies = new Cookies(req, res);

    //解析登录用户的cookie信息
    req.userInfo = {};
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));

            //获取当前登录用户的类型，是否是管理员
            User.findById(req.userInfo._id).then(function(userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })
        }catch(e){
            next();
        }

    } else {
        next();
    }
} );


//根据不同功能的划分 模块 路由
app.use('/admin' , require('./routers/admin'));
app.use('/api' , require('./routers/api'));
app.use('/' , require('./routers/main'));

app.use('/orderT' , require('./routers/search'));   //查询接口




// req: request对象  --保存客户端请求的数据
// res：response对象  --服务端输出对象提供服务端一些方法
// next 函数
app.get('/' ,function(req,res,next){
    //请求返回值
    //res.send('谢谢你的到来');

    // 读取views目录下的指定文件，解析并返回客户端
    //第一个参数表示模板文件 相对于views目录 views/index.html
    //第二个参数表示 传递给模板使用的数据
    res.render('index');

});

app.get('./main.css' ,function(req,res,next){
    res.setHeader('content-type', ' text/css');
    res.send();
})

//监听请求
    //连接数据库
mongoose.connect( 'mongodb://localhost:27017/blog'  ,function(err){
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
        app.listen(8081);       //设置监听端口
    }
});   



















