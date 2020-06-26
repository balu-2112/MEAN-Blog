const mongoose = require('mongoose');
const Post = require('./post');

var crypto = require('crypto');

const UserSchema = mongoose.Schema(
    {
        username: String,
        hash : String, 
        salt : String,
        dob: Date,
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
          }]
    });


    UserSchema.methods.setPassword = function(password) { 
       this.salt = crypto.randomBytes(16).toString('hex'); 
       this.hash = crypto.pbkdf2Sync(password, this.salt,  
       1000, 64, `sha512`).toString(`hex`); 
}; 

UserSchema.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
};

const User = module.exports = mongoose.model('Users', UserSchema); 
