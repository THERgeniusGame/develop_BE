const Userservice = require("../services/user.service");

class UserController {
    userService = new Userservice();
    //회원가입
    signup = async (req, res, next) => {
        const { email, emailConfirm,nickname, password, confirmPw } = req.body;
        const { authorization } = req.headers;
        try {
            const result = await this.userService.signup(email,emailConfirm, nickname, password, confirmPw , authorization);
            return res.status(result.status).send(result.message);
        } catch(err) {
            next(err);
        }
    };
    
    //로그인
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
    //이메일중복확인
    checkemail = async (req, res, next) => {
        const { email } = req.body;
        try {
            const result = await this.userService.checkemail(email);
            
            return res.status(result.status).json({message:result.message,success:result.success});
        } catch(err) {
            next(err);
        }
    };
    //닉네임중복확인
    checknickname = async (req, res, next) => {
        const { nickname } = req.body;
        try {
            const result = await this.userService.checknickname(nickname);

            return res.status(result.status).json({message:result.message,success:result.success});
        } catch(err) {
            next(err);
        }
    };
    //비밀번호찾기
    changePw = async (req, res, next) => {
        const { email, emailConfirm, password, confirmPw } = req.body;
        try{
            const result = await this.userService.changePw(email,emailConfirm,password,confirmPw);

            return res.status(result.status).json({message:result.message,success:result.success});
        } catch(err){
            next(err);
        }
    };
    //로그인 한 유저정보
    userinfo = async (req, res, next) => {
        const { userId, nickname, win, lose, total } = res.locals;
        
        try {
            const headerinfo = await this.userService.userInfo(userId, nickname, win, lose, total);

            return res.status(headerinfo.status).json(headerinfo.message);
        } catch (err) {
            next(err);
        }
    };
    //회원탈퇴
    secession = async(req,res,next) => {
        const { comment } = req.body;
        const { userId } = res.locals;
        try{
            const outForm = await this.userService.secession(comment,userId);

            return res.status(outForm.status).json(outForm.message);
        } catch(err){
            next(err);
        }
    };
    
    //카카오로그인
    kakaologin = async (req, res, next) => {
        const { email, nickname,win, lose, total } = req.body;
        try {
            const result = await this.userService.kakaologin(email, nickname, win, lose, total);
            if (result.status === 201) {
                return res.status(result.status).json(result.data);
            }
            return res.status(result.status).send(result.message);
        } catch (err){
            next(err);
        }
    };

};

module.exports = UserController;