const fs = require('fs');
const path = require('path');
const {
  readdir,
  rm,
  mkdir,
  copyFile,
  writeFile,
  readFile
} = require('fs/promises');
const readline = require('readline');
const mainPath = path.join(__dirname, 'project-dist');
const inputAssetsPath = path.join(mainPath, 'assets');
const cssPath = path.join(__dirname, 'styles');
const components = path.join(__dirname, 'components');
const templatePath = path.join(__dirname, 'template.html');
const outputAssetsPath = path.join(__dirname, 'assets');
const htmlPath = path.join(mainPath, 'index.html');//? 

const copyCss = async (main) => {
  try {
    writeFile(mainPath + '/style.css', '', (err) => {
      if (err) console.log(err);
    });
    const allFiles = await readdir(main, { withFileTypes: true });
    const writableStream = fs.createWriteStream(mainPath + '/style.css');
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
  const readAssets = await readdir(main, { withFileTypes: true });
  for (const file of readAssets) {
    const filePath = path.join(main, file.name);
    const newFilePath = path.join(assets, file.name);
    if (file.isFile()) {
      await copyFile(filePath, newFilePath);
    } else if (file.isDirectory()) {
      await copyDir(filePath, path.join(inputAssetsPath, file.name));
    }
  }
};


const replaceHtml = async () => {
  try {
    const readStreamHtml = fs.createReadStream(templatePath);
    const rl = readline.createInterface({
      input: readStreamHtml,
      crlfDelay: Infinity
    });
    const writableStream = fs.createWriteStream(htmlPath);
    for await (const line of rl) {
      const match = line.match(/{{\w*}}/g);
      writableStream.write('\n');
      if (match) {
        const file = await readFile(path.join(components, `${match[0].slice(2, -2)}.html`), 'utf-8');
        writableStream.write(file);
      } else {
        writableStream.write(line);
      } 
    }
  } catch (error) {
    console.log(error);
  }

};

(async () => {
  await rm(mainPath, { recursive: true, force: true });
  await mkdir(mainPath, { recursive: true });
  await copyDir(outputAssetsPath, inputAssetsPath);
  await copyCss(cssPath);
  await copyFile(templatePath, mainPath + '/index.html');
  await replaceHtml();
})();
