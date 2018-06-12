const mongoose = require('mongoose');
const Schema = mongoose.Schema; //调用mongoose 的schema
let ObjectId = Schema.Types.ObjectId; //设置 主键

//创建UserShema 表
const userSchema = new Schema({
  UserId: {type:ObjectId},
  userName: { unique: true,  type: String  }, //unique 不重复 type 字符串类型
  password: String,
  createAt: {  type: Date,  default: Date.now() }, //创建时间
  lastLoginAt: {  type: Date,  default: Date.now()  } //最后登录时间
})

//发布模型  model类似中间件 连接
mongoose.model('User', userSchema);












