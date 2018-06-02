const mongoose = require('mongoose');
const db= 'mongodb://localhost/vueShop-db'

exports.connect=()=>{
    //连接数据库 
    mongoose.connect(db)

    //增加数据库监听事件
    mongoose.connection.on('disconnected',()=>{
        console.log('数据库连接断开')
        mongoose.connect(db)
    })
    //数据库出错
    mongoose.connection.on('error', () => {
      console.log('数据库连接错误')
      mongoose.connect(db)
    })
    //连接打开的时候 
    mongoose.connection.once('open', () => {
      console.log('数据库连接')
    })

}