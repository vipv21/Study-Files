const BaseComponent = require('../prototype/baseComponent');
const UserModel = require("../models").User;
const MessageModel = require("../models").Message;
const NotifyModel = require("../models").Notify;
const UserNotifyModel = require("../models").UserNotify;
const AdminUserModel = require("../models").AdminUser;
const SystemConfigModel = require("../models").SystemConfig;
const formidable = require('formidable');
const { service, settings, validatorUtil, logUtil, siteFunc } = require('../../../utils');
const shortid = require('shortid');
const validator = require('validator');
const _ = require('lodash')
const fs = require('fs')
const captcha = require('trek-captcha')

var express=require("express");
var superagent=require("superagent");
var cheerio=require("cheerio");
var http = require('http');
var router = express.Router();

// 获取sessionID
var LogonHeader = {
    'Accept': "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36"
};

// 设置头
var headers = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36"
};

//第五次请求头设置
var newheader = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "zh-CN,zh;q=0.8",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
};

//随机系统版本
var version = ("0000000" + 10000000000000 * Math.random()).match(/(\d{13})(\.|$)/)[1];
var mheader= {
    "User-Agent": "ChaoXingStudy / ChaoXingStudy_3_2 .0 _ios_phone_201704021900(iPhone; iOS 10.3 .3; zh_CN) AppleWebKit / 601.1 .46 _Mobile_"+version
};


//判断验证规则
function checkFormData(req, res, fields) {
    let errMsg = '';
    if (fields._id && !siteFunc.checkCurrentId(fields._id)) {
        errMsg = '非法请求，请稍后重试！';
    }
    if (!validatorUtil.checkUserName(fields.userName)) {
        errMsg = '5-12个英文字符!';
    }
    if (fields.name && !validatorUtil.checkName(fields.name)) {
        errMsg = '2-6个中文字符!';
    }
    if (fields.phoneNum && !validatorUtil.checkPhoneNum(fields.phoneNum)) {
        errMsg = '请填写正确的手机号码!';
    }
    if (!validatorUtil.checkEmail(fields.email)) {
        errMsg = '请填写正确的邮箱!';
    }
    if (!validator.isLength(fields.comments, 5, 30)) {
        errMsg = '请输入5-30个字符!';
    }
    if (errMsg) {
        throw new siteFunc.UserException(errMsg);
    }
}

class UserSearch {    
    constructor() {
        // super()
    }

    async getImgCode(req, res) {
        const { token, buffer } = await captcha();
        req.session.imageCode = token;
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.write(buffer);
        res.end();
    }

