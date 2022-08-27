const router = express.require('express');
const server = require('http').createServer(router);
const io = require('socket.io')(server);

const gameController=require("../controllers/playGame.controller")

router.get("/:roomId",gameController.visitGame)

module.exports=router;