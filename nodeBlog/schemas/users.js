
var mongoose =require ('mongoose');

// 用户表结构
//使用  module.exports 暴露
module.exports=  new mongoose.Schema({
   
    username:String,    //用户名

    password:String,     //密码

    isAdmin:{       //是否为管理员
        type:Boolean,       //布尔类型
        default: false      //默认不是管理员
    }



})










