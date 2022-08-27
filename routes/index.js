const express = require("express");
const router = express.Router();

const roomRouter = require("./room.route");

router.use("/room", roomRouter);

module.exports = router;
