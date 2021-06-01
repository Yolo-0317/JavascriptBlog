/**
 * 链表只有一个属性，head保存链表的头结点
 *
 */

const Node = require('./Node');

function LinkedList() {
  this.head = new Node('head');

  // 如果查找成功，返回该该节点；否则返回null
  function find(item) {
    // 从头节点开始查
    let curNode = this.head;
    // 只有当curNode存在，并且其element不等于查询元素时，继续循环
    while (curNode !== null && curNode.element !== item) {
      curNode = curNode.next;
    }
    return curNode;
  } 

  // 插入节点
  /**
   * 新节点插入到item之前
   *
   * @param {*} newElement
   * @param {*} item
   */
  function insertAfterItem(newElement, item) {
    const newNode = new Node(newElement);
    const curNode = this.find(item);
    // console.log(`insertAfterItemm: curNode: ${JSON.stringify(curNode)}`);
    if (curNode !== null) {
      newNode.next = curNode.next;
      curNode.next = newNode;
    }
  }

  function display() {
    let curNode = this.head;
    while (!(curNode.next === null)) {
      console.log(curNode.next.element);
      curNode = curNode.next;
    }
  }

  function remove() {

  }

  this.find = find;
  this.insertAfterItem = insertAfterItem;
  this.remove = remove;
  this.display = display;

}

const llist = new LinkedList();
// console.log(llist.head);
llist.insertAfterItem('Conway', 'head');
llist.insertAfterItem('Russellville', 'Conway');
llist.insertAfterItem('Alma', 'Russellville');
llist.display()
console.log(llist.head.next);