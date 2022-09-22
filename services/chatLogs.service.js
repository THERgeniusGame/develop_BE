const ChatLogsRepository=require("../repositories/chatLogs.repository")
const ReportRepository=require("../repositories/report.repository")

module.exports=class ChatLogsService{
    chatLogsRepository=new ChatLogsRepository()
    reportRepository=new ReportRepository();
    checkChagLogTable=async(roomId)=>{
        const log=await this.chatLogsRepository.getLog(roomId,null);
        return log;
    }
    createLogsTable=async(roomId,chat)=>{
        const create=await this.chatLogsRepository.saveChat(roomId,chat)
        return create
    }
    updateLogs=async(roomId,chatLog)=>{
        const up=await this.chatLogsRepository.updateChat(chatLog,roomId)
        return up
    }
    gameUpdate=async(roomId,gameId)=>{
        const up=await this.chatLogsRepository.updateGame(roomId,gameId)
        return up
    }
    updateReportChat=async(userId,roomId,gameId)=>{
        const get=await this.chatLogsRepository.getLog(roomId,gameId);
        let reportLog=
            get.roomId+"/"+
                get.gameId+"/"+
                    get.chatLog;
        const report=await this.reportRepository.createChatReport(userId,reportLog)
        
    }
}