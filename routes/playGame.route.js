const express = require("express");
const router = express.Router();

const gameController=require("../controllers/playGame.controller")
const GameController=new gameController();
router.get('/:roomId', function(req, res) {
    res.sendFile(__dirname + '/static/index.html');
});
router.post("/:roomId",GameController.visitGame)

module.exports=router;