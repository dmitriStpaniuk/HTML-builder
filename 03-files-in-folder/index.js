const fs = require('fs');
const path = require('path');
// const stat = require('fs');

const getFixturePath = path.join(__dirname, 'secret-folder');

fs.readdirSync(getFixturePath, { withFileTypes: true })
  .filter((item) => !item.isDirectory())
  .map(
    (item) =>
      console.log(
        path.parse(item.name).name +
          ' - ' +
          path.extname(item.name).substring(1)
      ) +
      ' - ' +
      fs.stat(item.name, (err)=>{
        console.log(err);
      })
  ); //?
// https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#fsstatpath-options-callback