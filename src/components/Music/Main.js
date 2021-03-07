const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();


const port = 3000;
// đường dẫn tuyệt đối đến file src
const pathFileSrc = __dirname.slice(0, __dirname.length - 17);
// __dirname : đường dẫn tuyệt đối tới file hiện hành - js cung cấp
// đường dẫn tuyệt đối đến file AppMusicPlay
const pathApp = __dirname.slice(0, __dirname.length - 20);

// Danh sách User
const listUser = [];

// const $ = document.querySelector('.listUser');
// const $$ = document.querySelectorAll.bind(document);



// Sử dụng morgan - http loger
// app.use(morgan('combined'));
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

app.get('/', (req, res) => res.render('home'));
// render như thế này thì nó sẽ trả về status code 200 và 
// response là html (hay còn được gọi là Server Side Rending (ssr))

app.get('/news', (req, res) => res.render('news'));

app.get('/search', (req, res) => {
    res.render('search');
});

app.get('/info', (req, res) => {
    res.render('info');
});

app.post('/info', (req, res) => {
    // let user = req.body;
    // if (user) {
    //     listUser.push(user);
    // }

    // let htmlListUser = listUser.map((user) => res.send(`
    //     <div>
    //         <div>
    //             <p>First Name:  ${user.firstName}</p>
    //             <p>Last Name:   ${user.lastName}</p>
    //             <p>User Name:   ${user.UserName}</p>
    //             <p>City:        ${user.city}</p>
    //             <p>State:       ${user.state}</p>
    //             <p>Zip:         ${user.zip}</p>
    //         </div>
    //     </div>
    // `));

    // document.querySelector('.listInfo').innerHTML = htmlListUser.join('');
});

app.listen(port, () => console.log('port is ' + port));