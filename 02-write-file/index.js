const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, 'notes.txt'),'', (err) => {
  if (err) throw err;
  console.log(' - файл notes.txt создан');
});
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
readline.question('Write you message', (message) => {
  if(message === 'exit'){
    console.log('bye bye');
    process.exit();
  }
  console.log(`Сообщене '${message}' принято, записываем данные в файл `);
  // readline.close();

  fs.appendFile(path.resolve(__dirname,'notes.txt'), message, err =>{
    if(err)console.log(err);
    else{
      console.log('все гуд записано');
    }
  });
});

process.openStdin().on('keypress', function(_, key) {
  if(key && key.name === 'c' && key.ctrl) {
    console.log('bye bye');
    process.exit();
  }
});
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}
