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

// 扩展运算符
var arr1 = ['www', 'aaofa', 'com'];
// let arr2=arr1;
var arr2 = [].concat(arr1);
console.log(arr2);
arr2.push('wangyu');
console.log(arr2);
console.log(arr1);

// rest运算符
function aaofa(first) {
    for (var _len = arguments.length, arg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        arg[_key - 1] = arguments[_key];
    }

    // console.log(arg.length);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = arg[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var val = _step.value;

            console.log(val);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}
aaofa(0, 1, 2, 3, 4, 5, 6, 7);

// 字符串模板
var days = '星期六';
var blog = '\u4ECA\u5929\u9633\u5173\u771F\u597D\uFF0C\u4ECA\u5929\u662F' + days + ' \u4E0D\u5F88\u9519\u7684   ';
console.log(blog);
console.log(blog.includes(days)); //includex 判断查找
document.write('jspang|'.repeat(3)); //字符串复制

//支持运算
var ac = 1;
var ab = 2;
var result = '' + (ac + ab);
console.log(result);

// 安全整数判断
var abv = Math.pow(2, 53) - 1;
console.log(Number.isSafeInteger(abv)); //false
