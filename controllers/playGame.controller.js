class PlayGameController{
    visitGame=async(req,res,next)=>{
        const roomId=req.params
        const userId=1;
        res.sendFile(__dirname + '/static/index.html');
    }
}

module.exports=PlayGameController