// indexedDB操作
class IndexedDB {
  version = 1;
  constructor(dbInfo = {}) {
    // 数据库构造函数
    // 返回浏览器兼容的indexedDB对象
    this.indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;
    this.varDBState = ''; // 记录当前数据库状态
    this.currentDatabase = dbInfo.name || `indexed${new Date().getTime()}`;
    this.tables = dbInfo.tables || [];
    this.dbNameLocalKey = dbInfo.dbNameLocalKey || '';
    this.indexes = dbInfo.indexes || [];
    // this.codeListStorageKey = `equitiesCodeList_${today}`;
    // this.stockMapStorageKey = `stockMap_${today}`;
    // this.fundMapStorageKey = `fundMap_${today}`;
    // 删除过期数据库
    this.deleteDB();
  }

  // 删除过期数据库，上一个版本创建的数据库存储在localStorage里面
  deleteDB() {
    // 获取当前存储的数据库名称
    const lastDatabase = getLocalStorageItem(this.dbNameLocalKey);
    if (lastDatabase !== this.currentDatabase) {
      // 不相等时需要删除之前日期的数据库
      // 如果indexedDB 对象存在
      try {
        // 删除指定名称数据库
        this.indexedDB.deleteDatabase(lastDatabase);
        // 存储当前版本数据库
        setLocalStorageItem(this.dbNameLocalKey, this.currentDatabase);
        this.varDBState = 'delete';
        // eslint-disable-next-line
      } catch (e) { }
      // 设置数据库状态【删除完成】
    }
  }

  // 关闭数据库
  closeDB() {
    // 设置数据库状态【关闭数据库】
    this.varDBState = 'close';
    // 关闭当前数据库
    if (this.db) {
      this.db.close();
    }
  }

  // 打开数据库
  openDB() {
    // 返回的承诺对象
    return new Promise((resolve, reject) => {
      // 定义承诺对象
      const dfd = {
        resolve,
        reject,
      };
      // 如果关闭数据库，超时存在； 清理过期函数
      if (this.closeDBTimeout) {
        clearTimeout(this.closeDBTimeout);
      }
      // 设置一个过期，关闭数据库定时
      this.closeDBTimeout = setTimeout(this.closeDB, 30000);
      // 如果数据库为开启成功状态
      if (this.varDBState === 'open.success') {
        // 返回正确状态
        dfd.resolve();
        // 需要执行数据库打开
      } else {
        // 别名当前对象
        // 相关容错处理
        try {
          // 执行数据库开启命令
          const request = this.indexedDB.open(
            // 当前数据库名称
            this.currentDatabase,
            // 当前数据库版本
            this.version
          );
          // 开启数据库，出现错误
          request.onerror = (e) => {
            // 设置数据库状态【数据库开启失败】
            this.varDBState = 'open.error';
            // 输出错误信息
            console.error(e);
            // 输出错误结果
            dfd.reject(e);
          };
          // 开启数据库，成功
          request.onsuccess = (e) => {
            // 设置数据库状态
            this.varDBState = 'open.success';
            // 设置数据库对象
            this.db = e.target.result;
            // 返回正确结果
            dfd.resolve();
          };
          // 数据库初始化状态
          request.onupgradeneeded = (e) => {
            // 设置数据库状态
            this.varDBState = 'upgrade';
            // 获取数据库对象
            this.db = e.target.result;
            // 创建相关表
            this.createTables();
          };
          // 相关错误捕获
        } catch (e) {
          // 设置数据库状态【数据库开启失败】
          this.varDBState = 'open.error';
          // 输出错误信息
          console.error(e);
          // 输出错误结果
          dfd.reject(e);
        }
      }
    });
  }

  // 创建相关表
  createTables() {
    if (
      // 如果处在数据库提升状态
      this.varDBState === 'upgrade' &&
      // 如果存在相应函数
      _.isFunction(_.get(this.db, 'objectStoreNames.contains'))
    ) {
      // 遍历当前表结构
      _.each(this.tables, (table) => {
        // 如果当前表不存在
        if (!this.db.objectStoreNames.contains(table.name)) {
          // 容错处理
          try {
            // 创建相应表结构
            const tableObjStore = this.db.createObjectStore(table.name, {
              keyPath: table.keyPath,
            });
            if (_.size(this.indexes)) {
              _.forEach(this.indexes, (indexInfo) => {
                tableObjStore.createIndex(...indexInfo);
              });
            }
            // 捕获创建数据表异常
          } catch (e) {
            console.error(e);
          }
        }
      });
    }
  }

