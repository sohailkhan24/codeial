const Post = require('../models/post');


module.exports.home = function(req,res){
    //console.log(req.cookies);
    //res.cookie('user_id',25);

//     Post.find({},function(err,posts){
//         return res.render('home',{
//            title:"Codeial | Home",
//             posts:posts
//        });
//    });


 // populate the user of each post
    Post.find({}).populate('user').exec(function(err,posts){
       return res.render('home',{
           title:"Codeial | Home",
            posts : posts
        });
    });

//   findOne({ title: 'Casino Royale' }).
//   populate('author').
//   exec(function (err, story) {
//     if (err) return handleError(err);
//     console.log('The author is %s', story.author.name);
//     // prints "The author is Ian Fleming"
//   });
    
    
}

// module.exports.actionName = function(req,res){}