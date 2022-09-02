const jwt = require("jsonwebtoken");
require("dotenv").config();
const env = process.env;

module.exports = (req, res, next) => {
    if (!req.headers.authorization) return res.send("로그인이 되어있지 않습니다.");
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(" ");
    if (tokenType !== "Bearer") return res.send("존재하지 않는 정보이거나 로그인되어 있지 않습니다.");
    try {
      const userInfo = jwt.verify(tokenValue, env.SECRET_KEY);
      res.locals.userId = userInfo.userId;
      res.locals.nickname = userInfo.nickname;
    } catch (err) {
      if (err.name === "TokenExpiredError")
        return res.status(400).json({ message: "토큰이 만료되었습니다." });
  
      if (err.name === "JsonWebTokenError")
        return res.status(400).json({ message: "유효하지 않은 토큰입니다." });
    }
    next();

};