const express = require("express");
const router = express.Router();

const PlayGame=require("./playGame.route")
const userRoter = require("./user.router");
const roomRouter = require("./room.router");

router.use("/user", userRoter);
router.use("/room", [roomRouter,PlayGame]);

module.exports = router;

