const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const db = require('../Config/db/index');
const methodOverride = require('method-Override');

const indexRouter = require('../App/indexRouter');

const app = express();

// connect db
db.connect();

const port = 3000;
// đường dẫn tuyệt đối đến file src
const pathFileSrc = __dirname.slice(0, __dirname.length - 10);
// __dirname : đường dẫn tuyệt đối tới file hiện hành - js cung cấp đường dẫn tuyệt đối đến file AppMusicPlay
const pathApp = __dirname.slice(0, __dirname.length - 14);

// Sử dụng morgan - http loger
// app.use(morgan('combined'));
// Sử dụng express.static để có thể sử dụng được các file img, mp3, ....
app.use(express.static(path.join(pathApp, 'public')));
// sử dụng middleware để mã hóa req.body, có thể sử dụng được nó tại express từ -v 4.16, nếu sử dụng -v cũ hơn thì phải cài npm body-parser để mã hóa req.body
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
// thêm thằng json để có thể submit những dữ liệu không phải html như XMLHttp, fetch,....
// dùng để gửi code từ js lên để submit

app.use(methodOverride('_method'));
// override method này là để override lại các phương thức trong mongoose
// sử dụng nó để có thể sử dụng thư viện override dùng trong soft delete (xóa mềm => không xóa hẳng đi)

// sử dụng handlebars - template engine - có nhiều template engine khác nữa: pug, fs,....
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs', // cấu hình đuôi file, cho đuôi file khỏi dài
        helpers: {
            sum: (a, b) => a + b,
            sortable: (column, sort) => {
                const sortType = column === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${column}&type=${type}">
                        <span class="${icon} ml-2"></span>
                    </a>`;
            },
        },
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(pathFileSrc, 'resources', 'views'));

indexRouter(app);

// start web server
app.listen(port, () => console.log('http://localhost:' + port));
