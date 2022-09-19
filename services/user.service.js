const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/user.repository");
const bcrypt = require('bcrypt');
require("dotenv").config();
const env = process.env;

class UserService {
    userRepository = new UserRepository();


    signup = async (email, nickname, password, confirmPw, authorization) => {
        if (authorization) {
          throw { status: 401, message: "Already-Login" };
        };
        if (!email || !nickname || !password ||!confirmPw ) {
          throw { status: 400, message: "Bad-Request" };
        };
        if (password !== confirmPw){
            throw { status: 400, message: "Check-ConfirmPw"};
        };
        const passwords = bcrypt.hashSync(password, 10);
        try {
          await this.userRepository.signup(email, nickname, passwords );
        } catch(err) {
          err.status=400
          throw(err)
        };
        return { status: 201, message: "Signup-Done" };
      };

      login = async (email, password, authorization) => {
        const userInfo = await this.userRepository.login(email,password);
        if (authorization) {
          throw { status: 401, message: "Already-Login" };
        };
        console.log(password)
        if (!email || !password) {
          throw { status: 400, message: "Bad-Request" };
        };
        
        if (!userInfo) {
          throw { status: 400, message: "Check-EmailorPw" };
        } else {
          const isSame = bcrypt.compareSync(password, userInfo.password);
          if (!isSame) {
            throw { status: 400, message: "Check-EmailorPw" };
          } else {
            const payload = {
              userId: userInfo.userId,
              nickname: userInfo.nickname,
              win: userInfo.win,
              total: userInfo.total,
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
          throw { status: 400, message: "Bad-Request" , success: false};
        };
        const check = await this.userRepository.checkemail(email);
        if(check === null){
          throw  { status: 200, message: "Available-Email", success: true };
        }
        if (check.email===email) {
          throw { status: 400, message: "Exist-Email", success: false };
        } 
      };

      checknickname = async (nickname) => {
        if(!nickname){
            throw { status: 400, message: "Bad-Request",success: false};
        };
        const checknn = await this.userRepository.checknickname(nickname);
        if(checknn === null){
          throw { status: 200, message: "Available-Nickname", success: true};
        }
        if(checknn.nickname===nickname) {
            throw { status: 400, message: "Exist-Nickname", success: false};
        }
      };

      userInfo = async (userId, nickname, win, total) => {
        const loginUserInfo = {userId, nickname, win, total};
        if(!loginUserInfo) {
          throw { status: 400, message:"Not-Login"};
        } else {
          return {status: 200, data: loginUserInfo}
        }
       };

       kakaologin = async (email, nickname) => {
        const password = env.KAKAO_PW;
        const userInfo = await this.userRepository.kakaologin(email, password);
        if (!userInfo){
            const userInfo = await this.userRepository.kakaosignup(email, nickname, password);
            const payload = {
              userId: userInfo.id,
              nickname: userInfo.nickname,
            };//유효 시간 
            const token = jwt.sign(payload, env.SECRET_KEY);
            return { status: 201, data: token };
        }else{
            if( userInfo.nickname == nickname ){//프로필 변경은 업데이트 하지않음
            const payload = {
              userId: userInfo.id,
              nickname: userInfo.nickname,
            };//유효 시간 
            const token = jwt.sign(payload, env.SECRET_KEY);
            return { status: 201, data: token };
            }else{
              const userInfo = await this.userRepository.kakaoupdate(email, nickname, password)
              const payload = {
                userId: userInfo.id,
                nickname: userInfo.nickname,
              };//유효 시간 
              const token = jwt.sign(payload, env.SECRET_KEY);
              return { status: 201, dete: token };
            };
    
        };
      };

       //게임 종료후 승수와 횟수 증가
      upTotal = async(userId)=>{
        const update= await this.userRepository.upTotal(userId);
        return update;
       }
      upWin = async(userId)=>{
        const update= await this.userRepository.upWin(userId);
        return update;
       }
};

module.exports = UserService;