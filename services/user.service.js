const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
require("dotenv").config();
const env = process.env;

class UserService {
    userRepository = new UserRepository();

    //회원가입(이메일,이메일인증번호,닉네임,비밀번호,비밀번호확인값 필요)
    signup = async (
        email,
        emailConfirm,
        nickname,
        password,
        confirmPw,
        authorization
    ) => {
        try {
            if (authorization) {
                throw { status: 401, message: "Already-Login" };
            }
            if (
                !email ||
                !emailConfirm ||
                !nickname ||
                !password ||
                !confirmPw
            ) {
                throw { status: 400, message: "Bad-Request" };
            }
            if (password !== confirmPw) {
                throw { status: 400, message: "Check-ConfirmPw" };
            }
            const emailcode = await this.userRepository.checkEmailConfirm(
                email,
                emailConfirm
            );

            if (emailConfirm !== emailcode.code) {
                throw { status: 400, message: "Invalid-Verification-Code" };
            }
            const passwords = bcrypt.hashSync(password, 10);
            await this.userRepository.signup(email, nickname, passwords);
        } catch (err) {
            err.status = 400;
            throw err;
        }
        return { status: 201, message: "Signup-Done" };
    };
    //로그인(이메일,비밀번호 값 필요)
    login = async (email, password, authorization) => {
        const userInfo = await this.userRepository.login(email, password);
        if (authorization) {
            throw { status: 401, message: "Already-Login" };
        }
        if (!email || !password) {
            throw { status: 400, message: "Bad-Request" };
        }

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
                    lose: userInfo.lose,
                    total: userInfo.total,
                    kakao: userInfo.kakao,
                };
                const token = jwt.sign(payload, env.SECRET_KEY, {
                    expiresIn: "2h", //토큰 유효시간 2시간
                });
                return { status: 201, dete: token };
            }
        }
    };
    //이메일중복확인(이메일값 필요)
    checkemail = async (email) => {
        if (!email) {
            throw { status: 400, message: "Bad-Request", success: false };
        }
        const check = await this.userRepository.checkemail(email);
        if (check === null) {
            throw { status: 200, message: "Available-Email", success: true };
        }
        if (check.email === email) {
            throw { status: 400, message: "Exist-Email", success: false };
        }
    };
    //닉네임중복확인(닉네임값 필요)
    checknickname = async (nickname) => {
        if (!nickname) {
            throw { status: 400, message: "Bad-Request", success: false };
        }
        const checknn = await this.userRepository.checknickname(nickname);
        if (checknn === null) {
            throw { status: 200, message: "Available-Nickname", success: true };
        }
        if (checknn.nickname === nickname) {
            throw { status: 400, message: "Exist-Nickname", success: false };
        }
    };
    //비밀번호 변경(이메일,이메일인증번호,비밀번호,비밀번호확인 값 필요)
    changePw = async (email, emailConfirm, password, confirmPw) => {
        try {
            if (!password || !confirmPw) {
                throw { status: 400, message: "Bad-Request", success: false };
            }
            if (password !== confirmPw) {
                throw {
                    status: 400,
                    message: "inconsistent-value",
                    success: false,
                };
            }
            const emailcode = await this.userRepository.checkEmailConfirm(
                email,
                emailConfirm
            );
            if (emailConfirm !== emailcode.code) {
                throw { status: 400, message: "Invalid-Verification-Code" };
            }
            const passwords = bcrypt.hashSync(password, 10);
            await this.userRepository.changePw(email, passwords);
        } catch (err) {
            err.status = 400;
            throw err;
        }
        return { status: 201, message: "Change-success" };
    };
    //로그인한 유저 정보(userId값으로 닉네임,승리,패배,전적값 확인)
    userInfo = async (userId, nickname, win, lose, total) => {
        const loginUserInfo = { userId, nickname, win, lose, total };
        if (!loginUserInfo) {
            throw { status: 400, message: "Not-Login" };
        } else {
            return { status: 200, data: loginUserInfo };
        }
    };
    //회원탈퇴
    secession = async (comment, userId) => {
        const outFormcomment = "회원탈퇴";
        if (!comment) {
            throw { status: 400, message: "Bad-Request" };
        }
        if (comment !== outFormcomment) {
            throw { status: 400, message: "Bad-Input-Value" };
        }
        const usercheck = await this.userRepository.usercheck(userId);
        if (!usercheck) {
            throw { status: 400, message: "Not-Exist-User" };
        } else {
            await this.userRepository.secession(userId);
            return { status: 200, message: "secession-success" };
        }
    };
    //카카오로그인(카카오API에서 받은 이메일과 닉네임값으로 토큰발급)
    kakaologin = async (email, nickname) => {
        const password = env.KAKAO_PW;
        const userInfo = await this.userRepository.kakaologin(email, password);
        const emailcheck = await this.userRepository.checkemail(email);
        if(emailcheck !== null || emailcheck !== undefined){
          throw {status:400, message:"Email-signer"}
        }
        if (!userInfo) {
            const userInfo = await this.userRepository.kakaosignup(
                email,
                nickname,
                password
            );
            const payload = {
                userId: userInfo.userId,
                nickname: userInfo.nickname,
                win: userInfo.win,
                lose: userInfo.lose,
                total: userInfo.total,
                kakao: userInfo.kakao,
            };
            const token = jwt.sign(payload, env.SECRET_KEY, {
                expiresIn: "2h", //토큰 유효시간 2시간
            });
            return { status: 201, message: token };
        }
        if (userInfo.kakao === false) {
            throw { status: 400, message: "Email-signer" };
        } else {
            if (userInfo.nickname == nickname) {
                //프로필 변경은 업데이트 하지않음
                const payload = {
                    userId: userInfo.userId,
                    nickname: userInfo.nickname,
                    win: userInfo.win,
                    lose: userInfo.lose,
                    total: userInfo.total,
                };
                const token = jwt.sign(payload, env.SECRET_KEY);
                return { status: 201, message: token };
            } else {
                const userInfo = await this.userRepository.kakaoupdate(
                    email,
                    nickname,
                    password
                );
                const payload = {
                    userId: userInfo.userId,
                    nickname: userInfo.nickname,
                    win: userInfo.win,
                    lose: userInfo.lose,
                    total: userInfo.total,
                    kakao: userInfo.kakao,
                };
                const token = jwt.sign(payload, env.SECRET_KEY, {
                    expiresIn: "2h", //토큰 유효시간 2시간
            });
                return { status: 201, message: token };
            }
        }
    };

    //게임 종료후 승수와 횟수 증가
    upTotal = async (userId) => {
        const update = await this.userRepository.upTotal(userId);
        return update;
    };
    upWin = async (userId) => {
        const update = await this.userRepository.upWin(userId);
        return update;
    };
    uplose = async (userId) => {
        const update = await this.userRepository.uplose(userId);
        return update;
    };
}

module.exports = UserService;
