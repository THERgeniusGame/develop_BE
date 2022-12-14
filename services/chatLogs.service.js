const ChatLogsRepository=require("../repositories/chatLogs.repository")
const ReportRepository=require("../repositories/report.repository")

module.exports=class ChatLogsService{
    chatLogsRepository=new ChatLogsRepository()
    reportRepository=new ReportRepository();
    checkChagLogTable=async(roomId)=>{
        const log=await this.chatLogsRepository.getLog(roomId);
        return log;
    }
    createLogsTable=async(roomId,chat)=>{
        const create=await this.chatLogsRepository.saveChat(roomId,chat)
        return create
    }
    gameUpdate=async(roomId)=>{
        const up=await this.chatLogsRepository.updateGame(roomId)
        return up
    }
    updateReportChat=async(userId,roomId,location)=>{
        const get=await this.chatLogsRepository.getLog(roomId);
        if(get===null||get===undefined){
            return 0;
        }
        const log="loc:"+location+",chatLog:"+get.chatLog
        const reportSerch=await this.reportRepository.checkChatReport(userId,log);
        if(reportSerch===null||reportSerch===undefined){
            var report=await this.reportRepository.createChatReport(userId,log)
        }else{
            return -1;
        }
        if(report===null||report===undefined){
            return 0;
        }else{
            return 1;
        }
    }
}