const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');



let transporter = nodemailer.createTransport({
    service: 'gmail',
    host:'smpt.gmail.com',
    port:587,
    auth:{
        user: 'sohailkhan2709@gmail.com',
        pass:'codeproj'
    }

});

let renderTemplate = (data, relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers', relativePath),
        data,
        function(err,template){
            if(err){console.log('eror in rendering template',err); return;}
            mailHTML = template;

        }
    )
    return mailHTML;

}

module.exports ={
    transporter: transporter,
    renderTemplate: renderTemplate
}
//?? u dere? enable two step verification  the setting which ur checking is already on have you enabled the two step verification  where>??in gmail i dont think sodisconnect and enable  it htheonw  towe? will connect again okokay
