#### 1. 工厂模式

代码：
```
function createPerson(name,age,job) {
    var o = newObject();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
        alert(this.name);
    };
    return o;
}
var person1 = createPerson ("Nicholas",29,"SoftwareEngineer");
var person2 = createPerson("Greg",27,"Doctor");
```
>解决了创建多个相似对象的问题，但却没有解决对象识别的问题

#### 2. 构造器模式

特点：
>1. 没有显示的创建对象
>2. 直接将属性和方法赋给this
>3. 没有return

new的过程
>1. 创建一个新的对象
>2. 将构造函数的作用域赋给新对象，即改变this指向，指向新对象
>3. 执行构造函数中的代码(给新对象添加属性和方法)
>4. 返回新对象

```
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
  this.sayName = newFunction("alert(this.name)");

  this.sayNameFunc = sayNameFunc;
} 

// 该方式导致作用域混乱
function sayNameFunc(){ alert(this.name); }

var person1 = newPerson("Nicholas", 29, "SoftwareEngineer");
var person2 = newPerson("Greg", 27, "Doctor");
console.log(person1.sayName === person2.sayName); // false
```

问题：
>对于方法的创建比较麻烦，1、如果在构造函数内部直接赋值到this，会造成每次new时都创建一个新Function的情况；2、如果将函数声明放到外部，又会出现作用域问题。

#### 3. 原型模式（构造函数+原型）

>构造函数+原型
>* 每个函数都有一个prototype（原型）属性，这个属性是一个指针，指向一个对象
>* 这个对象的用途是==包含==可以由特定类型的所有==实例共享==的属性和方法。

#### 4. ES6的Class
>* ES6 的类，完全可以看作构造函数的另一种写法。
>* 类的数据类型就是函数，类本身就指向构造函数
>* 类的所有方法都定义在类的prototype属性上面。

```
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```
* constructor： 构造方法
* this：实例对象

```
class Person {
  constructor(){
    console.log(this.__proto__.constructor === Person); // ture
  }
}

const person1 = new Person();
console.log(person1.constructor === Person.prototype.constructor); // true
console.log(person1.__proto__.constructor === Person.prototype.constructor); // true
console.log(person1.__proto__.constructor === Person); // true
console.log(person1.__proto__.constructor.prototype === Person.prototype); // true
console.log(Person === Person.prototype.constructor); // true
```

