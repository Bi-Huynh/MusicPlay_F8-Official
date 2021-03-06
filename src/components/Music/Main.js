const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();


const port = 3000;

// Sử dụng morgan - http loger
app.use(morgan('combined'));

// sử dụng handlebars - template engine - có nhiều template engine khác nữa: pug, fs,.... 
app.engine('hbs', handlebars({
    extname: '.hbs' // cấu hình đuôi file, cho đuôi file khỏi dài
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname.slice(0, __dirname.length - 17), 'resources/views'));


app.get('/', (req, res) => res.render('home'));

app.get('/news', (req, res) => res.render('news'));

app.listen(port, () => console.log('port is ' + port));