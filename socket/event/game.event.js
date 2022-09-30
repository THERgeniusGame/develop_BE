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
                
                let turn=gameService.randomTurn();

                let createInfo=await gameService.createGame(socket.room,turn,owner,guest);
                socket.gameId=createInfo.gameId;
                

                io.to(socket.room).emit("setting",{gameId:socket.gameId})



                let gameInfo=await gameService.getGameInfo(socket.gameId);
                let ownerInfo=await gameInfo.owner;
                let guestInfo=await gameInfo.guest;
                ownerInfo.turn=gameInfo.turn
                ownerInfo.ownerId=await roomList[index].ownerId
                guestInfo.turn=gameInfo.turn
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
                let player=await data.player;
                let batting=await data.batting;
                let card=await data.card;
                let ownerId=roomList[socket.index].ownerId
                if(!player || !batting || card==undefined){
                    throw("Bad-Request")
                }

                let turn=(await gameService.getGameInfo(socket.gameId)).turn[0];
                let checkOwner=await ownerId!==player.userId
                if(turn==="owner"){
                    if(checkOwner){
                        throw("Not-Your-Turn")
                    }
                }else{
                    if(!checkOwner){
                        throw("Not-Your-Turn")
                    }   
                }

                //턴바꾸기
                let myTurn=(await gameService.turnUpdate(socket.gameId)).turn
                
                await gameService.setBatting(socket.gameId,batting)
                await gameService.setUseCard(socket.gameId,player,card,myTurn)
                let gameInfo=await gameService.getGameInfo(socket.gameId);
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

                    let resultRound=await gameService.getGameInfo(socket.gameId);

                    if(resultRound.owner.result.at(-1)!=="draw"){
                        resultRound.winner=resultRound.owner.result.at(-1)==="win"?resultRound.owner.nickname:resultRound.guest.nickname
                    }
                    io.to(socket.room).emit("turnResult",resultRound)
                    if(resultRound.round===11){
                        let result=await gameService.EndGame(resultRound.owner,resultRound.guest);
                        io.to(socket.room).emit("gameEnd",{
                            winner:result.winner,
                            loser:result.loser,
                        })
                        await gameService.EndGameWinLose(resultRound.owner,resultRound.guest);
                        await gameService.setResultInfo(socket.gameId,resultRound.round);
                        return;
                    }
                }
            }catch(err){
                error(err,io,socket)
            }
        });
    }
    turnResult=(io,socket)=>{
        socket.on("turnResult",async(data)=>{
            let result=await gameService.getGameInfo(socket.gameId);
            io.to(socket.room).emit("turnResult",result)
        })
    }
    gameEnd=async(io,socket)=>{
        try{
            socket.on("gameEnd", async(data) => {
                if(data.name!==undefined){
                    let result=await gameService.surrenderGame(data.name,data.owner,data.guest);
                    io.to(socket.room).emit("gameEnd",{
                        winner:result.winner,
                        loser:result.loser,
                    })
                }else{
                    let result=await gameService.EndGame(data.owner,data.guest);
                    io.to(socket.room).emit("gameEnd",{
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
