const express = require("express");
const router = express.Router();
const server = require('http').createServer(router);
const io = require('socket.io')(server);

const gameController=require("../controllers/playGame.controller")
const GameController=new gameController();
router.get('/socket', function(req, res) {
    res.sendFile(__dirname + '/static/index.html');
});
router.get("/:roomId",GameController.visitGame)

module.exports=router;