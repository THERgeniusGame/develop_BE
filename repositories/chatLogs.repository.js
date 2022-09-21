const { ChatLogs } = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = class ChatLogsRepository {
    getLog=async(roomId,gameId)=>{
        let log=await ChatLogs.findOne({
            attribute:[
                "chatLog",
                "gameId",
                "roomid"
            ],
            where:{
                roomId,
                gameId
            },
            raw:true
        })
        return log
    }
    saveChat=async(chat,roomId,gameId)=>{
        let log=await ChatLogs.create({
            chatLog:chat,
            roomId,
            gameId
        })
        return log
    }
    updateChat=async(chat,roomId,gameId)=>{
        const up = await user.increment(
            {
                "chatLog":chat
            }, { 
                where:{
                    roomId,
                    gameId
                }
                });
        return up
    }
    deleteChat=async(roomId,gameId)=>{
        let deleteLog=await ChatLogs.destory({
            where:{
                roomId,
                gameId
            }
        })
        return deleteLog
    }
}