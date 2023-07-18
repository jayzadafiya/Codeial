const nodemailer=require("../config/nodemailer");

// this is another way ofexporting a metohd
exports.newComment=(comment)=>{
    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    //sendmail is pre-defind method
    nodemailer.transpoter.sendMail({
        from: "Codeial@gmail.com",
        to: comment.user.email,
        subject:"new comment publish",
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }

        console.log('message send',info);
        return;
        
    });
}

