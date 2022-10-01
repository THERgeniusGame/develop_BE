const jwt = require("jsonwebtoken");
require("dotenv").config();
const err = require("./error");
const UserRepository = require("../repositories/user.repository");
const env = process.env;

module.exports = async(req, res, next) => {
    const userRepository = new UserRepository();
    if (!req.headers.authorization) {
      throw {status:400, message:"Not-Login"}
    }
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = (authorization||"").split(" ");
    try {
    if (tokenType !== "Bearer") return res.send("Not-Exist-Token");
    
      const userInfo = jwt.verify(tokenValue, env.SECRET_KEY);
      const usercheck = await userRepository.usercheck(userInfo.userId);
      console.log(usercheck)
      if(!usercheck){
        throw {status:400, message:"Not-Exist-User"}
      }else{
      res.locals.userId = userInfo.userId;
      res.locals.nickname = userInfo.nickname;
      res.locals.win = userInfo.win;
      res.locals.lose = userInfo.lose;
      res.locals.total = userInfo.total;
      }
    } catch (err) {
      next(err)
    }
    next();

};