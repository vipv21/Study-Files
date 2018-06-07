'use strict';

// let  a = 1;
// let b= 2;
// console.log(a+b);

var a = 0,
    b = 1,
    c = 2; //左右结构要一致               

console.log(a);
console.log(b);
console.log(c);

//数组的解构
var _ref = [],
    _ref$ = _ref[0],
    foo = _ref$ === undefined ? 'true' : _ref$;

console.log(foo);

//对象的解构
var _fob$bar = { fob: 'jspang', bar: '集数' },
    fob = _fob$bar.fob,
    bar = _fob$bar.bar;

console.log(fob + bar);

// 扩展运算符
function pang() {
    console.log(arguments.length <= 0 ? undefined : arguments[0]);
    console.log(arguments.length <= 1 ? undefined : arguments[1]);
    console.log(arguments.length <= 2 ? undefined : arguments[2]);
    console.log(arguments.length <= 3 ? undefined : arguments[3]);
}
pang(1, 2, 3); //引用赋值
