const express = require("express");
const router = express.Router();


const userRoter = require("./user.router");
const roomRouter = require("./room.router");
const mailRouter = require("../template/auth");

router.use("/user", userRoter);
router.use("/room", roomRouter);
router.use("/mail", mailRouter);

module.exports = router;

