/**
 * 构造函数
 */

function Person(name, age, job) { 
  this.name = name; 
  this.age = age; 
  this.job = job; 
  this.sayName = function () { alert(this.name); };
  // 与声明函数在逻辑上是等价的，
  // 导致每次new一个对象时都会创建新的sayName
  // this.sayName = new Function("alert(this.name)");

  this.sayNameFunc = sayNameFunc;
} 

// 该方式导致作用域混乱
function sayNameFunc(){ alert(this.name); }

var person1 = new Person("Nicholas", 29, "SoftwareEngineer");
var person2 = new Person("Greg", 27, "Doctor");
console.log(person1.sayName === person2.sayName); // false
console.log(person1.constructor === Person.prototype.constructor); // true