    async getUsers(req, res, next) {
        try {
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 10;
            let searchkey = req.query.searchkey, queryObj = {};

            if (searchkey) {
                let reKey = new RegExp(searchkey, 'i')
                queryObj.userName = { $regex: reKey }
            }

            const Users = await UserModel.find(queryObj, { password: 0 }).sort({ date: -1 }).skip(Number(pageSize) * (Number(current) - 1)).limit(Number(pageSize));
            const totalItems = await UserModel.count(queryObj);
            res.send({
                state: 'success',
                docs: Users,
                pageInfo: {
                    totalItems,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10,
                    searchkey: searchkey || ''
                }
            })
        } catch (err) {
            logUtil.error(err, req);
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取User失败'
            })
        }
    }

    async delUser(req, res, next) {
        try {
            let errMsg = '', targetIds = req.query.ids;
            if (!siteFunc.checkCurrentId(targetIds)) {
                errMsg = '非法请求，请稍后重试！';
            } else {
                targetIds = targetIds.split(',');
            }
            if (errMsg) {
                throw new siteFunc.UserException(errMsg);
            }
            for (let i = 0; i < targetIds.length; i++) {
                let regUserMsg = await MessageModel.find({ 'author': targetIds[i] });
                if (!_.isEmpty(regUserMsg)) {
                    res.send({
                        state: 'error',
                        message: '请删除该用户留言后在执行该操作！',
                    })
                    break;
                }
            }
            await UserModel.remove({ '_id': { $in: targetIds } });
            res.send({
                state: 'success'
            });
        } catch (err) {
            logUtil.error(err, req);
            res.send({
                state: 'error',
                type: 'ERROR_IN_SAVE_DATA',
                message: '删除数据失败:',
            })
        }
    }

    async searchOne(req,res,next){      //普通用户查询接口

        let fid = req.body.fid;             //学校id
        let idNumber = req.body.idNumber;   //学号
        let pwd = req.body.pwd;             //密码
        console.log(fid +'=='+ idNumber +'=='+pwd );
    // return;
            superagent.post('https://passport2-api.chaoxing.com/v6/idNumberLogin?fid=' + fid + '&idNumber=' + idNumber).set(headers).send({pwd:pwd }).redirects(0).end(function (err, resonse) {
                    console.log('执行完第一次请求');
                let cookie = resonse.headers["set-cookie"];    //获取resonse返回的cookie
                let $ = cheerio.load(resonse.text);
                // console.log(resonse);
                // res.send(resonse);
                let cookie1 ='' ;
                cookie.forEach(function(cookie){        //处理cookie 并传入到 二次请求中
                    let parts = cookie.split(';');
                    cookie1 += parts[0]+';';
                });
            
                superagent.get('http://sso.chaoxing.com/apis/login/userLogin4Uname.do').set(mheader).set("Cookie",cookie1).redirects(0).end(function(err,data){
                    console.log('执行完第二次请求');
                    let newData=data.text;
                    // res.send(newData);
                    let cookies = data.headers["set-cookie"];    //获取data返回的新cookie
                    // res.send(data);
                    // console.log(resonse);
                    // res.send(resonse);
                    let cookie2 ='' ;
                    cookies.forEach(function(cookies){      //处理cookie 并传入到 三次请求中
                        let parts = cookies.split(';');
                        cookie2 += parts[0]+';';
                    });
                    // console.log(cookie);
                
                    let newDatas = JSON.parse(newData);     //转为json对象后进行操作
                    let msgs = newDatas.msg ;
                    let school = msgs.schoolname;
                    let numbers = msgs.uname;
                    let name = msgs.name;
                    let userId = msgs.puid;
                    // console.log('学校：'+school+'学号：' +numbers+'姓名：' +name);
    
                    superagent.get('http://mooc1-api.chaoxing.com/mycourse?rss=1').set(mheader).set("Cookie",cookie2).redirects(0).end(function (err, datas) {
                        console.log('执行完第三次请求');
                        let newData = datas.text;
                        // res.send(datas);
                        // res.send(newData);
                        let cookies = datas.headers["set-cookie"];    //获取data返回的新cookie
                        let cookie3 ='' ;
                        cookies.forEach(function(cookies){      //处理cookie 并传入到 三次请求中
                            let parts = cookies.split(';');
                            cookie3 += parts[0]+';';
                        });
                        let cookie4 = cookie2 +cookie3 ; 
                        // console.log(cookie4);
                        // return;
    
                        let newDatas = JSON.parse(newData);
                        for (let i = 0; i < newDatas.channelList.length; i++) {
                            let cha = newDatas.channelList[i];
                            if (!cha.content.course) {
                                continue;
                            }
                            let courseId = cha.content.course.data[0].id;
                            let classId = cha.content.id;
                            let courseName = cha.content.course.data[0].name;
                            // console.log( '课程id：'+ courseId + '科目id:'+classId +'课程名称:' +courseName);
                        };
    
                        superagent.get('http://mooc1-api.chaoxing.com/gas/clazz?id=' + classId + '&fields=name,id,bbsid,state,isstart,begindate,visiblescore,course.fields(id,name,knowledge.fields(id,begintime,name,indexOrder,parentnodeid,status,layer,label,card.fields(id,title),attachment.fields(id,objectid,type,extension).type(video)))&view=json').set("Cookie", cookie4).set(mheader).redirects(0).end(function (err, datass) {
                            console.log('执行完第四次请求');
                            let newData = datass.text;
                            // res.send(datass);
    
                            let cookies = datass.headers["set-cookie"];    //获取data返回的新cookie
                            let cookie5 ='' ;
                            cookies.forEach(function(cookies){      //处理cookie 并传入到 三次请求中
                                let parts = cookies.split(';');
                                cookie5 += parts[0]+';';
                            });
                            let cookie6 = cookie4 +cookie5 ; 
    
                            let newDatas = JSON.parse(newData);
                            let nodeIds = '';
                            let chapterData = newDatas.data[0].course.data[0].knowledge.data;
                            // console.info(chapterData);
                            for (let i = 0; i < chapterData.length; i++) {
                                let id = chapterData[i].id;
                                let layer = chapterData[i].layer;
                                if (layer > 1) {
                                    nodeIds += id;
                                    if (i < chapterData.length - 1) {
                                        nodeIds += ',';
                                    };
                                };
                            };
                            // console.log(classId + '&' + userId + '&' + courseId + '&' + nodeIds);
                            
                            superagent.post('https://mooc1-api.chaoxing.com/job/myjobsnodesmap').set(newheader).set(mheader).set("Cookie",cookie6).send({
                                clazzid: classId,   userid: userId,
                                view: 'json',       courseid: courseId,     nodes: nodeIds
                            }).redirects(0).end(function (err, datas) {
                                console.log('执行完第五次请求');
                                // res.send(datas);
                                // console.log(datas);
    
                                let newData = datas.text;
                                let newDatas = JSON.parse(newData);
                                let allcount = 0;
                                let uncount = 0;
                                // let newDatas = JSON.parse(datas);
                                // res.send(newDatas);
                                for (let i in newDatas) {
                                    allcount++;
                                    if (newDatas[i].unfinishcount > 0) {
                                        uncount++;
                                    };
                                };
                                // console.log('课程总集数：'+ allcount + '未完成集数：'+uncount );
    
                                superagent.get('https://mooc1-api.chaoxing.com/phone/moocAnalysis/statistics-std?courseId='+ courseId +'&classId='+ classId).set(mheader).set("Cookie",cookie6).end(function (err, datas) {
                                    console.log('执行完第六次请求');
                                    // console.log(datas);
                                    // res.send(datas) ;
                                    let $ = cheerio.load(datas.text);
                                    let CourseTime = $('.timetarget').siblings('p').text().trim();;    //考试时间
                                    let examTime = $('.time').text().trim();;    //考试时间
                                    // console.log('课程时间：'+CourseTime);
                                    // console.log('考试时间：'+examTime);
    
                                    // return;
                                    superagent.get('http://mooc1-api.chaoxing.com/phone/moocAnalysis/examList?courseId='+courseId+'&classId='+ classId).set(mheader).set("Cookie",cookie6).redirects(0).end(function (err, datas) {
                                    console.log('执行完第七次请求');
                                    // console.log(datas) ;
                                        // res.send(datas); 
                                        let $ = cheerio.load(datas.text);
                                        let score = $('tbody td').eq(1).text().trim();      //考试分数
                                        let status =$('tbody td').eq(2).text().trim();;     //考试状态
                                        // console.log('考试状态:'+ status);
                                        // console.log('考试分数:'+ score);   
    
                                        resonseData.message = '科目名称：'+ courseName + ' 总计：' + allcount + '集 剩余：' + uncount + '集 考试时间：' + examTime + '（状态：' + status + ' 得分：' + score + '）';
                                        resonseData.code =1 ;
                                        resonseData.state ='success' ;
                                        // res.json(resonseData );
                                        // return ;

                                        res.send({
                                            state: 'success',
                                            message: resonseData.message
                                        })



                                    }); //7
                                }); //6
                            }); //5
                        }); //4
                    }); //3
                }); //2         
            }); //1
            // console.log( '综合请求数据' );
            // console.log( newContens );
    } //最底部

}

module.exports = new UserSearch();