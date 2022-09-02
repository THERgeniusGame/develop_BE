const { Users } = require("../models");
const users = require("../models/users");


class UserRepository {

    signup = async (email, nickname, passwords, win, total) => {
        await Users.create({ email, nickname, password: passwords, win , total });
    };

    login = async (email) => {
        return await Users.findOne({ where: { email} });
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
    }
};

module.exports = UserRepository;