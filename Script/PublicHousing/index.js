const axios = require('axios');


axios.post('https://select.pdgzf.com/api/v1.0/app/gzf/user/login', { account: '13061818087', password: 'kd+G+TSwxGT6O4+DQQhL+A==', captcha: '0' }).then((res) => { console.log(res) });
