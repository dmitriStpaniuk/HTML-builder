// import * as fs from 'fs';
const fs = require('fs');
const path = require('path');
const x = path.join(__dirname,'text.txt');
const stream = fs.ReadStream( x,'utf-8');
let data = '';

stream.on('data', chunk=> data += chunk);
stream.on('end', ()=> console.log('End', data));
stream.on('error', error=> console.log('Error', error.message));