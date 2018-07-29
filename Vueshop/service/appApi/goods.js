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

//获取商品详情信息接口  async/await  或者promise/then 方法
router.post('/getDetailGoodsInfo',async(ctx)=>{
    //使用try catch 捕获异常
    try{
        let goodsId = ctx.request.body.goodsId; //获取前端请求的参数
        const Goods = mongoose.model('Goods');  //查询mongoose的模型Goods
        let result = await Goods.findOne({ID:goodsId}).exec()  //查找字段
        ctx.body={code:200 ,message:result};
    }catch(error){  //打印异常
        ctx.body={ code:500 ,message:error};
    }
})

//读取大类信息
router.get('/getCategoryList', async(ctx)=>{
    try {
        //const 声明常量   let 声明局部变量
        const Category = mongoose.model('Category');
        let result = await Category.find().exec();
        ctx.body={code:200 ,message:result};
    } catch (error) {
        ctx.body={code:500, message:error}
    }
})

//读取小类信息 api
router.post('/getCategorySubList' ,async(ctx)=>{
    try {
        let categoryId = ctx.request.body.categoryId;
        // let categoryId = 1;
        //const 声明常量   let 声明局部变量
        const CategorySub = mongoose.model('CategorySub');
        let result = await CategorySub.find({
          MALL_CATEGORY_ID: categoryId
        }).exec();
        ctx.body={code:200 ,message:result};
    } catch (error) {
        ctx.body={code:500, message:error}
    }
})

//根据类别获取商品列表
router.get('/getGoodsListByCategorySubID',async(ctx)=>{
    try {
        // let categorySubId = ctx.request.body.categorySubId;
        let categorySubId = '2c9f6c946016ea9b016016f79c8e0000';     //模拟的数据id
        const Goods = mongoose.model('Goods');  //获取模型
        let result = await Goods.find({     //查找SUB_ID
          SUB_ID: categorySubId
        }).exec();
        ctx.body={code:200 ,message:result};
    } catch (error) {
        ctx.body={code:500, message:error}
    }
})









module.exports =router ; //暴露路由接口出去