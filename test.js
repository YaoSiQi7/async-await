/*
 * @Author: your name
 * @Date: 2020-08-11 10:41:54
 * @LastEditTime: 2020-08-11 10:45:43
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

const func = async () => {
  const f1 = await getNum(1);
  const f2 = await getNum(f1)
  console.log(f2)
}
func()