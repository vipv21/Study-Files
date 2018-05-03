
var express = require('express');
var router = express.Router();

// 读取数据库用户信息
var User = require('../modules/User');
var Category = require('../modules/Category');


router.use(function (req,res,next){
    if(!req.userInfo.isAdmin){
        res.send('您无访问权限');
        return ;
    }
    next();
})

// 后台管理 首页
router.get('/' , function( req,res,next){
    // res.send('后台管理页面');
    res.render('admin/index',{
        userInfo :req.userInfo
    });


});

// 用户管理页
router.get('/user' ,function(req,res){

    // limit(Number) : 限制 从数据库获取的数据条数
    // skip(2)      忽略数据的条数
    // 每页显示2条数据
    //  1 : 1-2 skip:0  -> (当前页-1) * limit
    //  2 : 3-4 skip:2  -> (skip:2,则是忽略前2条数据)
    // 读取数据库用户信息
    var page = Number(req.query.page || 1);
    var limit = 2;     //每页条数
    var pages = 0;      //分页数开始

    User.count().then(function(count) {
        // console.log(count);
        //计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过pages   page当前页数
        page = Math.min( page, pages );
        //取值不能小于1   如果当前页数小于1 则取为1
        page = Math.max( page, 1 );

        var skip = (page - 1) * limit;         //分页页面忽略的数据条数

        User.find().limit(limit).skip(skip).then(function(users) {
            res.render('admin/user_index', {
                userInfo: req.userInfo,    // 
                users: users,       // 

                count: count,       // 总条数
                pages: pages,       //总页数
                limit: limit,       //每页获取的数据条数
                page: page          //当前页数
            });
        });
    });
})


// 分类首页
router.get('/category',function(req,res){

    var page = Number(req.query.page || 1);
    var limit = 2;     //每页条数
    var pages = 0;      //分页数开始

    Category.count().then(function(count) {
        // console.log(count);
        //计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过pages   page当前页数
        page = Math.min( page, pages );
        //取值不能小于1   如果当前页数小于1 则取为1
        page = Math.max( page, 1 );

        var skip = (page - 1) * limit;         //分页页面忽略的数据条数
        //sort({_id: -1})  -1降序(大-小)  1升序
        Category.find().sort({_id: -1}).limit(limit).skip(skip).then(function(categories) {
            res.render('admin/category_index', {
                userInfo: req.userInfo,         // 
                categories: categories,       // 

                count: count,       //总条数
                pages: pages,       //总页数
                limit: limit,       //每页获取的数据条数
                page: page          //当前页数
            });
        });
    });
})


// 添加分类
router.get('/category/add',function(req,res){
    res.render('admin/category_add',{
        userInfo: req.userInfo
    })

})

// 保存分类
router.post('/category/add',function(req,res){
    // console.log(req.body);
    var name = req.body.name || '';
    if(name== ''){      //用户名提交为空
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:'名称不能为空'
        });
    }

    //数据库中是否已存在 同类名称
    Category.findOne({
        name:name

    }).then(function(rs){
        if (rs) {
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:'已存在该分类'
            })
            return Promise.reject();
        }else{
            //不存在该分类则保存信息 到数据库
            return new Category({
               name: name 

            }).save();
        }
    }).then(function(newCategory){
        res.render('admin/success',{
            userInfo  :req.userInfo,
            message:'分类保存成功',
            url:'/admin/category'
        });
    });
});





// 编辑分类
router.get('/category/edit', function(req, res) {

    //获取要修改的分类的信息，并且用表单的形式展现出来
    var id = req.query.id || '';

    //获取要修改的分类信息
    Category.findOne({
        _id: id
    }).then(function(category) {
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
        } else {
            res.render('admin/category_edit', {
                userInfo: req.userInfo,
                category: category
            });
        }
    })

});




/*
* 分类的修改保存
* */
router.post('/category/edit', function(req, res) {

    //获取要修改的分类的信息，并且用表单的形式展现出来
    var id = req.query.id || '';
    //获取post提交过来的名称
    var name = req.body.name || '';

    //获取要修改的分类信息
    Category.findOne({
        _id: id
    }).then(function(category) {
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
            return Promise.reject();
        } else {
            //当用户没有做任何的修改提交的时候
            if (name == category.name) {
                res.render('admin/success', {
                    userInfo: req.userInfo,
                    message: '修改成功',
                    url: '/admin/category'
                });
                return Promise.reject();
            } else {
                //要修改的分类名称是否已经在数据库中存在
                return Category.findOne({
                    _id: {$ne: id},
                    name: name
                });
            }
        }
    }).then(function(sameCategory) {
        if (sameCategory) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '数据库中已经存在同名分类'
            });
            return Promise.reject();
        } else {
            return Category.update({    //更新数据
                _id: id
            }, {
                name: name
            });
        }
    }).then(function() {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '修改成功',
            url: '/admin/category'
        });
    })

});



// 删除分类
router.get('/category/delete', function(req, res) {

    //获取要删除的分类的id
    var id = req.query.id || '';

    Category.remove({
        _id: id
    }).then(function() {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除成功',
            url: '/admin/category'
        });
    });

});

module.exports= router;




