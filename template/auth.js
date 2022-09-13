const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const { nextTick } = require('process');
var appDir = path.dirname(require.main.filename);


router.post('/', async(req, res) => {
    let authNum = Math.random().toString().substr(2,6);
    let emailTemplete;
    ejs.renderFile(appDir+'/template/authMail.ejs', {authCode : authNum}, function (err, data) {
      if(err){console.log(err)}
      emailTemplete = data;
    });
    try {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
    });

    let mailOptions = {
        from: `덜지니어스`,
        to: req.body.email,
        subject: '덜지니어스 회원가입 인증번호입니다.',
        html: emailTemplete,
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        console.log("Finish sending email : " + info.response);
        res.send(authNum);
        transporter.close()
    });
} catch(err) {
    next(err);
}
});

module.exports=router;