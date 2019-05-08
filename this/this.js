var a = 3;

function foo() {
  console.log(this.a);
}

const obj = { a: 2 };

foo.call(obj); // 2
// 如果将第一个参数传为一个基本类型2 此时this指向Number引用类型
// 例如 Boolean，String，Number，这个将基本类型转为引用类型的操作成为“装箱”
foo.call(2); 
foo.call(null);