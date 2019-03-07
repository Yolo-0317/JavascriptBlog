let p = new Promise((resolve, reject) => {
  resolve('success')
  // 下面无效代码不会执行
  reject('reject')
})
p.then(
  value => {
    console.log(`resolse：${value}`)
  },
  reason => {
    console.log(reason)//reject
  }
)

Promise.resolve(1)
  .then(res => {
    console.log(res)
    return 2 // 包装成 Promise.resolve(2)
  })
  .catch(err => 3)
  .then(res => console.log(res))