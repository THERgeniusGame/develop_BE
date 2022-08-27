const router = express.require('express');

const PlayGame=require("./playGame")

router.use("/room",PlayGame)

module.exports=router;