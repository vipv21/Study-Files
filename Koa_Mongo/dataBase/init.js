const mongoose = require('mongoose');
const db= 'mongodb://localhost/test1'

mongoose.Promise = global.Promise ; 

exports.connect=()=>{
    //连接数据库 
    mongoose.connect(db);

    let maxTimes= 0     //初始化连接次数
    return new Promise((resolve,reject)=>{
        //增加监听
        mongoose.connection.on('disconnected', () => {
            if (maxTimes<=3) {
                maxTimes++ ;
                mongoose.connect(db);   //重连
            } else {
               reject();
               throw new Error('数据库出现问题')    //抛出异常  
            }
        })

        //监听错误
        mongoose.connection.on('error', (err) => {
            if (maxTimes <= 3) {
                console.log(err) //打印错误
                maxTimes++;
                mongoose.connect(db); //重连
            } else {
                reject();
                throw new Error('数据库出现问题22') //抛出异常  
            }
        })

        //连接打开的时候
        mongoose.connection.once('open', (err) => {
            console.log('连接打开')
            resolve();
        })
    })

}





