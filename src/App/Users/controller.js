class UserController {
    // [get] /user
    index(req, res) {
        res.render('User/user');
    }
    // render như thế này thì nó sẽ trả về status code 200 và
    // response là html (hay còn được gọi là Server Side Rending (ssr))

    // [get] /user/create
    create(req, res) {
        res.render('User/create');
    }
}

module.exports = new UserController();
