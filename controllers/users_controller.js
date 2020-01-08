const User = require('../models/user');

module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title:"Profile"
    });
}


module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "Codeial ?Sign Up"
    })
}


module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: "Codeial ?Sign in"
    })
}

//sign up
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
         
        return res.redirect('back');
        console.log('password do not match ');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){ console.log('error in finding user in signing up');
            return}
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('error in creating user in signing up'); return}

                return res.redirect('/users/sign_in');
            })
        }
        else{
            return res.redirect('back');
        }

        
        
    })
}
//sign in create session
module.exports.createSession = function(req,res){
    User.findOne({email:req.body.email},function(err,user){
        if(err){ console.log('error in finding user in signing in'); }
        if(user){
            if(user.password != req.body.password){
             return res.redirect('back');
            }
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }
        else{
            return res.redirect('back');
        }

        
        
    })

}