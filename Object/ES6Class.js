class Person {
  constructor(){
    this.name = 'Person';
    // console.log('this === Person：',this === Person); // false
    // console.log(this.__proto__.constructor === Person); // ture
  }

  sayPersonName() {
    console.log(this.name);
  }
}

const person1 = new Person();
// console.log(person1.constructor === Person.prototype.constructor); // true
// console.log(person1.__proto__.constructor === Person.prototype.constructor); // true
// console.log(person1.__proto__.constructor === Person); // true
// console.log(person1.__proto__.constructor.prototype === Person.prototype); // true
// console.log(Person === Person.prototype.constructor); // true

class Person2 extends Person {
  constructor() {
    super();
    this.name = 'Person2';
    this.x = '234';
    // this.sayThis = this.sayThis.bind(this);
  }
  sayThis() {
    console.log('this === Person2：', this === Person2); // false
    console.log('this === person2_1：', this === person2_1); // true
  }

  // sayThisNotNeedBind = () => {
  //   console.log('this === person2_1：', this === person2_1); // true
  // }
}

const person2_1 = new Person2();
// person2_1.sayThis();
person2_1.sayPersonName();
// const sayThis = person2_1.sayThis;
// const sayThisNotNeedBind = person2_1.sayThisNotNeedBind;
// sayThis();
// sayThisNotNeedBind()
