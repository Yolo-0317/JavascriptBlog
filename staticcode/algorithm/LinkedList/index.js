function Node(element) {
  this.element = element;
  this.next = null;
}

function LList() {
  this.head = new Node('head');
  this.find = find;
  this.insert = insert;
  this.findPrevious = findPrevious;
  this.remove = remove;
  this.display = display;
  this.advance = advance;

  /**
 * 遍历链表，查找给定数据
 * 创建一个新节点，并将链表的头节点赋 给这个新创建的节点
 * 然后在链表上进行循环，如果当前节点的 element 属性和我们要找 的信息不符，就从当前节点移动到下一个节点。
 * 如果查找成功，该方法返回包含该数据的 节点;否则，返回 null。
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
 * 将新节点插入链表
 * 首先，将新节点的 next 属性设 置为“后面”节点的 next 属性对应的值。
 * 然后设置“后面”节点的 next 属性指向新节点
 * @param {*} newElement
 * @param {*} item
 */
  function insert(newElement, item) {
    const newNode = new Node(newElement);
    const current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
  }

  /**
 * 用来显示链表中的元素
 * 该方法先将列表的头节点赋给一个变量，然后循环遍历链表，当前节点的 next 属性为 null 时循环结束
 */
  function display() {
    let currNode = this.head;
    while (!(currNode.next == null)) {
      console.log(currNode.next.element);
      currNode = currNode.next;
    }
  }

  /**
   * 方法遍历链表中的元素，检查每一个节点的下一个节点中是否存储着待删除数据
   */
  function findPrevious(item) {
    let currNode = this.head;
    while (!(currNode.next === null)
      && (currNode.next.element !== item)) {
      currNode = currNode.next;
    }
    return currNode;
  }

  /**
   *
   * @param {*} item
   */
  function remove(item) {
    const prevNode = this.findPrevious(item);
    if (!(prevNode.next == null)) {
      // a -> b -> c -> d
      // 要删除b，prevNode就是a,a.next.next就是c
      prevNode.next = prevNode.next.next;
    }
  }

  /**
   * 在链表中向前移动 n 个节点
   * @param {*} item
   * @param {*} n number
   */
  function advance(item, n) {
    if (n === 0) { return }
    const currNode = this.find(item);
    // 获取前置节点
    const prevNode = this.findPrevious(item);
    // 获取前置节点的前置节点
    const prevPrevNode = this.findPrevious(prevNode.element);
    // 前置节点的next设置为当前节点的next
    prevNode.next = currNode.next;
    // 当前节点的next设置为前置节点
    currNode.next = prevNode;
    // 前置节点的前置节点的next设置为当前节点
    prevPrevNode.next = currNode;
    // 递归
    this.advance(item, n - 1);
  }
}

const cities = new LList();
cities.insert('Conway', 'head');
cities.insert('Carlisle', 'Conway');
cities.insert('Russellville', 'Carlisle');
cities.insert('Alma', 'Russellville');
cities.insert('1', 'Alma');
// cities.insert('Carlisle', 'Alma');
cities.display();
console.log('-------------');
// cities.remove('Carlisle');
// cities.display();
cities.advance('Alma', 1);
console.log('-------------');
cities.display();
