const { renderSync } = require('node-sass');
const Courses = require('../../Config/models/Course');
const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../Config/util/mongoose');

class CourseController {
    // [get] /course
    home(req, res, next) {
        Courses.find({})
            .then((course) => {
                course = mutipleMongooseToObject(course);

                res.render('Course/course', {
                    _Course: course,
                });
            })
            .catch(next);
    }

    // [get] /course/:slug
    info(req, res, next) {
        let slug = req.params.slug;
        Courses.findOne({ slug })
            .then((course) => {
                // course = mutipleMongooseToObject(course);
                res.render('Course/information', {
                    _Course: mongooseToObject(course),
                });
                // res.json(course);
            })
            .catch(next);
    }

    // [get] /course/create
    create(req, res, next) {
        res.render('Course/create');
    }

    // [post] /course/store
    storeCreate(req, res, next) {
        let course = { ...req.body };
        course.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        Courses.create(course)
            .then(() => {
                res.redirect('/me/stored/courses');
            })
            .catch(next);
    }

    // [get] /course/:id/edit
    edit(req, res, next) {
        let id = req.params.id;
        Courses.findById(id)
            .then((course) => {
                res.render('Course/edit', {
                    _Course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    // [put] /course/:id
    storeEdit(req, res, next) {
        let _id = req.params.id;
        let course = req.body;
        course.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;

        Courses.findByIdAndUpdate({ _id }, course)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [delete] /course/:id
    storeDelete(req, res, next) {
        let _id = req.params.id;
        Courses.delete({ _id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [delete] /course/:id/force
    storeForce(req, res, next) {
        let _id = req.params.id;
        Courses.deleteOne({ _id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [patch] /course/:id/restore
    restore(req, res, next) {
        let _id = req.params.id;
        Courses.restore({ _id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    handleFormActions(req, res, next) {
        let { action, courseIds } = req.body;
        switch (action) {
            case 'delete':
                Courses.delete({ _id: { $in: courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Courses.restore({ _id: { $in: courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'deleteForce':
                Courses.deleteOne({ _id: { $in: courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;

            default:
                res.json({ error: 'none action' });
                break;
        }
    }
}

module.exports = new CourseController();
