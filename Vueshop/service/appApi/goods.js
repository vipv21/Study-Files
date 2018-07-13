// const Koa = require('Koa');
// const app = new Koa();
const Router =require('koa-router');
let router = new Router();

const mongoose =require('mongoose');
const fs = require('fs');
//路由 访问接口 --> /insertAllGoodsInfo
router.get('/insertAllGoodsInfo',async(ctx)=>{
    fs.readFile('./newGoods.json','utf8',(err,data)=>{
        data = JSON.parse(data);
        let saveCount = 0;
        const Goods = mongoose.model('Goods')
        data.map((value,index)=>{
            console.log(value);
            let newGoods =new Goods(value);
            newGoods.save().then(()=>{
                saveCount++;
                console.log('成功'+saveCount);
            }).catch(error=>{
                console.log(MediaStreamErrorEvent);
            })
        })
    })
    ctx.body= '开始导入数据';
} )

module.exports =router ; //暴露路由接口出去