const newsRouter = require('./News/router');
const siteRouter = require('./Site/router');
const userRouter = require('./Users/router');
const courseRouter = require('./Courses/router');
const meRouter = require('./Me/router');

const sortMiddleware = require('./middleware/sort');

function router(app) {
    app.use('/news', newsRouter);

    app.use('/user', userRouter);

    app.use('/course', courseRouter);

    app.use('/me', sortMiddleware, meRouter);

    app.use('/', siteRouter);
}

module.exports = router;
