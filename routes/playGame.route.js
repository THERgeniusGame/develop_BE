const express = require("express");
const router = express.Router();

const gameController = require("../controllers/playGame.controller");
const GameController = new gameController();
router.get("/testCode/:roomId", function (req, res) {
  res.sendFile(__dirname + "/static/index.html");
});
router.get("/testCode2/:roomId", function (req, res) {
  res.sendFile(__dirname + "/static/index3.html");
});
router.get("/:roomId", GameController.visitGame);
//상세방입장 비번 확인
router.post("/:roomId", GameController.checkPw);

module.exports = router;
