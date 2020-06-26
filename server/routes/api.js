const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post = require('../models/post');

const db = "mongodb+srv://balu1611:1997mongodb@blogpost-ghfba.mongodb.net/BlogPosts?retryWrites=true&w=majority"
mongoose.Promise = global.Promise;

mongoose.connect(db,function(err){
    if(err){
        console.error("Error occured!" + err);
    }
});

router.get('/posts', function(req, res){
    Post.find({}).exec(function(err,posts){
        if(err){
            console.log("Error Occured while retrieving Posts!!");
        }
        else{
            res.json(posts);
        }
    });
});



router.get('/posts/:id', function(req, res){
    Post.findById(req.params.id).exec(function(err,post){
        if(err){
            console.log("Error Occured while retrieving the specified Post!!");
        }
        else{
            res.json(post);
        }
    });
});



router.post('/newpost', function(req,res){
    var newPost = new Post();
    // newPost.blog_id = req.body.blog_id;
    newPost.blog_title = req.body.blog_title;
    newPost.description = req.body.description;
    newPost.image_url = req.body.image_url;

    newPost.save(function(err,insertedPost){
        if(err){
            console.log("Error Occured while inserting Post!!");
        }
        else{
            res.json(insertedPost);
        }
    });

});



router.put('/post/:id', function(req, res){
    Post.findByIdAndUpdate(req.params.id,
    {
        $set: {blog_id: req.body.blog_id, blog_title: req.body.blog_title, description: req.body.description,image_url: req.body.image_url}
    },
    {
        new: true
    },
    function(err, updatedPost){
        if(err){
            res.send("Error updating video");
        }else{
            res.json(updatedPost);
        }
    }

    );
});



router.delete('/post/:id', function(req, res){
    Post.findByIdAndRemove(req.params.id, function(err, deletedPost){
        if(err){
            res.send("Error deleting video");
        }else{
            res.json(deletedPost);
        }
    });
});

module.exports = router;