/**
 * setTimeout就是作为宏任务来存在的，
 * 而Promise.then则是具有代表性的微任务
 */

setTimeout(() => console.log(4));

new Promise((resolve) => {
  resolve();
  console.log(1);
}).then(() => {
  console.log(3);
});

console.log(2);
