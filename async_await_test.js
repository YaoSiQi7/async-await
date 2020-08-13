/*
 * @Author: your name
 * @Date: 2020-08-11 10:41:54
 * @LastEditTime: 2020-08-13 15:30:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \async-await\test.js
 */
function getNum(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num + 1)
    }, 1000);
  })
}
//---------------基础用法
const func = async () => {
  const f1 = await getNum(1);
  const f2 = await getNum(f1)
  console.log(f2)
}
func()  //3

//-----------------错误捕获
const func1 = async () => {
  try {
    const f1 = await getNum(1);
    const f2 = await getNum(f1)
  } catch (e) {
    console.log(e)
  }
  console.log(f2)
}


// ----------------------------Generator和async/await对比
//genrator
const fs = require('fs');
const readFile = function (fileName) {
  return new promise(function (resolve, reject) {
    fs.readFile(fileName, function (err, data) {
      if (err) return reject(err)
      reject(data)
    })
  })
}
const gen = function* () {
  const f1 = yield readFile('./generator.js')
  const f2 = yield readFile('./README.md')
  console.log(f1.toString())
  console.log(f2.toString())
}
//async await
const asyncReadFile = async function () {
  const f1 = await readFile('./generator.js')
  const f2 = await readFile('./README.md')
  console.log(f1.toString())
  console.log(f2.toString())
};
// -------------promise 和async/await
//-----
var getConstant = () => {
  return 1
}
var getAsyncConstant = async () => {
  return 1
}
var getPromise = async () => {
  return new Promise((resolve, reject) => {
    resolve(1)
  })
}
var test = async () => {
  let a = 2;
  let c = 1;
  await getConstant();
  let d = 3;
  await getPromise()
  let d = 4;
  await getAsyncConstant();
  return 2
}
// -----
function getConstant() {
  return 1
}
function getAsyncConstant() {
  return Promise.resolve().then(function () {
    return 1
  })
}
function getPromise() {
  return Promise.resolve().then(function () {
    return new Promise((resolve, reject) => {
      resolve(1)
    })
  })
}
function test() {
  return Promise.resolve().then(function () {
    let a = 2;
    let c = 1;
    return getConstant()
  }).then(function () {
    let d = 3;
    return getPromise()
  }).then(function () {
    let d = 4
    return getAsyncConstant()
  }).then(function () {
    return 2
  })
} 