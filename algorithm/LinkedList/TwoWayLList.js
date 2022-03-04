function Node(element) {
  this.element = element;
  this.next = null;
  this.previous = null;
}

function TwoWayLList() {
  this.head = new Node('head');
  this.find = find;
  this.insert = insert;
  this.display = display;
  this.remove = remove;
  this.findLast = findLast;
  this.dispReverse = dispReverse;

  /**
   *
   * @param {*} item
   */
  function find(item) {
    let currNode = this.head;
    while (currNode.element !== item) {
      currNode = currNode.next;
    }
    return currNode;
  }

  /**
   * 和单向链表的类似
   * 需要设置新节点的 previous 属性
   * @param {*} newElement
   * @param {*} item
   */
  function insert(newElement, item) {
    const newNode = new Node(newElement);
    const current = this.find(item);
    newNode.next = current.next;
    newNode.previous = current;
    current.next = newNode;
  }

  function remove(item) {
    const currNode = this.find(item);
    if (!(currNode.next == null)) {
      currNode.previous.next = currNode.next;
      currNode.next.previous = currNode.previous;
      currNode.next = null;
      currNode.previous = null;
    }
  }

  /**
   * 找出了链表中的最后一个节点，同时免除了从前往后遍历链表
   * @returns
   */
  function findLast() {
    let currNode = this.head;
    while (!(currNode.next == null)) {
      currNode = currNode.next;
    }
    return currNode;
  }

  /**
   * 反序显示双向链表中的元素
   */
  function dispReverse() {
    let currNode = this.head;
    currNode = this.findLast();
    while (!(currNode.previous == null)) {
      console.log(currNode.element);
      currNode = currNode.previous;
    }
  }

  function display() {
    let currNode = this.head;
    while (!(currNode.next == null)) {
      console.log(currNode.next.element);
      currNode = currNode.next;
    }
  }
}

const cities = new TwoWayLList();
cities.insert('Conway', 'head');
cities.insert('Russellville', 'Conway');
cities.insert('Carlisle', 'Russellville');
cities.insert('Alma', 'Carlisle');
cities.display();

cities.remove('Carlisle');
cities.display();
cities.dispReverse();
