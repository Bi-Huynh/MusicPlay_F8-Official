const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();


const port = 3000;

// Sử dụng morgan - http loger
app.use(morgan('combined'));

// sử dụng handlebars - template engine - có nhiều template engine khác nữa: pug, fs,.... 
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname.slice(0, __dirname.length - 17), 'resources/views'));
// console.log('path: ', path.join(__dirname.slice(0, __dirname.length - 17), 'resources/views'));
// console.log(__dirname.slice(0, __dirname.length - 17));

app.get('/', (req, res) => res.render('home'));

app.listen(port, () => console.log('port is ' + port));