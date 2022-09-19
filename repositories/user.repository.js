const { Users } = require("../models");



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

    getUserInfo = async (userId)=>{
        return await Users.findOne({ 
            where: { nickname } ,
            raw:true,
        });
    };

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
    
};

module.exports = UserRepository;