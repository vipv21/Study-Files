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














