const nodeMailer= require('../config/nodemailer');
//  newComment = function.......
// module.exports = newComment;
// this a new way
exports.newComment =(comment) =>{
    // console.log('inside newComment mailer', comment);
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
//try nowf wait u dere??????
    nodeMailer.transporter.sendMail({
        from:'sohailkhan4764@gmail.com',
        to: comment.user.email,
        subject:"NEW COMMENT PUBLISHED",
        html: htmlString
    },(err,info) =>{
        if(err){
        console.log('error in sending the mail',err);
        return;
    }
    console.log('messge given',info);
    return;

       // wait okay
    });



    // post case it would be comment .post.user.email
}