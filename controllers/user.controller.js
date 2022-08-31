const Userservice = require("../services/user.service");

class UserController {
    userService = new Userservice();
    
    signup = async (req, res, next) => {
        const { email, nickname, password, confirmPw } = req.body;
        const { authorization } = req.headers;
        try {
            const result = await this.userService.signup(email, nickname, password, confirmPw , authorization);
            return res.status(result.status).send(result.message);
        } catch(err) {
            next(err);
        }
    };
    

    login = async (req, res, next) => {
        const { email, password } = req.body;
        const { authorization } = req.headers;

        
        try {
            const result = await this.userService.login(email, password, authorization);
            if (result.status === 201) {
                return res.status(result.status).json(result.dete);
            }
            return res.status(result.status).json(result.message);
        } catch(err) {
            next(err);
        }
    };

    checkemail = async (req, res, next) => {
        const { email } = req.body;
        try {
            const result = await this.userService.checkemail(email);

            return res.status(result.status).json(result.message);
        } catch(err) {
            next(err);
        }
    };

    checknickname = async (req, res, next) => {
        const { nickname } = req.body;
        try {
            const result = await this.userService.checkemail(nickname);

            return res.status(result.status).json(result.message);
        } catch(err) {
            next(err);
        }
    };

    userinfo = async (req, res, next) => {
        const { userId, nickname, win, total } = res.locals;
        
        try {
            const headerinfo = await this.userService.userInfo(userId, nickname, win, total);

            return res.status(headerinfo.status).json(headerinfo.message);
        } catch (err) {
            next(err);
        }
    }

};

module.exports = UserController;