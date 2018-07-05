const mongoose = require('mongoose');
const Schema = mongoose.Schema; //调用mongoose 的schema
let ObjectId = Schema.Types.ObjectId; //设置 主键
const bcrypt = require('bcrypt');   //引入加盐加密插件
const SALT_WORK_FACTOR = 10 ;  //加盐位数 0~99



//创建UserShema 表
const userSchema = new Schema({
  UserId: {type:ObjectId},
  userName: { unique: true,  type: String  }, //unique 不重复 type 字符串类型
  password: String,
  createAt: {  type: Date,  default: Date.now() }, //创建时间
  lastLoginAt: {  type: Date,  default: Date.now()  } //最后登录时间
},{
//  collation:'user'    //可以去除mongoodb数据中的collections自动添加的s
})

//密码加盐加密 pre-->每次操作  进行加盐加密
userSchema.pre('save' , function(next){
  //加盐 genSalt
  bcrypt.genSalt(SALT_WORK_FACTOR , (err,salt )=>{
    if (err) return next(err) ;
    //加密 hash加密  this表示userSchema
    bcrypt.hash(this.password ,salt , (err,hash) =>{
      if(err) return next(err)
      this.password = hash ;
      next() ;
    })
  })
})













//发布模型  model类似中间件 连接
mongoose.model('User', userSchema);




