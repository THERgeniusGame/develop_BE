const { error } = require("../middlewares/error");
const GameService=require("../../services/playGame.service.js")
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
            console.log("event:ready")
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
            }catch(error){
                error(error,io,socket)
            }

        })
    }
    gameStart= async(io, socket,roomList) => {
        socket.on("gameStart", async() => {
            console.log("event:gameStart")
            try{
                const index = roomList.findIndex((ele) => ele.roomId == socket.room);
                if(roomList[index].ready!==1){
                    let err=new Error("NONE_READY");
                    throw(err)
                }
                let userList=roomList[index].userList;
                console.log(roomList[index])
                console.log(userList)
                let owner=await userList.find(ele=>ele.userId===roomList[index].ownerId);
                let guest=await userList.find(ele=>ele.userId!==roomList[index].ownerId);
                console.log(owner,guest)
                let createInfo=await gameService.createGame(socket.room,owner,guest);
                socket.gameId=createInfo.gameId;
                io.to(socket.room).emit("setting",{gameId:socket.gameId})
                let turn=gameService.randomTurn();
                let gameInfo=await gameService.getGameInfo(socket.gameId,turn);
                io.to(socket.room).emit("gameStart",gameInfo)
            }catch(err){
                error(err,io,socket)
            }
        });
    }
    setting=async(io,socket)=>{
        socket.on("setting",(data)=>{
            console.log("event:setting")
            try{
                socket.gameId=data.gameId
            }catch(err){
                error(err,socket)
            }
        })
    }
    turnEnd=async(io,socket,roomList)=>{
        socket.on("turnEnd", async(data) => {
            console.log("event:turnEnd")
            try{
                const index = roomList.findIndex((ele) => ele.roomId == socket.room);
                let turn=await data.turn;
                let player=data.player;
                let batting=data.batting;
                let card=data.card;

                let myTurn=turn.shift();
                turn.push(myTurn);
                
                if(!player || !batting || card==undefined){
                    let err=new Error("BAD_REQUEST");
                    throw(err)
                }
                
                let checkOwner=roomList[index].ownerId!==player.userId
                if(myTurn==="owner"){
                    if(checkOwner){
                        throw(new Error("NOT_YOUR_TURN"))
                    }
                }else{
                    if(!checkOwner){
                        throw(new Error("NOT_YOUR_TURN"))
                    }
                }

                await gameService.setBatting(socket.gameId,batting)
                await gameService.setUseCard(socket.gameId,player,card,myTurn)
                let gameInfo=await gameService.getGameInfo(socket.gameId,turn);
                io.to(socket.room).emit("turnEnd",gameInfo)
                if(gameInfo.round===gameInfo.owner.battingCards.length && gameInfo.round===gameInfo.guest.battingCards.length){
                    let update=await gameService.setResultInfo(socket.gameId,gameInfo.round);
                    if(update===0){
                        throw(new Error("Err-Update-Result"))
                    }
                    turn.reverse();
                    let resultRound=await gameService.getGameInfo(socket.gameId,turn);
                    console.log(resultRound.owner.result.at(-1))
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
            console.log("event:turnEnd")
            let result=await gameService.getGameInfo(socket.gameId,data.turn);
            io.to(socket.room).emit("turnResult",result)
        })
    }
    gameEnd=async(io,socket)=>{
        try{
            socket.on("gameEnd", async(data) => {
                console.log("event:gameEnd")
                if(data.name!==undefined){
                    let result=await gameService.surrenderGame(data.name,data.owner,data.guest);
                    return io.to(socket.room).emit("gameEnd",{
                        winner:result.winner,
                        loser:result.loser,
                    })
                }
                let result=await gameService.EndGame(data.owner,data.guest);
                console.log(result)
                io.to(socket.room).emit("gameEnd",{
                    winner:result.winner,
                    loser:result.loser,
                })
            })
        }catch(err){
            error(err,io,socket)
        }   
    }

}
module.exports = Game
