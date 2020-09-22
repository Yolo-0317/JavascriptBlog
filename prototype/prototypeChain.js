function Animal(type) {
  this.type = type || 'animal';

  this.getType = function getType() {

  };
}

function Dog() {
  this.name = 'dog';
}

Dog.prototype = new Animal();

const dog = new Dog();

console.log(dog);
