const jwt = require("jsonwebtoken");
const env = process.env;

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
    const [tokenType, tokenValue] = authorization.split(" ");

    if (tokenType !== "Bearer") next();
    try {
        const user = jwt.verify(tokenValue, env.SECRET_KEY);
        res.locals.userId = user.userId;
        res.locals.nickname = user.nickname;
        res.locals.win = user.win;
        res.locals.total = user.total;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") return res.status(400).json({ message: "토큰이 만료되었습니다." });

        if (err.name === "JsonWebTokenError") return res.status(400).json({ message: "유효하지 않은 토큰입니다." });
    }
    } else {
        next();
    }
    };