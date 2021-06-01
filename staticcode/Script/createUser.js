const axios = require('axios');

function createUser() {
  console.log([...Array(40).keys()]);
  [...Array(40).keys()].forEach((num) => {
    console.log(num);
    axios.post('http://mof-gw-minsen.respool2.wmcloud-qa.com/usermaster/ca/uqer/roboamsmixed/account/v2.json', {
      fullName: `bay${num}.yu`,
      mobile: `131623306${num < 10 ? `0${num}` : num}`,
      email: `bay${num}.yu@datayes.com`,
      deptName: '',
      skipAudit: true,
      createSaasAccount: true,
      forceCreate: false,
    }, {
      headers: {
        Authorization: 'Bearer 94EA5D0BF5F7A676BDFD02CDFF65CECF',

      },
    }).then((res) => { console.log(res) });
  });
}

createUser();
