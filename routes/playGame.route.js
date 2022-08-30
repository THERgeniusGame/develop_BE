const express = require("express");
const router = express.Router();

const gameController=require("../controllers/playGame.controller")
const GameController=new gameController();
router.get('/:roomId', GameController.visitGame);

module.exports=router;