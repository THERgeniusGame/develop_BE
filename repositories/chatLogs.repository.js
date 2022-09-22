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
    saveChat=async(roomId,chat)=>{
        let log=await ChatLogs.create({
            roomId,
            chatLog:chat
        })
        return log;
    }
    updateChat=async(chat,roomId)=>{
        const up= await ChatLogs.update(
            {
                chatLog:chat,
            },{
                where:{
                    roomId:roomId,
                }
            }
        )
        return up
    }
    updateGame=async(roomId,gameId)=>{
        const up=await ChatLogs.update(
            {
                gameId
            },{
                where:{
                    roomId,
                    gameId:null
                }
            }
        )
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