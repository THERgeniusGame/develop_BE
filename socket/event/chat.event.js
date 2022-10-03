const { error } = require("../middlewares/error");
const chatVaildation=require("./chatRule/chattingfilter")
const ChatLogsService=require("../../services/chatLogs.service");
const fs = require('fs');
const chatLogsService=new ChatLogsService();
module.exports = (io, socket) => {
  socket.on("chatReport", async(data)=>{
    try {
      var updateReport= await chatLogsService.updateReportChat(socket.userId,socket.room,data.chat);
      if(updateReport==1){
      }else if(updateReport==0){
        throw("Failed-ReportChat")
      }else{
        throw("Exist-ReportChat")
      }
    } catch (err) {
      error(err,io,socket)
    }
  })
  socket.on("chat", async(data) => {
    try {
      const file = "socket/chatLog/roomId_"+socket.room+'_chatLog.txt';
      const checkLogs=await chatLogsService.checkChagLogTable(socket.room);
      const chatLog=new Date().toLocaleString()+"_userId:"+socket.userId+"_chat:"+data.msg+"\n"
      if(checkLogs===null || checkLogs===undefined){
        await chatLogsService.createLogsTable(socket.room,file);
        fs.writeFile(file, chatLog, 'utf8',(err) =>{
          if (err) {
            throw("Failed-ChatLog")
          } else {
          }
        });
      }else{
        fs.appendFile(file, chatLog, 'utf8',(err) =>{
          if (err) {
            throw("Failed-ChatLog")
          } else {
          }
        });
      }//동시성해결필요

      let clear_Msg= chatVaildation(data.msg);
      if(clear_Msg.msg==="badword"){
        data.msg=clear_Msg.sendMsg
      }
      let changeNick=socket.nickname.replace(" ","");
      var msg = {
        nickname: changeNick,
        msg: data.msg,
      };
      // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
      if (msg.msg !== "") {
        console.log(
          "IN %s,Message from %s: %s",
          socket.room,
          socket.nickname,
          data.msg
        );
        io.to(socket.room).emit("chat", msg);
      }

      // 메시지를 전송한 클라이언트에게만 메시지를 전송한다
      // socket.emit('s2c chat', msg);

      // 접속된 모든 클라이언트에게 메시지를 전송한다
      // io.emit('s2c chat', msg);

      // 특정 클라이언트에게만 메시지를 전송한다
      // io.to(id).emit('s2c chat', data);
    } catch (err) {
      error(err,io,socket)
    }
  });
};
