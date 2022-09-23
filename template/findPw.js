const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const { Users } = require("../models");
var appDir = path.dirname(require.main.filename);


router.post('/', async(req, res, next) => {
    try{
    const { email } = req.body;
    const  emailcheck =  await Users.findOne({ where: { email } });
 
    if (emailcheck === null){
        throw { status:400, message:"No-registered-information", success: false };
    }
    if(emailcheck.email === email){
    const authNum = Math.random().toString().substr(2,6);
    let emailTemplete;
    ejs.renderFile(appDir+'/template/findPwMail.ejs', {authCode : authNum}, function (err, data) {
      if(err){console.log(err)}
      emailTemplete = data;
    });
    
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
        subject: '덜지니어스 비밀번호 찾기 인증번호입니다.',
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
}} catch(err) {
    next(err);
}
});

module.exports=router;