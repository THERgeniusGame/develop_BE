const { error } = require("../middlewares/error");
const GameService=require("../../services/playGame.service.js")
let gameService=new GameService()
class Game{
    GameStart= async(io, socket,roomList) => {
        socket.on("gamestart", async() => {
            try{
                let userList=roomList[socket.index].userList;
                let owner=userList.find(ele=>ele.userId===roomList[socket.index].ownerId);
                let guest=userList.find(ele=>ele.userId!==roomList[socket.index].ownerId);
                let createInfo=await gameService.createGame(socket.room,owner,guest,"owner");
                io.to(socket.room).emit("game",{create:createInfo})
            }catch(err){
                error(err,socket)
            }
        });
    }
    TurnEnd=async(io,socket)=>{
        socket.on("turnEnd", async(data) => {
            try{
                let owner=data.turnEnd.owner
                let guest=data.turnEnd.guest
                let batting=owner.batting;
                let result=await gameService.setBatting(socket.room,data.batting);
                if(result){
                    io.to(socket.room).emit("batting",{msg:"succes"});
                }else{
                    const err=new Error("FALID_BATTING")
                    err.status=405;
                    throw(err)
                }

            }catch(err){
                error(err,socket)
            }
        });
    }
    

}
module.exports = Game
