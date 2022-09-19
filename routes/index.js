const express = require("express");
const router = express.Router();

const PlayGame = require("./playGame.route");
const userRoter = require("./user.router");
//const mypageRouter = require("./mypage.router");
const roomRouter = require("./room.router");
const mailRouter = require("../template/auth");
const reportRouter=require("./report.route");

router.use("/user", [userRoter/*, mypageRouter*/]);
router.use("/room", [roomRouter, PlayGame]);
router.use("/report",reportRouter)
router.use("/mail", mailRouter);

module.exports = router;
