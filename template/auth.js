const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const { Emails } = require("../models");
const { nextTick } = require('process');
var appDir = path.dirname(require.main.filename);


router.post('/', async(req, res, next) => {
    const email = req.body;
    const authNum = Math.random().toString().substr(2,6);
    let emailTemplete;
    ejs.renderFile(appDir+'/template/authMail.ejs', {authCode : authNum}, function (err, data) {
      if(err){console.log(err)}
      emailTemplete = data;
    });
    try {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
    });

    const mailOptions = {
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
    
    const confirmEamil = await Emails.findOne({where:{email}})
    // console.log(email)
    // if(confirmEamil){
    //     await Emails.update({code:authcode},{where:email})
    // } else{
    //     await Emails.create({email,code:authcode})
    // }
} catch(err) {
    next(err);
}
});

module.exports=router;