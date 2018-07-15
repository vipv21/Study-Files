const mongoose = require('mongoose');   //引入mongoose
const Schema = mongoose.Schema;     //声明为常量
// 分类模型表 建立 插入数据
const categorySubSchema = new Schema({
  ID: {
    unique: true,   //唯一值
    type: String    //类型
  },
  MALL_CATEGORY_ID: {   //大类id
    type: String
  },
  MALL_SUB_NAME: {  //子类名称
    type: String
  },
  COMMENTS: {
    type: String
  },
  SORT: {
    type: Number
  }
})
// 建立的表名CategorySub 
mongoose.model('CategorySub', categorySubSchema);       //暴露接口