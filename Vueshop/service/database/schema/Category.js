const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
// 分类模型建立 插入数据
const categorySchema = new Schema({
    ID :{unique:true,type:String},
    MALL_CATEGORY_NAME:{type:String},
    IMAGE:{type:String},
    TYPE:{type:Number},
    SORT:{type:Number},
    COMMENTS:{type:String},
})
mongoose.model('Category' ,categorySchema);