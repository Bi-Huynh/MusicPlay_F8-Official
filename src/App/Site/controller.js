class SiteController {
    // [get] /
    home(req, res) {
        res.render('Site/home');
    }
    // render như thế này thì nó sẽ trả về status code 200 và
    // response là html (hay còn được gọi là Server Side Rending (ssr))

    // [get] /search
    search(req, res) {
        res.render('Site/search');
    }
}

module.exports = new SiteController();
