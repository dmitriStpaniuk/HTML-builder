const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

const mainPath = path.join(__dirname, 'project-dist');
let cssPath = path.join(__dirname, 'styles');

const bundleBob = async (main) => {
  try {
    fs.writeFile(mainPath + '/bundle.css', '', (err) => {
      if (err) console.log(err);
    });
    const allFiles = await readdir(main, { withFileTypes: true });
    const writableStream = fs.createWriteStream(mainPath + '/bundle.css'); //?
    allFiles.forEach((i) => {
      if (path.extname(path.join(cssPath, i.name)) === '.css' && i.isFile()) {
        const readableStream = fs.createReadStream(
          path.join(__dirname, 'styles', i.name),
          'utf-8'
        );
        readableStream.pipe(writableStream);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

bundleBob(cssPath);
