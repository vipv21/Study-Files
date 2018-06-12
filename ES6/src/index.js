// let  a = 1;
// let b= 2;
// console.log(a+b);

let [a,b,c]=[0,1,2];        //左右结构要一致               

console.log(a );
console.log(b);
console.log(c);

//数组的解构
let [foo='true'] = [];
console.log(foo);

//对象的解构
let {fob,bar} ={fob:'jspang',bar:'集数'}
console.log(fob+bar)

// 扩展运算符
function pang(...arg) {
    console.log(arg[0]);
    console.log(arg[1]);
    console.log(arg[2]);
    console.log(arg[3]);
}
pang(1,2,3);    //引用赋值

// 扩展运算符
let arr1=['www','aaofa','com'];
// let arr2=arr1;
let arr2=[...arr1];
console.log(arr2);
arr2.push('wangyu');
console.log(arr2);
console.log(arr1);

// rest运算符
function aaofa(first,...arg) {
    // console.log(arg.length);
    for (let val of arg) {
        console.log(val);
    }
}
aaofa(0,1,2,3,4,5,6,7);

// 字符串模板
let days='星期六' ;
let blog = `今天阳关真好，今天是${days} 不很错的   `
console.log(blog);
console.log(blog.includes(days));   //includex 判断查找
document.write('jspang|'.repeat(3));    //字符串复制

    //支持运算
let ac= 1;
let ab =2;
let result= `${ac+ab}`;
console.log(result);



// 安全整数判断
let abv = Math.pow(2, 53) - 1;
console.log(Number.isSafeInteger(abv));     //true







