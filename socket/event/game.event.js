const { error } = require("../middlewares/error");
const GameService=require("../../services/playGame.service.js")
const ChatLogsService=require("../../services/chatLogs.service");
const chatLogsService=new ChatLogsService();
let gameService=new GameService()
class Game{
    constructor(io,socket,roomList){
        this.ready(io,socket,roomList)
        this.gameStart(io,socket,roomList);
        this.turnEnd(io,socket,roomList);
        //대비용 이벤트
        this.turnResult(io,socket)
        this.gameEnd(io,socket)
        this.setting(io,socket)
    }
    ready=async(io,socket,roomList)=>{
        socket.on("ready",async(data)=>{
            try{
                const index = roomList.findIndex((ele) => ele.roomId == socket.room);
                if(data.ready && roomList[index].ready==0){
                    roomList[index].ready++;
                    io.to(socket.room).emit("ready",{ready:true})
                }else if(!data.ready && roomList[index].ready==1){
                    roomList[index].ready--;
                    io.to(socket.room).emit("ready",{ready:false})
                }else{
                    return;
                }
            }catch(err){
                error(err,io,socket)
            }

        })
    }
    gameStart= async(io, socket,roomList) => {
        socket.on("gameStart", async(data) => {
            try{
                const index = roomList.findIndex((ele) => ele.roomId == socket.room);
                if(roomList[index].ready!==1){
                    throw("None-Ready")
                }
                let userList=await roomList[index].userList;
                let owner=await userList.find(ele=>ele.userId===data.userId);
                let guest=await userList.find(ele=>ele.userId!==data.userId);
                
                let createInfo=await gameService.createGame(socket.room,owner,guest);
                socket.gameId=createInfo.gameId;
                

                io.to(socket.room).emit("setting",{gameId:socket.gameId})

                let turn=gameService.randomTurn();

                let gameInfo=await gameService.getGameInfo(socket.gameId,turn);
                let ownerInfo=await gameInfo.owner;
                let guestInfo=await gameInfo.guest;
                ownerInfo.turn=turn
                ownerInfo.ownerId=await roomList[index].ownerId
                guestInfo.turn=turn
                guestInfo.ownerId=await roomList[index].ownerId

                io.to(owner.socketId).emit("gameStart_user",ownerInfo)
                io.to(guest.socketId).emit("gameStart_user",guestInfo)

                gameInfo.userId=roomList[index].ownerId
                io.to(socket.room).emit("gameStart_room",gameInfo)
            }catch(err){
                error(err,io,socket)
            }
        });
    }
    setting=async(io,socket)=>{
        socket.on("setting",(data)=>{
            try{
                socket.gameId=data.gameId
            }catch(err){
                error(err,socket)
            }
        })
    }
    turnEnd=async(io,socket,roomList)=>{
        socket.on("turnEnd", async(data) => {
            ("event:turnEnd")
            try{
                let turn=await data.turn;
                let player=await data.player;
                let batting=await data.batting;
                let card=await data.card;
                let ownerId=roomList[socket.index].ownerId
                let myTurn=turn.shift();
                turn.push(myTurn);
                if(!player || !batting || card==undefined){
                    throw("Bad-Request")
                }
                
                let checkOwner=await ownerId!==player.userId
                if(myTurn==="owner"){
                    if(checkOwner){
                        throw("Not-Your-Turn")
                    }
                }else{
                    if(!checkOwner){
                        throw("Not-Your-Turn")
                    }
                }

                await gameService.setBatting(socket.gameId,batting)
                await gameService.setUseCard(socket.gameId,player,card,myTurn)
                let gameInfo=await gameService.getGameInfo(socket.gameId,turn);
                gameInfo.userId=data.userId;

                if(gameInfo.owner.userId===player.userId){
                    io.to(socket.id).emit("turnEnd_user",gameInfo.owner)
                }else{
                    io.to(socket.id).emit("turnEnd_user",gameInfo.guest)
                }

                io.to(socket.room).emit("turnEnd_room",gameInfo)

                if(gameInfo.round===gameInfo.owner.battingCards.length && gameInfo.round===gameInfo.guest.battingCards.length){
                    let update=await gameService.setResultInfo(socket.gameId,gameInfo.round);
                    if(update===0){
                        throw("Err-Update-Result")
                    }

                    turn.reverse();

                    let resultRound=await gameService.getGameInfo(socket.gameId,turn);

                    if(resultRound.owner.result.at(-1)!=="draw"){
                        resultRound.winner=resultRound.owner.result.at(-1)==="win"?resultRound.owner.nickname:resultRound.guest.nickname
                    }
                    io.to(socket.room).emit("turnResult",resultRound)
                }

            }catch(err){
                error(err,io,socket)
            }
        });
    }
    turnResult=(io,socket)=>{
        socket.on("turnResult",async(data)=>{
            let result=await gameService.getGameInfo(socket.gameId,data.turn);
            io.to(socket.room).emit("turnResult",result)
        })
    }
    gameEnd=async(io,socket)=>{
        try{
            socket.on("gameEnd", async(data) => {
                if(data.name!==undefined){
                    let result=await gameService.surrenderGame(data.name,data.owner,data.guest);
                    io.to(data.owner.socketId).emit("gameEnd",{
                        winner:result.winner,
                        loser:result.loser,
                    })
                    io.to(data.guest.socketId).emit("gameEnd",{
                        winner:result.winner,
                        loser:result.loser,
                    })
                    return;
                }else{
                    let result=await gameService.EndGame(data.owner,data.guest);
                    io.to(data.owner.socketId).emit("gameEnd",{
                        winner:result.winner,
                        loser:result.loser,
                    })
                    io.to(data.guest.socketId).emit("gameEnd",{
                        winner:result.winner,
                        loser:result.loser,
                    })
                    return;
                }
            })
        }catch(err){
            error(err,io,socket)
        }   
    }

}
module.exports = Game
