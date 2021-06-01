const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');

// File path.
readXlsxFile('./test.xlsx').then((rows) => {
  console.log(rows);
});
