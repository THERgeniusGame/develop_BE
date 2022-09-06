const { error } = require("../middlewares/error");
const GameService=require("../../services/playGame.service.js")
let gameService=new GameService()
class Game{
    gameStart= async(io, socket,roomList) => {
        socket.on("gameStart", async() => {
            try{
                let userList=roomList[socket.index].userList;
                let owner=userList.find(ele=>ele.userId===roomList[socket.index].ownerId);
                let guest=userList.find(ele=>ele.userId!==roomList[socket.index].ownerId);
                await gameService.createGame(socket.room,owner,guest,"owner");
                io.to(socket.room).emit("gameStart",{turn:[owner.userId,guest.userId]})
            }catch(err){
                error(err,socket)
            }
        });
    }
    turnEnd=async(io,socket)=>{
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
    
    turnResult=async(io,socket)=>{
        socket.on("turnResult", async(data) => {
            
        })
    }

    gameEnd=async(io,socket)=>{
        socket.on("gameEnd", async(data) => {
            
        })
    }

}
module.exports = Game
