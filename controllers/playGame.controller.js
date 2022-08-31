const Service=require("../services/playGame.service")

class PlayGameController{
    service=new Service();
    visitGame=async(req,res,next)=>{
        const {roomId}=req.params
        const info=await this.service.getRoomInfo(roomId);
        return res.json({info});
    }
}

module.exports=PlayGameController