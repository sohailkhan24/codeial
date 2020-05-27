const passport =require('passport');
const googleStratergy=require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use a new stratergy for google  login
passport.use(new googleStratergy({
 clientID:"447647879151-e1f93d9ofo4tc4argg6cjnj62jblf148.apps.googleusercontent.com",
 clientSecret:"6iNURnFOcJRFW8HF9zQVXNZZ",
 callbackURL: "http://localhost:8000/users/auth/google/callback",
},

function(accessToken,refreshToken,profile,done){
    User.findOne({email: profile.emails[0].value}).exec(function(err,user){
       if(err){console.log('error in google stratergy_passport',err); return; }
       console.log(profile);
       if(user){
           //if found set this user as req.user
           return done(null,user);
       }else{
           //if  not found , create the user as req.user
           User.create({
               name: profile.displayName,
               email:profile.emails[0].value,
               password: crypto.randomBytes(20).toString('hex')
           }, function(err,user){
            console.log('error in  creating user',err); return done(null, user);
           });
       }
    });
}

));
module.exports = passport;