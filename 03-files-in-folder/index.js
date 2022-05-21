const fs = require('fs');
const path = require('path');

const getFixturePath = path.join(__dirname, 'secret-folder');

fs.readdir(getFixturePath, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files
    .filter((e) => !e.isDirectory())
    .map((item) => {
      const x =
        path.parse(item.name).name +
        ' - ' +
        path.extname(item.name).substring(1) +
        ' - ';
      fs.stat(getFixturePath + '/' + item.name, (error, stat) => {
        if (error) console.log(error);
        console.log(x + (stat.size / 1024).toFixed(3) + 'kb'); //?
      });
    }); //?
});
