const fs = require('fs');
const path = require('path');
const process = require('process');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
fs.writeFile(path.join(__dirname, 'notes.txt'), '', (err) => {
  if (err) throw err;
  console.log('файл notes.txt создан, ждем ввода текста');
});

process.openStdin().on('keypress', function (_, key) {
  if (key && key.name === 'c' && key.ctrl) {
    console.log('bye bye');
    process.exit();
  }
});

readline.on('line', (input) => {
  if (input === 'exit') {
    console.log('bye bye');
    process.exit();
  }
  fs.appendFile(path.resolve(__dirname, 'notes.txt'), input + '\n', (err) => {
    if (err) throw err;
  });
  console.log(`Received: ${input} - записано, продолжаем:`);
});
