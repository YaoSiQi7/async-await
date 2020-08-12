/*
 * @Author: your name
 * @Date: 2020-08-11 10:51:50
 * @LastEditTime: 2020-08-11 16:46:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \async-await\generator.js
 */
// -----一般generator
function* foo(x) {
  yield x + 1;
  yield x + 2;
  return x + 3;
}
const result = foo(0)
console.log(result);
//Generator函数的实例，具有suspended和closed两个状态，suspended代表暂停，close为结束。
//这个状态无法捕获，只能通过Generator函数提供的方法获取当前状态
console.log(result.next()) //{value: 1, done: false}
console.log(result.next()) //{value: 2, done: false}
console.log(result.next()) //{value: 3, done: true}
console.log(result.next()) //{value: undefined, done: true}


// ------带 try catch的generator
function* foo1(x) {
  try {
    yield x + 1;
    yield x + 2;
    yield x + 3;
    yield x + 4;
  } catch (e) {
    console.log('catch it')
  }
}
const result1 = foo(10)
result1.next()  //{value: 11, done: false}
result1.next()  //{value: 12, done: false}
result1.throw() //catch it {value: undefined, done: true}
result1.next()  //{value: undefined, done: true}

//-----如果执行throw之前，还没有执行到try语句，那么直接会抛错
function* foo2(x) {
  yield x + 1
  try {
    yield +2
  } catch (e) {
    console.log('catch it')
  }
}
const result2 = foo2(10)
result2.next() //{value :11 ,done:false}
result2.next()//{value:12,down:false}
result2.throw()// catch it  {value: undefined, done: true}
result2.next()// {value: undefined, done: true}

const rusult3 = foo2(20)
result3.next() //{value :21 ,done:false}
result3.throw() //Uncaught undefined
result3.next() //Uncaught undefined

// 遍历
const result4 = foo(10)
for(let i in result4){
  console.log(i)
}
//状态存储和改变
function* foo(x) {
  let a = yield x + 0;
  let b = yield a + 2;
  yield x;
  yield a ;
  yield b
}
let result = foo(0)
result.next(1)
//{value: 0, done: false}
result.next(1)
//{value: 3, done: false}
result.next(1)
//{value: 0, done: false}
result.next(1)
//{value: 1, done: false}
result.next(1)
//{value: 1, done: false}

//传入的参数，是替代上一次迭代的生成值。也就是等号左边的变量的值。上边第二个next(1),使变量a变成1；第三个next(1)，使变量b变成1；下面的next(1)没有作用，因为没有复制
function* foo(x) {
  let a=1;
  let b=10
  yield x + 0;
  yield a + 2;
  yield x;
  yield a ;
  yield b
}
let result = foo(0)
result.next(1)
//{value: 0, done: false}
result.next(2)
//{value: 3, done: false}
result.next(2)
//{value: 0, done: false}
result.next(2)
//{value: 1, done: false}
result.next(2)
//{value: 10, done: false}