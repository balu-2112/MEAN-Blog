const mongoose = require('mongoose');

const Post = mongoose.model(
    "Blog",
    new mongoose.Schema({
        blog_title: String,
        description: String,
        image_url: String
    })
);

module.exports = Post;