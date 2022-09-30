const express = require("express");
const router = express.Router();

const PlayGame = require("./playGame.route");
const userRoter = require("./user.router");
const rankRouter = require("./rank.router");
const roomRouter = require("./room.router");
const mailRouter = require("../template/auth");
const reportRouter = require("./report.route");
const findPwRouter = require("../template/findPw");
//회원 관련 라우터(회원가입,로그인)
router.use("/user", userRoter);
router.use("/room", [roomRouter, PlayGame]);
router.use("/rank", rankRouter);
router.use("/report", reportRouter);
//이메일 인증 라우터
router.use("/mail", mailRouter);
//비밀번호 찾기 라우터
router.use("/findPw", findPwRouter);

module.exports = router;
