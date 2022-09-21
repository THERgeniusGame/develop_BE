const { error } = require("../middlewares/error");
const chatVaildation=require("./chatRule/chattingfilter")
const ChatLogsService=require("../../services/chatLogs.service");
const chatLogsService=new ChatLogsService();
module.exports = (io, socket) => {
  socket.on("chat", async(data) => {
    try {
      const checkLogs=await chatLogsService.checkChagLogTable();
      if(checkLogs===null){
        await chatLogsService.createLogsTable();
      }else{
        let chatLog=checkLogs.chat+"/="+socket.nickname+":"+data.msg;
        var updateLogs=await chatLogsService.updateLogs();
      }//동시성해결필요
      if(updateLogs==1){
        console.log("Success-ChatLog");
      }else{
        console.log("Failed-ChatLog");
      }


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
