const { ChatLogs } = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = class ChatLogsRepository {
    getLog=async(roomId)=>{
        let log=await ChatLogs.findOne({
            attribute:[
                "chatLog",
                "roomid"
            ],
            where:{
                roomId,
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
}