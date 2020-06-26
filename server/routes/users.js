const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

let curr_user;

const db = "mongodb+srv://balu1611:1997mongodb@blogpost-ghfba.mongodb.net/BlogPosts?retryWrites=true&w=majority"
mongoose.Promise = global.Promise;

mongoose.connect(db,function(err){
    if(err){
        console.error("Error occured!" + err);
    }
});

// router.get('/all', function(req, res){
//     User.find({}).exec(function(err,users){
//         if(err){
//             console.log("Error Occured while retrieving Users!!");
//         }
//         else{
//             res.json(users);
//         }
//     });
// });


function verifyToken(req,res,next) {
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token,'balajibollu')
    if(!payload){
        return res.status(401).send("Unauthorized request")
    }
    req.userId = payload.subject
    next()
}


router.post('/login', (req, res) => {  
    User.findOne({ username : req.body.Username }, function(err, user) { 
        if (user === null) { 
            return res.status(400).send({ 
                message : "User not found."
            }); 
        } 
        else { 
            if (user.validPassword(req.body.Password)) { 
                curr_user = req.body.Username;
                let payload = {subject: user._id}
                let token = jwt.sign(payload, "balajibollu")
                return res.status(201).send({token}) 
            } 
            else { 
                return res.status(400).send({ 
                    message : "Wrong Password"
                }); 
            } 
        } 
    }); 
});




router.post('/user', (req, res) => {
    User.findOne({ username : req.body.Username }, function(err, user) { 
        if (user === null) { 
            return res.status(400).send({ 
                message : "User not found."
            }); 
        } 
        else{
            return res.status(201).send(user) 
        }
    })
}); 



router.post('/signup', (req, res, next) => { 
       let newUser = new User(); 
       newUser.username = req.body.Username;
       newUser.dob = req.body.DOB; 
       newUser.setPassword(req.body.Password);
       newUser.posts = req.body.Posts; 
       newUser.save((err, User) => { 
           if (err) { 
               return res.status(400).send({ 
                   message : "Failed to add user."
               }); 
           } 
           else {
               let payload = { subject: User._id } 
               let token = jwt.sign(payload, "balajibollu")
               return res.status(201).send({token:token,Username:User.Username}); 
           } 
       }); 
   });




   router.put('/user/:id', function(req, res){
    User.findByIdAndUpdate(req.params.id,
        {
                $set: {posts: req.body.posts}
        },
        {
                new: true
        },
        function(err, updatedPost){
            if(err){
                res.send("Error updating");
            }else{
                res.json(updatedPost);
            }
        })

});








router.get('/myposts', verifyToken, (req,res) => {
    //body
})
// router.put('/user/:id', function(req, res){
//     User.findByIdAndUpdate(req.params.id,
//     {
//         $set: {username: req.body.username, password: req.body.password, dob: req.body.dob}
//     },
//     {
//         new: true
//     },
//     function(err, updatedUser){
//         if(err){
//             res.send("Error updating video");
//         }else{
//             res.json(updatedUser);
//         }
//     }

//     );
// });



router.delete('/user/:id', function(req, res){
    User.findByIdAndRemove(req.params.id, function(err, deletedUser){
        if(err){
            res.send("Error deleting the current user");
        }else{
            res.json(deletedUser);
        }
    });
});

module.exports = router;