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
        console.log("Success-ReportChat")
      }else if(updateReport==0){
        throw("Failed_ReportChat")
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
            console.log(err);
          } else {
              console.log("file written successfully");
          }
        });
      }else{
        fs.appendFile(file, chatLog, 'utf8',(err) =>{
          if (err) {
            console.log(err);
          } else {
              console.log("file append successfully");
          }
        });
      }//동시성해결필요

      // if(updateLogs==1){
      //   console.log("Success-ChatLog");
      // }else{
      //   console.log("Failed-ChatLog");
      // }

      let clear_Msg= chatVaildation(data.msg);
      if(clear_Msg.msg==="badword"){
        data.msg=clear_Msg.sendMsg
      }
      var msg = {
        nickname: socket.nickname,
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
