
var express = require('express');
var router = express.Router();
var Category = require('../modules/Category');



router.get('/' , function( req,res,next){
    // console.log(req.userInfo);

    //读取所有分类信息
    Category.find().then(function(categories){
        // console.log(categories);
        res.render('main/index',{
            userInfo :req.userInfo,
            categories : categories
        });
    })
});


router.get('/orderT' , function( req,res,next){
    res.render('main/orderT',{
        userInfo :req.userInfo
    });

});
















module.exports= router;



