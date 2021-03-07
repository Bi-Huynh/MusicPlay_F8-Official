const newsRouter = require('./News/router');
const siteRouter = require('./Site/router');
const userRouter = require('./Users/router');

function router(app) {

    app.use('/news', newsRouter);

    app.use('/user', userRouter);

    app.use('/', siteRouter);
}

module.exports = router;