const fs =require("fs");
const rfs = require("rotating-file-stream").createStream;;
const path = require("path");

const logDirectry=path.join(__dirname, "../production_logs");
fs.existsSync(logDirectry)||fs.mkdirSync(logDirectry);

const accessLogStream=rfs('access.log',{
    interval:'1d',
    path:logDirectry,

});


const devlopment={
    name:'devlopment',
    assets_path:"/assets",
    db:"codeial_development",
    session_cookie_key:"blahsomething",
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'zadafiyajay4@gmail.com',
            pass: 'zlcvjpkytrvldnfj',

        }
    },
    google_client_id: "672098762359-0evlr6vod6qp88f4djkeoghniguapu0d.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_Url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: "codeial",
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }

}

const production={
    name:"production",
    assets_path: process.env.CODEIAL_ASSET_PATH,
    db: 'codeial_production',
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD,

        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callback_Url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: { stream: accessLogStream }
    }

}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? devlopment : eval(process.env.CODEIAL_ENVIRONMENT);
// module.exports=devlopment


// CODEIAL_ASSET_PATH=/assets
// CODEIAL_DB=mongodb+srv://zadafiyajay2:HYXk63r0ukDejcSrcluster0.qvyojwi.mongodb.net/?retryWrites=true&w=majority
// CODEIAL_JWT_SECRET=V7DYUbgBSInkNIMdppOBrBULb2c0u5KI
// CODEIAL_SESSION_COOKIE_KEY= 3IzQxjqBxyrjCNDnLqUrEBTnFpJu1S3L
// CODEIAL_GMAIL_USERNAME=zadafiyajay4@gmail.com
// CODEIAL_GMAIL_PASSWORD=zlcvjpkytrvldnfj
// CODEIAL_GOOGLE_CLIENT_ID=672098762359-0evlr6vod6qp88f4djkeoghniguapu0d.apps.googleusercontent.com
// CODEIAL_GOOGLE_CLIENT_SECRET=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
// CODEIAL_GOOGLE_CALLBACK_URL=http://codeial.com/users/auth/google/callback