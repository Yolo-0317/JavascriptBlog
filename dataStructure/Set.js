function Set() {
  this.items = {}; //使用对象而不是数组来表示集合
  this.has = function(value) {
    // return value in items;
    return Object.prototype.hasOwnProperty.call(this.items, value);
  }
  /** 
   * add() 集合中没有这个值就添加，返回true；反之返回false
  */
  this.add = (value) => {
    if (!this.has(value)) {
      this.items[value] = value;
      return true;
    }
    return false;
  }
  /** 
   * 
  */
  this.remove = (value) => {
    if (!this.has(value)) {
      delete this.items[value];
      return true;
    }
    return false;
  }
  /** 
   * 
  */
  this.clear = () => {
    this.items = {};
  }
  // return this.items;
}

const set = new Set();
set.add(1);
console.log(set);