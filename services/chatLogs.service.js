const ChatLogsRepository=require("../repositories/chatLogs.repository")

module.exports=class ChatLogsService{
    chatLogsRepository=new ChatLogsRepository()
    checkChagLogTable=async(roomId)=>{
        const log=await this.chatLogsRepository.getLog(roomId);
        return log;
    }
    createLogsTable=async(roomId)=>{
        const create=await this.chatLogsRepository.saveChat(roomId)
        return create
    }
    updateLogs=async(roomId,chatLog)=>{
        const up=await this.chatLogsRepository.updateChat(chatLog,roomId)
        return up
    }
    updateReportChat=async()=>{
        
    }
}