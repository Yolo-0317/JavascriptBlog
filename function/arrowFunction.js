
var id = 21;
function foo() {
  setTimeout(function() {
    console.log('id:', this.id);
  }, 100);
}

foo.call({ id: 42 });
// id: 21

// 箭头函数
function foo2() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo2.call({ id: 42 });
// id: 42