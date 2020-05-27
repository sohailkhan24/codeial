const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue')

module.exports.create = async  function(req,res){
try{

    let post = await Post.findById(req.body.post);


    if(post){
       let comment =   await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
         });

         post.comments.push(comment);
         post.save();
         comment = await comment.populate('user','name email').execPopulate();
        //  commentsMailer.newComment(comment);
        let job = queue.create('emails',comment).save(function(err){
            if (err){
                console.log('error in createing a queue',err);
                return;
            }
            console.log('job enqueued',job.id)              
        });
         if(req.xhr){
             
             return res.status(200).json({
                 data:{
                     comment:comment
                 },
                 message:"Post created "
             });
         }

            req.flash('success','comment published')
            res.redirect('/');
    }
}catch(err){
    console.log('Error',err);
    return;

}     
      
}     







module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){

            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}});
                return res.redirect('back');
            // if there is a user who has commented on the post wants to delete the comment but is not the one who has created the post 
            //then what  should be the code  doo it?

        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('error',err);
        return;
    }
}