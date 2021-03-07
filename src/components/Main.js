const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');

const indexRouter = require('../App/indexRouter');

const app = express();


const port = 3000;
// đường dẫn tuyệt đối đến file src
const pathFileSrc = __dirname.slice(0, __dirname.length - 10);
// __dirname : đường dẫn tuyệt đối tới file hiện hành - js cung cấp
// đường dẫn tuyệt đối đến file AppMusicPlay
const pathApp = __dirname.slice(0, __dirname.length - 14);

// Sử dụng morgan - http loger
app.use(morgan('combined'));
// Sử dụng express.static để có thể sử dụng được các file img, mp3, ....
app.use(express.static(path.join(pathApp, 'public')));
// sử dụng middleware để mã hóa req.body, có thể sử dụng được nó tại express
// từ -v 4.16, nếu sử dụng -v cũ hơn thì phải cài npm body-parser để mã hóa req.body
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
// thêm thằng json để có thể submit những dữ liệu không phải html như XMLHttp, fetch,....
// dùng để gửi code từ js lên để submit


// sử dụng handlebars - template engine - có nhiều template engine khác nữa: pug, fs,.... 
app.engine('hbs', handlebars({
    extname: '.hbs' // cấu hình đuôi file, cho đuôi file khỏi dài
}));
app.set('view engine', 'hbs');
app.set('views', path.join(pathFileSrc, 'resources/views'));

indexRouter(app);


// start web server
app.listen(port, () => console.log('port is ' + port));