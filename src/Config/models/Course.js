const mongoose = require('mongoose');
let slug = require('mongoose-slug-generator');
let mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, default: 'Course' },
        description: { type: String, default: 'Content Course' },
        image: String,
        videoId: String,
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    }
);

mongoose.plugin(slug);
Course.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

module.exports = mongoose.model('Course', Course);
// cái model name thì mongo nó sẽ tự động convert sang dạng toàn bộ là chữ thường và thêm số nhiều và
// khoảng trắng thì sẽ thành dấu gạch dưới và đối chiếu sang colection trong mongodb
// Nếu chư có colection trong mongodb thì nó sẽ tự tạo
