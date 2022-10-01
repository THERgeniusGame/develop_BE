const { Users } = require("../models");
const { Emails } = require("../models")


class UserRepository {

    signup = async (email, nickname, passwords, win, lose, total) => {
        await Users.create({ email, nickname, password: passwords, win ,lose, total, kakao:"false" });
    };

    login = async (email) => {
        return await Users.findOne({ where: { email, kakao:"false"} });
    };
    
    checkemail = async (email) => {
        return await Users.findOne({ where: { email } });
    };

    checknickname = async (nickname) => {
        return await Users.findOne({ where: { nickname } });
    }; 

    changePw = async(email,passwords) => {
       return await Users.update({password:passwords},{where:{email}})
    };

    getUserInfo = async (userId)=>{
        return await Users.findOne({ 
            where: { userId } ,
            raw:true,
        });
    };

    secession = async(userId) =>{
        return await Users.destroy({where:{userId}})
    }
    
    checkEmailConfirm = async (email,emailConfirm) => {
        return await Emails.findOne({where:{email}})
    }

    kakaologin = async (email, password) => {
        return await Users.findOne({ where: { email, password, kakao:"true" } });
    };

    kakaosignup = async (email, nickname, password, win, lose, total) => {
        await Users.create({ email, nickname, password, win, lose, total, kakao:"true" });
        return await Users.findOne({ where: { email, password, kakao:"true" } });
    };

    kakaoupdate = async (email, nickname, password) => {
        await Users.update({nickname},{where: { email, password, kakao:"true" }});
        return await Users.findOne({ where: { email, password, kakao:"true" } });
    };

    upWin = async(userId)=>{
        const user = await Users.findOne({
            where:{
                userId:userId
            }
        });
        const up = await user.increment("win", { by: 1 });
        return up;
    }
    upTotal = async(userId)=>{
        const user = await Users.findOne({
            where:{
                userId:userId
            }
        });
        const up = await user.increment("total", { by: 1 });
        return up;
    }
    uplose=async(userId)=>{
        const user = await Users.findOne({
            where:{
                userId:userId
            }
        });
        const up = await user.increment("lose", { by: 1 });
        return up;
    }
};

module.exports = UserRepository;