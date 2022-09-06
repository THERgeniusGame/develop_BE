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
                let msg={
                    owner:createInfo.owner,
                    guest:createInfo.guest,
                    turn:["owner","guest"],
                }
                socket.turn=[owner.userId,guest.userId];
                io.to(socket.room).emit("gameStart",msg)
            }catch(err){
                error(err,socket)
            }
        });
    }
    turnEnd=async(io,socket)=>{
        socket.on("turnEnd", async(data) => {
            try{
                let turn=socket.turn.shift()
                socket.turn.push(turn);
                let player=data.player;
                let batting=data.batting;
                let card=data.card;
                await gameService.setBatting(socket.room,batting)
                await gameService.setUseCard(socket.room,player,card,turn)
                let gameInfo=await gameService.getGameInfo(socket.room);
                if(gameInfo.round===gameInfo.owner.battingCards.length && gameInfo.round===gameInfo.guest.battingCards.length){
                    let result=await gameService.setResultInfo(socket.room,gameInfo.round,gameInfo.owner,gameInfo.guest);
                    io.to(socket.room).emit("turnResult",result)
                }else{
                    io.to(socket.room).emit("turnEnd",gameInfo)
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
