const { error } = require("../middlewares/error");
const GameService=require("../../services/playGame.service.js")
let gameService=new GameService()
class Game{
    constructor(io,socket,roomList){
        this.gameStart(io,socket,roomList);
        this.turnEnd(io,socket);
        this.gameEnd(io,socket)
    }
    gameStart= async(io, socket,roomList) => {
        socket.on("gameStart", async() => {
            try{
                let userList=roomList[socket.index].userList;
                let owner=userList.find(ele=>ele.userId===roomList[socket.index].ownerId);
                let guest=userList.find(ele=>ele.userId!==roomList[socket.index].ownerId);
                let createInfo=await gameService.createGame(socket.room,owner,guest);
                let turn=["owner","guest"]
                let gameInfo=await gameService.getGameInfo(socket.room,turn);
                io.to(socket.room).emit("gameStart",gameInfo)
            }catch(err){
                error(err,socket)
            }
        });
    }
    turnEnd=async(io,socket,roomList)=>{
        socket.on("turnEnd", async(data) => {
            try{
                let myTurn=data.turn.shift()
                let turn=data.turn
                turn.push(myTurn);
                let player=data.player;
                let batting=data.batting;
                let card=data.card;
                if(player===undefined || batting===undefined || card===undefined){
                    let err=new Error("BAD_REQUEST");
                    throw(err)
                }
                if(turn==="owner"){
                    if(roomList[socket.index].ownerId!==player.userId){
                        return io.to(player.socketId).emit("err",{
                            msg:"NOT_YOUR_TURN"
                        });
                    }
                }else{
                    if(roomList[socket.index].ownerId===player.userId){
                        return io.to(player.socketId).emit("err",{
                            msg:"NOT_YOUR_TURN"
                        });
                    }
                }
                await gameService.setBatting(socket.room,batting)
                await gameService.setUseCard(socket.room,player,card,myTurn)
                let gameInfo=await gameService.getGameInfo(socket.room,turn);
                io.to(socket.room).emit("turnEnd",gameInfo)
                if(gameInfo.round===gameInfo.owner.battingCards.length && gameInfo.round===gameInfo.guest.battingCards.length){
                    let update=await gameService.setResultInfo(socket.room,gameInfo.round,gameInfo.owner,gameInfo.guest);
                    let result=await gameService.getGameInfo(roomId,turn);
                    io.to(socket.room).emit("turnResult",result)
                }
            }catch(err){
                error(err,socket)
            }
        });
    }

    gameEnd=async(io,socket)=>{
        socket.on("gameEnd", async(data) => {
            let result=gameService.EndGame(data.owner,data.guest);
            io.to(socket.room).emit("turnEnd",{
                winner:result.winner,
                loser:result.loser,
            })
        })
    }

}
module.exports = Game
