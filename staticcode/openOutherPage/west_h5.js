const axios = require('axios');
const CryptoJS = require('crypto-js');
const moment = require('moment');
const open = require('open');


const prdType2 = 'https://hx.west95582.com/bill/user/authorization';
const prdType3 = 'https://hx.west95582.com/holding/user/authorization';

const userId = '34004146';
const type = 2; // 持仓诊断3 除了持仓诊断都是2
const source = `${userId}zz${moment().format('MMDD')}${moment().format('YYYY')}${type}`;
const url = type === 2 ? prdType2 : prdType3;

const channel = CryptoJS.MD5(source).toString();
axios.post(url, { userId, channel }).then((res) => {
  const { token } = res.data.data || {};
  const targetUrl = `https://hx.west95582.com/h5/portrait?accessToken=Bearer ${token}&userId=${userId}`;
  console.log(targetUrl);
  open(targetUrl, 'chrome');
});
