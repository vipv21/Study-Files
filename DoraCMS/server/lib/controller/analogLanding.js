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

var responseData;
router.use( function(req, res, next) {
    responseData = {        //初始化
        code: 0,
        message: ''
    };
    next();
} );

router.post("/users/search",function(req,resp){  //这里定义后台接口

    var fid = req.body.fid;             //学校id
    var idNumber = req.body.idNumber;   //学号
    var pwd = req.body.pwd;             //密码
    // console.log(fid +'=='+ idNumber +'=='+pwd );

        superagent.post('https://passport2-api.chaoxing.com/v6/idNumberLogin?fid=' + fid + '&idNumber=' + idNumber).set(headers).send({pwd:pwd }).redirects(0).end(function (err, response) {
                console.log('执行完第一次请求');
            var cookie = response.headers["set-cookie"];    //获取response返回的cookie
            var $ = cheerio.load(response.text);
            // console.log(response);
            // resp.send(response);
            var cookie1 ='' ;
            cookie.forEach(function(cookie){        //处理cookie 并传入到 二次请求中
                var parts = cookie.split(';');
                cookie1 += parts[0]+';';
            });
        
            superagent.get('http://sso.chaoxing.com/apis/login/userLogin4Uname.do').set(mheader).set("Cookie",cookie1).redirects(0).end(function(err,data){
                console.log('执行完第二次请求');
                var newData=data.text;
                // resp.send(newData);
                var cookies = data.headers["set-cookie"];    //获取data返回的新cookie
                // resp.send(data);
                // console.log(response);
                // resp.send(response);
                var cookie2 ='' ;
                cookies.forEach(function(cookies){      //处理cookie 并传入到 三次请求中
                    var parts = cookies.split(';');
                    cookie2 += parts[0]+';';
                });
                // console.log(cookie);
            
                var newDatas = JSON.parse(newData);     //转为json对象后进行操作
                var msgs = newDatas.msg ;
                var school = msgs.schoolname;
                var numbers = msgs.uname;
                var name = msgs.name;
                var userId = msgs.puid;
                // console.log('学校：'+school+'学号：' +numbers+'姓名：' +name);

                superagent.get('http://mooc1-api.chaoxing.com/mycourse?rss=1').set(mheader).set("Cookie",cookie2).redirects(0).end(function (err, datas) {
                    console.log('执行完第三次请求');
                    var newData = datas.text;
                    // resp.send(datas);
                    // resp.send(newData);
                    var cookies = datas.headers["set-cookie"];    //获取data返回的新cookie
                    var cookie3 ='' ;
                    cookies.forEach(function(cookies){      //处理cookie 并传入到 三次请求中
                        var parts = cookies.split(';');
                        cookie3 += parts[0]+';';
                    });
                    var cookie4 = cookie2 +cookie3 ; 
                    // console.log(cookie4);
                    // return;

                    var newDatas = JSON.parse(newData);
                    for (var i = 0; i < newDatas.channelList.length; i++) {
                        var cha = newDatas.channelList[i];
                        if (!cha.content.course) {
                            continue;
                        }
                        var courseId = cha.content.course.data[0].id;
                        var classId = cha.content.id;
                        var courseName = cha.content.course.data[0].name;
                        // console.log( '课程id：'+ courseId + '科目id:'+classId +'课程名称:' +courseName);
                    };

                    superagent.get('http://mooc1-api.chaoxing.com/gas/clazz?id=' + classId + '&fields=name,id,bbsid,state,isstart,begindate,visiblescore,course.fields(id,name,knowledge.fields(id,begintime,name,indexOrder,parentnodeid,status,layer,label,card.fields(id,title),attachment.fields(id,objectid,type,extension).type(video)))&view=json').set("Cookie", cookie4).set(mheader).redirects(0).end(function (err, datass) {
                        console.log('执行完第四次请求');
                        var newData = datass.text;
                        // resp.send(datass);

                        var cookies = datass.headers["set-cookie"];    //获取data返回的新cookie
                        var cookie5 ='' ;
                        cookies.forEach(function(cookies){      //处理cookie 并传入到 三次请求中
                            var parts = cookies.split(';');
                            cookie5 += parts[0]+';';
                        });
                        var cookie6 = cookie4 +cookie5 ; 

                        var newDatas = JSON.parse(newData);
                        var nodeIds = '';
                        var chapterData = newDatas.data[0].course.data[0].knowledge.data;
                        // console.info(chapterData);
                        for (var i = 0; i < chapterData.length; i++) {
                            var id = chapterData[i].id;
                            var layer = chapterData[i].layer;
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
                            // resp.send(datas);
                            // console.log(datas);

                            var newData = datas.text;
                            var newDatas = JSON.parse(newData);
                            var allcount = 0;
                            var uncount = 0;
                            // var newDatas = JSON.parse(datas);
                            // resp.send(newDatas);
                            for (var i in newDatas) {
                                allcount++;
                                if (newDatas[i].unfinishcount > 0) {
                                    uncount++;
                                };
                            };
                            // console.log('课程总集数：'+ allcount + '未完成集数：'+uncount );

                            superagent.get('https://mooc1-api.chaoxing.com/phone/moocAnalysis/statistics-std?courseId='+ courseId +'&classId='+ classId).set(mheader).set("Cookie",cookie6).end(function (err, datas) {
                                console.log('执行完第六次请求');
                                // console.log(datas);
                                // resp.send(datas) ;
                                var $ = cheerio.load(datas.text);
                                var CourseTime = $('.timetarget').siblings('p').text().trim();;    //考试时间
                                var examTime = $('.time').text().trim();;    //考试时间
                                // console.log('课程时间：'+CourseTime);
                                // console.log('考试时间：'+examTime);

                                // return;
                                superagent.get('http://mooc1-api.chaoxing.com/phone/moocAnalysis/examList?courseId='+courseId+'&classId='+ classId).set(mheader).set("Cookie",cookie6).redirects(0).end(function (err, datas) {
                                console.log('执行完第七次请求');
                                // console.log(datas) ;
                                    // resp.send(datas); 
                                    var $ = cheerio.load(datas.text);
                                    var score = $('tbody td').eq(1).text().trim();      //考试分数
                                    var status =$('tbody td').eq(2).text().trim();;     //考试状态
                                    // console.log('考试状态:'+ status);
                                    // console.log('考试分数:'+ score);   

                                    responseData.message = '科目名称：'+ courseName + ' 总计：' + allcount + '集 剩余：' + uncount + '集 考试时间：' + examTime + '（状态：' + status + ' 得分：' + score + '）';
                                    responseData.code =1 ;
                                    responseData.state ='success' ;
                                    resp.json(responseData );
                                    return ;
                                }); //7
                            }); //6
                        }); //5
                    }); //4
                }); //3
            }); //2         
        }); //1
        // console.log( '综合请求数据' );
        // console.log( newContens );
}); //最底部

module.exports= router;
