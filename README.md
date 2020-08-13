<!--
 * @Author: your name
 * @Date: 2020-08-11 10:39:49
 * @LastEditTime: 2020-08-13 15:35:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \async-await\README.md
-->
## iterator

## 解决函数回调的方案
### 回调函数
### promise 
### Generator
### async await

##promise
### Promise实际上就是利用编程技巧，把回调地狱改成了链式调用

## Generator函数生成器
### 基本特性和使用
* 1.可以理解为一个状态机，内部封装了很多状态，可以用iterator遍历器遍历
* 2.可以理解为异步任务的容器，异步操作需要暂停的地方，用yield语句注明。
* 3.运行Generator函数，并不会执行，会生成一个指向内部状态的指针对象，也就是一个可供遍历的遍历器，可以通过这个遍历器遍历值和状态
* 3.可以多次返回，每次的返回值作为迭代器的一部分被保存下来，可以被我们显式调用（分段执行，yield表达式是暂停执行的标记，next方法恢复执行）
* 4.执行next方法，就是顺序执行yield。每次执行next方法，使得指针指向下一个状态。
* 5.在遇到return的时候，所有剩下的yield不在执行，直接返回{value：undefined，done：true}
* 6.throw,根据函数中写的try catch返回catch中的内容，如果没有try，直接抛出异常。throw函数执行之后，直接进入catch，且挂边状态，down变为true，就算有没有执行完的yield，再次执行next函数也是返回value:undefined,done:true
* 7.Generator函数如果不用yield表达式，就变成了一个单纯的暂缓执行函数：
(```)
function* f() {
  console.log('执行了！')
}
var generator = f();
setTimeout(function () {
  generator.next()
}, 2000);
(```)
### 遍历：
 Genetator生成器执行之后生成一个遍历器对象，该遍历器对象也具有Symbol.iterator属性，该属性是一个人遍历器生成函数，执行之后的值就是它本身
 (```)
function* mygenerator(){ 
  yield 1
}
const g = mygenerator() 
g[Symbol.iterator]() === g
(```)
g[Symbol.iterator]返回一个遍历器生成函数，执行后生成遍历器，g是由generator()执行过生成的遍历器对象，二者相等
### next传参
* yield表达式本身没有返回值，next方法可以带一个参数，该参数会被当做上一个yield的返回值
* 由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的
* V8 引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的
* 从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数
* next()方法入参的意义：Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过next方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值

## saync/await
就是将Generator函数和自动执行器，包装在一个函数里
### 用法
* async函数返回一个promise对象，函数执行的时候，一旦遇到await就会先返回，等到触发的异步函数操作完成，再接着执行函数体后面的语句
### 注意
* saync/await是无法捕获错误的，这个时候需要用到try/catch
* async函数在声明形式上和普通函数没有区别，函数声明式、函数表达式、对象方法、class方法、箭头函数等都可以声明async函数
* 任何一个await语句后面的promise对象变为reject状态，那么整个async函数都会中断执行
* async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数

## async/await AND Generator
* 1.async函数自带执行器，所以执行方式和普通函数的执行方式一样，通过函数名+（）的方式执行。
* 2.async和await比起*和yield在语义上更清楚。
* 3.co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。
* 4.async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作

## async/await AND Promise
* async/await 是基于promise的。 await返回的也是一个promise，await后面的代码放到了await返回的promise的.then后面