class NewsController {

    // [get] /news
    index(req, res) {
        res.render('News/news');
    }

    // [get] /new/:slug
    show(req, res) {
        res.send('Hello news');
    }
}

module.exports = new NewsController;