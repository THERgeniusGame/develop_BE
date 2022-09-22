const { ChatLogs } = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = class ChatLogsRepository {
    getLog=async(roomId)=>{
        let log=await ChatLogs.findOne({
            attribute:[
                "chatLog",
                "gameId",
                "roomid"
            ],
            where:{
                roomId,
                gameId:0
            },
            raw:true
        })
        return log
    }
    saveChat=async(roomId)=>{
        let log=await ChatLogs.create({
            roomId,
            gameId:0
        })
        return log
    }
    updateChat=async(chat,roomId)=>{
        const up= await ChatLogs.update(
            {
                chatLog:chat,
            },{
                where:{
                    roomId:roomId,
                    gameId:0
                }
            }
        )
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