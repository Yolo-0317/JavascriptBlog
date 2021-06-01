>* new绑定 > 显示绑定 > 隐式绑定 > 默认绑定
>* this是在调用时绑定的

##### new绑定

##### 默认绑定
> 在不能应用其它绑定规则时使用的默认规则，通常是独立函数调用。

```
function sayHi(){
    console.log('Hello,', this.name);
}
var name = 'YvetteLau';
sayHi();
// 在调用 Hi() 时，应用了默认绑定，this 指向全局对象（非严格模式下），
// 严格模式下，this 指向 undefined，undefined 上没有 this 对象，会抛出错误。
```

##### 隐式绑定
> 函数的调用是在某个对象上触发的，即调用位置上存在上下文对象。典型的形式为 XXX.fun(). 

> 对象属性链中只有最后一层会影响到调用位置。
> eg :person1.friend.sayHi();

##### 显式绑定
> 就是通过 call,apply,bind 的方式

call 和 apply的功能相同，区别在于传参的方式不一样:
>* fn.call(obj, arg1, arg2, ...),调用一个函数, 具有一个指定的this值和分别地提供的参数(参数的列表)。
>* fn.apply(obj, [argsArray]),调用一个函数，具有一个指定的this值，以及作为一个数组（或类数组对象）提供的参数。


##### 箭头函数
>* 箭头函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象，this的指向是不可变的;
>* 函数体内的 this 对象，继承的是外层代码块的 this。

>* 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
>* 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
>* 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
