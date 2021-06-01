const fs = require('fs');
const path = require('path');

const getHostsPath = filename => path.resolve(__dirname, './', filename);

function replaceHostsInHtml(filePath, hosts) {
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = /<base href="\/?\w*\/?"\s*\/>/;
  console.log(regex.test(content));
  const replacer = `<base href="${hosts.base}" />`;
  const resContent = content.replace(regex, replacer);

  fs.writeFileSync(filePath, resContent, { encoding: 'UTF-8' });
}
const hosts = require(getHostsPath('hosts-qa'));
// console.log(JSON.stringify(hosts));

replaceHostsInHtml('./index.html', hosts);
