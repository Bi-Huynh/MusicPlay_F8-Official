const Courses = require('../../Config/models/Course');
const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../Config/util/mongoose');

class MeController {
    // [get] /stored/courses
    stored(req, res, next) {
        let courseQuery = Courses.find({});
        let { column, type } = req.query;

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({ [column]: type });
            // phải có dấu [] thì mới truyền biến column vào object được
        }

        Promise.all([courseQuery, Courses.countDocumentsDeleted()])
            .then(([course, deleteCount]) => {
                res.render('Me/stored-courses', {
                    _DeleteCount: deleteCount,
                    _Course: mutipleMongooseToObject(course),
                });
            })
            .catch(next);
    }

    // [get] /trash/courses
    trash(req, res, next) {
        Courses.findDeleted({})
            .then((course) => {
                course = mutipleMongooseToObject(course);

                res.render('Me/trash-courses', {
                    _Course: course,
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();
