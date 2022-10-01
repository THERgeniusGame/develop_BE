const jwt = require("jsonwebtoken");
require("dotenv").config();
const env = process.env;

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(" ");
    if (!req.headers.authorization) return res.send("Not-Login");
    if (tokenType !== "Bearer") return res.send("Not-Exist-Token");
    try {
      const userInfo = jwt.verify(tokenValue, env.SECRET_KEY);
      res.locals.userId = userInfo.userId;
      res.locals.nickname = userInfo.nickname;
      res.locals.win = userInfo.win;
      res.locals.lose = userInfo.lose;
      res.locals.total = userInfo.total;
    } catch (err) {
      if (err.name === "TokenExpiredError")
        throw res.status(400).json({ message: "expired-Token" });
  
      if (err.name === "JsonWebTokenError")
        throw res.status(400).json({ message: "expired-Token" });
    }
    next();

};