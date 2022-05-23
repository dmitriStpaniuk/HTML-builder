const fs = require('fs');
// const fsPromise = require('fs/promises');
const path = require('path');
const { readdir, rm, mkdir, copyFile, writeFile } = require('fs/promises');
const mainPath = path.join(__dirname, 'project-dist'); //?
const inputAssetsPath = path.join(mainPath, 'assets'); //?
const cssPath = path.join(__dirname, 'styles');
const outputAssetsPath = path.join(__dirname, 'assets'); //?
//?

const copyCss = async (main) => {
  try {
    writeFile(mainPath + '/style.css', '', (err) => {
      if (err) console.log(err);
    });
    const allFiles = await readdir(main, { withFileTypes: true });
    const writableStream = fs.createWriteStream(mainPath + '/style.css'); //?
    allFiles.forEach((i) => {
      if (path.extname(path.join(cssPath, i.name)) === '.css') {
        const readableStream = fs.createReadStream(
          path.join(__dirname, 'styles', i.name),
          'utf-8'
        );
        readableStream.pipe(writableStream);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const copyDir = async (main, assets) => {
  await mkdir(assets, { withFileTypes: true });
  const readAssets = await readdir(main, { withFileTypes: true }); //?
  for (const file of await readAssets) {
    const filePath = path.join(main, file.name); //?
    const newFilePath = path.join(assets, file.name); //?
    if (file.isFile()) {
      await copyFile(filePath, newFilePath);
    } else if (file.isDirectory()) {
      await copyDir(filePath);
    }
  }
};

(async () => {
  await rm(mainPath, { recursive: true, force: true });
  await mkdir(mainPath, { recursive: true });
  await copyCss(cssPath);
  await copyDir(outputAssetsPath, inputAssetsPath);
})();
