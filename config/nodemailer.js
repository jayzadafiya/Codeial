const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

//create resuable transpoter onnbject using the default SMTP transport
// this is main part for sending mail
let transpoter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'zadafiyajay4@gmail.com',
        pass: 'zlcvjpkytrvldnfj',

    }
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, "../views/mailers", relativePath),
        data,
        function (err, template) {
            if (err) {
                console.log('error in rendring template');
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transpoter: transpoter,
    renderTemplate: renderTemplate
}