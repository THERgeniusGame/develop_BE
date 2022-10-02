const jwt = require("jsonwebtoken");
require("dotenv").config();
const err = require("./error");
const UserRepository = require("../repositories/user.repository");
const env = process.env;

module.exports = async(req, res, next) => {
  try {
    const userRepository = new UserRepository();
    const { authorization } = req.headers;
    if (authorization===null || authorization=== undefined) {
      throw {status:400, message:"Not-Login"}
    }
    const [tokenType, tokenValue] = (authorization||"").split(" ");
    if (tokenType !== "Bearer") return res.send("Not-Exist-Token");
    
      const userInfo = jwt.verify(tokenValue, env.SECRET_KEY);

      const usercheck = await userRepository.usercheck(userInfo.userId);
      if(!userInfo.userId){
        throw { status:400, message:"Wrong-Approach"}
      }
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