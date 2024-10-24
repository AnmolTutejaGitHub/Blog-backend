
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    details: {
        type: String,
    },
    comments: [String]
})

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;