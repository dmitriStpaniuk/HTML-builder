const fs = require('fs');
const path = require('path');

const getFixturePath = path.join(__dirname, 'files'); //?
const getOutputPath = path.join(__dirname, './files-copy'); //?

const dir = () => {
  fs.access(getOutputPath, (err) => {
    if (err) {
      console.log('Creating files-copy folder...');
      copyDir();
    } else {
      fs.rm(getOutputPath, { recursive: true }, (err) => {
        if (err) console.log(err);
        copyDir();
      });
    }
  });
};

const copyDir = () => {

  fs.access(getOutputPath, (err) => {
    if (err) {
      fs.mkdir(getOutputPath, (err) => {
        if (err) console.log(err);
      });
    }
    fs.readdir(getFixturePath, (err, files) => {
      if (err) console.log(err);

      files.map((i) => {
        fs.copyFile(
          getFixturePath + '/' + i,
          getOutputPath + '/' + i,
          (err) => {
            if (err) console.log(err);
          }
        );
      }); //?
    });
  });
};
dir();

