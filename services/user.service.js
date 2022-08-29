const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/user.repository");
const bcrypt = require('bcrypt');
require("dotenv").config();
const env = process.env;

class UserService {
    userRepository = new UserRepository();


    signup = async (email, nickname, password, confirmPw, authorization) => {
        if (authorization) {
          return { status: 401, message: "로그인 되어 있습니다." };
        };
        if (!email || !nickname || !password ||!confirmPw ) {
          return { status: 400, message: "모두 입력하세요." };
        };
        if (password !== confirmPw){
            return { status: 400, message: "비밀번호와 비밀번호 확인값이 다릅니다."};
        };
        const passwords = bcrypt.hashSync(password, 10);
        try {
          await this.userRepository.signup(email, nickname, passwords );
        } catch(err) {
          err.status=400
          throw(err)
        };
        return { status: 201, message: "회원가입이 완료되었습니다." };
      };

      login = async (email, password, authorization) => {
        const userInfo = await this.userRepository.login(email,password);
        if (authorization) {
          return { status: 401, message: "로그인 되어 있습니다." };
        };
        console.log(password)
        if (!email || !password) {
          return { status: 400, message: "모두 입력하세요." };
        };
        
        if (!userInfo) {
          return { status: 400, message: "아이디 혹은 비밀번호가 일치하지 않습니다." };
        } else {
          const isSame = bcrypt.compareSync(password, userInfo.password);
          if (!isSame) {
            return { status: 400, message: "아이디 혹은 비밀번호가 일치하지 않습니다." };
          } else {
            const payload = {
              userId: userInfo.userId,
              nickname: userInfo.nickname,
            };
            const token = jwt.sign(payload, env.SECRET_KEY,{
              expiresIn: '7d', //1분
            });
            return { status: 201, dete: token };
          };
        };
      };

      checkemail = async (email) => {
        if (!email) {
          return { status: 400, message: "입력값이 비어 있습니다." };
        };
        const check = await this.userRepository.checkemail(email);
        if (check) {
          return { status: 400, message: "중복된 이메일입니다." };
        } else {
          return { status: 200, message: "사용가능한 이메일 입니다." };
        };
      };

      checknickname = async (nickname) => {
        if(!nickname){
            return { status: 400, message: "입력값이 비어 있습니다."};
        };
        const checknn = await this.userRepository.checknickname(nickname);
        if(checknn) {
            return { status: 400, message: "중복된 닉네임입니다."};
        } else {
            return { satus: 400, message: "사용 가능한 닉네임 입니다."};
        };
      };
};

module.exports = UserService;