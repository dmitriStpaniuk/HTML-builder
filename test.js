const getFixturePath = path.join(__dirname, "secret-folder");

 fs.readdir(getFixturePath, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.filter(e=>!e.isDirectory()).map(dirent => path.join(getFixturePath, dirent.name));//?
});
