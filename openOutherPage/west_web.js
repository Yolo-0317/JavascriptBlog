const axios = require('axios');
const CryptoJS = require('crypto-js');
const moment = require('moment');
const open = require('open');


const url = 'https://hx.west95582.com/eagle/user/authorization';

const userId = '1707';
const type = 1;
const source = `${userId}lzcrm${moment().format('MMDD')}${moment().format('YYYY')}${type}`;

const channel = CryptoJS.MD5(source).toString();
axios.post(url, { userId, channel }).then((res) => {
  const { token } = res.data.data || {};
  const targetUrl = `https://hx.west95582.com/web/daily/crm-develop?accessToken=Bearer ${token}&userId=${userId}`;
  console.log(targetUrl);
  open(targetUrl, 'chrome');
});
