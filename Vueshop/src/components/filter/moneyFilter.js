// export function toMoney(money){
//     let newMoney = money;
//     if (newMoney) {
//         newMoney = newMoney.toFixed(2)
//     }else{
//         newMoney = newMoney.toFixed(2)
//     }
//     return newMoney;
// }

//第二种写法 :优化写法
export function toMoney(money = 0 ) {
    return money.toFixed(2)
}