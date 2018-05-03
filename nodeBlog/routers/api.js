
var express = require('express');
var router = express.Router();
var User = require('../modules/User');

//统一返回格式
var responseData;

router.use( function(req, res, next) {
    responseData = {        //初始化
        code: 0,
        message: ''
    };
    next();
} );

// 用户注册
    //注册逻辑  
        // 用户名是否空
        // 密码是否空
        // 二次密码是否一致
router.post('/user/register' , function( req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

// 判断是否为空
    if(username ==''){
        responseData.code =1 ;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }
    if(password ==''){
        responseData.code =2 ;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    if(password != repassword ){
        responseData.code =3 ;
        responseData.message = '两次密码不一致';
        res.json(responseData);
        return;
    }
    // responseData.message = '注册成功';
    // res.json(responseData);


    //用户名是否已经被注册了，如果数据库中已经存在和我们要注册的用户名同名的数据，表示该用户名已经被注册了
    User.findOne({
        username: username
    }).then(function( userInfo ) {
        if ( userInfo ) {
            //表示数据库中有该记录
            responseData.code = 4;
            responseData.message = '用户名已经被注册了';
            res.json(responseData);
            return;
        }
        //保存用户注册的信息到数据库中
        var user = new User({
            username: username,
            password: password
        });
        return user.save();
    }).then(function(newUserInfo) {
        responseData.message = '注册成功';
        res.json(responseData);
    });
});

//登录
router.post('/user/login' , function( req,res,next){
    var username = req.body.username;
    var password = req.body.password;

// 判断是否为空
    if(username ==''|| password ==''){
        responseData.code =1 ;
        responseData.message = '用户名或密码不能为空';
        res.json(responseData);         //json形式返回
        return;
    }

//查询数据库  用户信息是否存在
    User.findOne({
        username: username,
        password: password
    }).then(function( userInfo){
        if(!userInfo){
            responseData.code= 2;
            responseData.message ='用户名或密码错误';
            res.json(responseData);
            return ;
        }
        responseData.message = '登录成功';
        responseData.userInfo ={
            _id: userInfo.id,
            username: userInfo.username
        }
        //登陆成功后 存储信息到本地cookie
        req.cookies.set('userInfo' ,JSON.stringify({
            _id:userInfo._id,
            username:userInfo.username
        }) );
        res.json(responseData);
        return;
    })


});

//退出
router.get('/user/logout' ,function(req,res){
    req.cookies.set('userInfo' , null );
    res.json(responseData);
    return;
})






module.exports= router;