  // 写入数据的请求
  putData(table, data) {
    // 返回的承诺对象
    return new Promise((resolve, reject) => {
      // 定义承诺对象
      const dfd = {
        resolve,
        reject,
      };
      // 查询put结果
      this.put(dfd, table, data);
    });
  }

  // 写入、修改数据
  put(dfd, table, data) {
    // 开启数据库
    this.openDB()
      // 如果数据库已开启
      .then(() => {
        // 容错处理
        try {
          // 获取数据库表对象
          const transaction = this.db.transaction([table], 'readwrite');
          transaction.oncomplete = () => {
            console.info('"Add: Success"');
          };
          const dbStore = transaction.objectStore(table);
          // 获取一个请求对象
          const request = dbStore.put(data);
          // 监听错误输出
          request.onerror = (e) => {
            // 输出错误信息
            console.error(e);
            // 返回错误结果
            dfd.reject(e);
          };
          // 监听正确输出
          request.onsuccess = () => {
            // 输出查询结果
            dfd.resolve();
          };
          // 捕获更新数据异常
        } catch (e) {
          // 输出错误信息
          console.error(e);
          // 返回错误结果
          dfd.reject(e);
        }
        // 数据库打开失败
      })
      // 开启数据库失败
      .catch((e) => {
        // 返回错误结果
        dfd.reject(e);
      });
  }

  // 返回查询 结果
  getData(table, reqKey) {
    // 返回的承诺对象
    return new Promise((resolve, reject) => {
      // 定义承诺对象
      const dfd = {
        resolve,
        reject,
      };
      // 查询ajax 结果
      this.get(dfd, table, _.trim(reqKey));
    });
  }
  // 获取查询数据
  get(dfd, table, key) {
    const that = this;
    // 开启数据库
    this.openDB()
      // 如果数据库已开启
      .then(() => {
        // 容错处理
        try {
          // 获取数据库表对象
          const dbStore = that.db
            .transaction([table], 'readonly')
            .objectStore(table);
          // 获取一个请求对象
          const request = dbStore.get(key);
          // 监听错误输出
          request.onerror = (e) => {
            // 输出错误信息
            console.error(e);
            // 返回错误结果
            dfd.reject(e);
          };
          // 监听正确输出
          request.onsuccess = (e) => {
            // 获得查询结果
            const result = e.target.result;
            // 输出查询结果
            dfd.resolve(result);
          };
          // 捕获读取数据异常
        } catch (e) {
          // 输出错误信息
          console.error(e);
          // 返回错误结果
          dfd.reject(e);
        }
        // 数据库打开失败
      })
      // 开启数据库失败
      .catch((e) => {
        // 返回错误结果
        dfd.reject(e);
      });
  }

  // 模糊搜索结果
  fuzzySearchData(table, searchValue) {
    // 返回的承诺对象
    return new Promise((resolve, reject) => {
      // 定义承诺对象
      const dfd = {
        resolve,
        reject,
      };
      // 查询ajax 结果
      this.fuzzySearch(dfd, table, _.trim(searchValue));
    });
  }

  // 模糊搜索
  fuzzySearch(dfd, table, searchValue) {
    const dbStore = this.db.transaction(table).objectStore(table);
    dbStore.openCursor().onsuccess = (e) => {
      // console.log('onsuccess');
      const cursor = e.target.result;
      if (cursor) {
        // console.log(cursor);
        dfd.resolve(cursor.value);
      }
    };
  }
}

const indexedDBHandle = new IndexedDB({
  name: `equityDB${today}`,
  tables: [
    { name: stockListStorageKey, keyPath: 'secId' },
    { name: fundListStorageKey, keyPath: 'secId' },
    // { name: fundMapStorageKey, keyPath: 'id' },
  ],
  dbNameLocalKey: 'equityDBName',
  // indexes: [['secShortName', 'secShortName', { unique: false }]],
});
// indexedDBHandle
//   .putData(stockListStorageKey, { secId: '000001', name: '平安' })
//   .then(() => {
//     indexedDBHandle.fuzzySearchData(stockListStorageKey, '平').then((obj) => {
//       console.log(obj);
//     });
//   });
export const saveStocksList = ({ stocks }) => {
  console.log(stocks);
  indexedDBHandle.putData(stockListStorageKey, { secId: 'stocks', stocks });
};

// indexedDBHandle.closeDB();