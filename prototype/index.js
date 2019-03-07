
/**
 * 原型
 * 
 * 每个实例对象（object ）都有一个私有属性（称之为__proto__）指向它的原型对象（prototype）。
 * 无论什么时候，创建的每个函数都有一个prototype（原型）属性，即原型对象 console.log();
 * prototype（原型）就是通过构造函数来创建的对象实例的原型对象， console.log();
 * 这个对象让所有对象实例可以共享它所包含的属性和方法
 * 
 * 涉及的方法有 isPrototypeOf  和  getPrototypeOf
 * 
 * Object.getPrototypeOf方便取得一个对象的原型
 * 
 */
function Person() {
  this.sayHello = function (params) {
    console.log('hello');
  };
}

Person.prototype.name = 'person';
const person1 = new Person();
console.log(person1.name);

// Person.prototype === person1.__proto__
console.log(JSON.stringify(Person.prototype));
console.log(JSON.stringify(person1.__proto__));
console.log(Person.prototype === person1.__proto__);
console.log(`getPrototypeOf:  ${Object.getPrototypeOf(person1) === Person.prototype}`);
console.log(`constructor:  ${Person.prototype.constructor === Person}`);

// 对象实例中有一个constructor属性，指向构造函数
console.log(JSON.stringify(person1.constructor === Person))
