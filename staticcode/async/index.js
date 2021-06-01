const axios = require('axios');

async function getData() {
  const data = await axios.get('http://localhost:4000/getUserProfit');
  return data.data;
}

getData().then((res) => { console.log(res) });
