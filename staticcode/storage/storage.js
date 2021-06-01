import _ from 'lodash';
import store from 'store';
import moment from 'moment';

// 获取项目名称
const { app_name } = _.get(window, '_config') || {};

// 定义用户默认编号
const defUserId = `${_.now()}_${_.toString(_.random(10000000, 10000000000))}`;
// 设置全局用户编号
window.userId = getStorageItem('userId', defUserId);
const today = moment().format('YYYY-MM-DD');
export const codeListStorageKey = `equitiesCodeList_${today}`;
export const stockListStorageKey = `stockCodeList_${today}`;
export const fundListStorageKey = `fundCodeList_${today}`;

export const stockMapStorageKey = `stockMap_${today}`;
export const fundMapStorageKey = `fundMap_${today}`;

// 获取存储key
export function getStorageKey(key) {
  return `${app_name}_${key}`;
}

// 获取本地缓存结果
export function getStorageItem(key, def) {
  const sk = getStorageKey(key);
  let sv = store.get(sk);
  if (_.isNil(sv)) {
    if (def) {
      sv = def;
      setStorageItem(key, def);
    }
  }
  return sv;
}

// 设置本地缓存结果
export function setStorageItem(key, val) {
  const sk = getStorageKey(key);
  store.set(sk, val);
}

// 格式化码表
export function generateCodeMap(codeList) {
  if (codeList && codeList !== null && codeList !== undefined) {
    const { funds, stocks } = JSON.parse(codeList);

    const stockMap = {};
    _.forEach(stocks, (cl) => {
      stockMap[cl.tickerSymbol] = cl.secShortName;
    });
    const fundMap = {};
    _.forEach(funds, (cl) => {
      fundMap[cl.tickerSymbol] = cl.secShortName;
    });
    setSessionStorageItem(stockMapStorageKey, JSON.stringify(stockMap));
    setSessionStorageItem(fundMapStorageKey, JSON.stringify(fundMap));
  }
}

// 查询股票、基金对应
export function getStockNameById(stockId) {
  if (_.isString(stockId)) {
    const stockMapStr = getSessionStorageItem(stockMapStorageKey);
    if (stockMapStr && stockMapStr !== null && stockMapStr !== undefined) {
      const stockMap = JSON.parse(stockMapStr);
      return stockMap[stockId];
    }
  }
  return '';
}

// 获取localStorage结果
export function getLocalStorageItem(key) {
  const sk = getStorageKey(key);
  const sv = window.localStorage.getItem(sk);
  return sv;
}

// 设置到localStorage
export function setLocalStorageItem(key, val) {
  const sk = getStorageKey(key);
  window.localStorage.setItem(sk, val);
}

// 删除localStorage
export function removeLocalStorageItem(key) {
  const sk = getStorageKey(key);
  window.localStorage.removeItem(sk);
}

// 清空localStorage
export function clearLocalStorageItem() {
  const allKeys = _.keys(window.sessionStorage);
  _.forEach(allKeys, (key) => {
    if (!_.includes(key, today)) {
      // 不是今天的key，删除
      window.localStorage.removeItem(key);
    }
  });
}

// 获取sessionStorage结果
export function getSessionStorageItem(key) {
  const sk = getStorageKey(key);
  const sv = window.sessionStorage.getItem(sk);
  return sv;
}

// 设置到sessionStorage
export function setSessionStorageItem(key, val) {
  const sk = getStorageKey(key);
  if (key === codeListStorageKey) {
    generateCodeMap(val);
  }
  window.sessionStorage.setItem(sk, val);
}

// 清空sessionStorage
export function clearSessionStorageItem() {
  const allKeys = _.keys(window.sessionStorage);
  _.forEach(allKeys, (key) => {
    if (!_.includes(key, today)) {
      // 不是今天的key，删除
      window.sessionStorage.removeItem(key);
    }
  });
}

// 设置本地缓存结果
export function removeStorageItem(key) {
  const sk = getStorageKey(key);
  store.remove(sk);
}
