
/**
 * Node类包含两个属性，element用来保存节点上的数据
 * next用来保存指向下一个节点的链接
 *
 * @param {*} element
 */
function Node(element) {
  this.element = element;
  this.next = null;
}

module.exports = Node;