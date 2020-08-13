/*
 * @Author: your name
 * @Date: 2020-08-13 11:13:46
 * @LastEditTime: 2020-08-13 13:58:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \async-await\my_async_await.js
 */
//定义一个promise，用来模拟异步请求，作用是传入参数
function getNum(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num + 1)
    }, 1000);
  })
}
//自动执行器
function asyncFun(func) {
  var gen = func();   
  function next(data) {
    var result = gen.next(data); 
    if (result.done) return result.value;
    result.value.then(function (data) {
      next(data)
    });
  }
  next()
}

var func = function *() {
  var f1 =yield getNum(1);
  var f2= yield getNum(f1);
}
asyncFun(func)
//过程分析：
//1.fun是一个Generator函数，传到asyncFun函数中执行gen = func(),此时gen是一个遍历器对象，有next()方法
//2.自定义next函数，执行自定义next函数
//3.next函数执行逻辑：
// next函数执行了三次：
     //第一次：data-->undefined  result--->{value:promise对象，done：false}
     //  result.value.then(),回调函数的参数值是1+1=2,下一个next函数的参数也是2,f1=2
     //第二次：data--->2 result--->{value:promise对象，done：false}
     //  result.value.then(),回调函数的参数值是2+1=3,下一个next函数的参数也是3,f2=3
     //第三次：data-->3  resule--->{value:undefined,done:true}
 //异步代码执行完之后执行 console.log(f2),输出3  