const passport = require('passport');

const localStrategy =require('passport-local').Strategy;


const User = require('../models/user')


//authentication using passport
passport.use(new localStrategy({
    usernameField: 'email',
    // without using this function 
    //passReqToCallback:true
   },
   function(email,password,done){
         //find a user and make identity
         User.findOne({email: email},function(err,user){
             if(err){
                 console.log('error in finding user passport');
                 return done(err);
             }
             if (!user || user.password != password){
                 console.log('invalid username password');
                 return done(null,false);
             }

             return done(null,user);
         });
   }


));




//serialisng the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserialising the user from the key function 
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('error in  finding userpassport');
            return done(err);
        }
        return done(null,user);

    });
});

// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if the user i signed in ,then pass on the request to next function
    if(req.isAuthenticated()){
        return next();
            
    }
    //if user is not signed in
    return res.redirect('/users/sign_in');
}


passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are sending this to locals for views
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;


