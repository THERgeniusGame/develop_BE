const express = require("express");
const router = express.Router();


const userRoter = require("./user.router");
const roomRouter = require("./room.router");


router.use("/user", userRoter);
router.use("/room", roomRouter);


module.exports = router;

