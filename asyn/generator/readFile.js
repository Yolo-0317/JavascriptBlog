const fs = require('fs');

function read(file) {
  return new Promise(function (resolve, reject) {
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) reject(err)
      resolve(data)
    })
  })
}
