// const Koa = require('Koa');
// const app = new Koa();
const Router =require('koa-router');
let router = new Router();

const mongoose =require('mongoose');
const fs = require('fs');
//-------------------接口路由-------------------

//插入所有商品数据 访问接口 --> /insertAllGoodsInfo
router.get('/insertAllGoodsInfo',async(ctx)=>{
    fs.readFile('./data_json/newGoods.json','utf8',(err,data)=>{
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

//插入 商品分类 接口 api
router.get('/insertAllCategory',async(ctx)=>{   //异步的方法
    fs.readFile('./data_json/category.json','utf8',(err,data)=>{  //读取本地json数据
        data = JSON.parse(data);    //json对象
        let saveCount = 0;
        const Category = mongoose.model('Category');    //引入Catrgory
        data.RECORDS.map((value,index)=>{    //循环保存数据到数据库
            let newCategory = new Category(value);
            newCategory.save().then(()=>{
                saveCount++;
                console.log('插入成功');
            }).catch(error=>{
                console.log('插入失败');
            })
        })
    })
    ctx.body='开始导入数据...'
})

//插入 商品分类子类  接口 api
router.get('/insertAllCategorySub', async (ctx) => { //异步的方法
  fs.readFile('./data_json/categorySub.json', 'utf8', (err, data) => { //读取本地json数据
    data = JSON.parse(data); //json对象
    let saveCount = 0;
    const CategorySub = mongoose.model('CategorySub'); //引入Catrgory
    data.RECORDS.map((value, index) => { //循环保存数据到数据库
      let newCategorySub = new CategorySub(value);
      newCategorySub.save().then(() => {
        saveCount++;
        console.log('插入成功');
      }).catch(error => {
        console.log('插入失败');
      })
    })
  })
  ctx.body = '开始导入数据...'
})



module.exports =router ; //暴露路由接口出去