const mongoose = require('mongoose');
const db= 'mongodb:/localhost/vueTestOne'      //创建数据库
const glob = require('glob');   //载入glob
const {resolve} =require ('path');  //相对路径转为绝对路径


exports.initSchemas = ()=>{
    glob.sync(resolve(__dirname, './schema/','**/*.js')).forEach(require)
}

exports.connect=()=>{
    //连接数据库 
    mongoose.connect(db)

    let maxConnectTimes= 0;

    //确保数据库连接成功再执行其他，外层增加Promise
    return new Promise((resolve,reject)=>{
        //增加数据库监听事件
        mongoose.connection.on('disconnected', () => {
            console.log('数据库连接断开')
            if (maxConnectTimes<=3) {
                maxConnectTimes++ ;
                mongoose.connect(db)

            } else {
                reject();
                throw new Error('数据库出现问题...')
            }
        })
        //数据库出错
        mongoose.connection.on('error', () => {
        console.log('数据库连接错误')
            if (maxConnectTimes <= 3) {
              maxConnectTimes++;
              mongoose.connect(db)

            } else {
              reject();
              throw new Error('数据库出现问题2...')
            }
        })
        //连接打开的时候 
        mongoose.connection.once('open', () => {
            console.log('数据库连接')
            resolve()
        })

    })





}