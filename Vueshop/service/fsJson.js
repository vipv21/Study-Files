const fs = require('fs');   //读取文件模块
    //读取文件信息 readFile     utf8格式
fs.readFile('./goods.json', 'utf8', function (err, data) { 
    let newData = JSON.parse(data);
    let pushData = [] ;
    let i= 0;
    newData.RECORDS.map(function(value,index){
        if (value.IMAGE1!=null) {   //提取需要的信息
            pushData.push(value);
        } 
    })
    console.log(i);
    //写入信息 writeFile   JSON.stringify转为字符串格式
    fs.writeFile('./newGoods.json', JSON.stringify(pushData),function(err){
        if (err) console.log('写入信息失败');
        else console.log('写入信息成功');
    })
} )