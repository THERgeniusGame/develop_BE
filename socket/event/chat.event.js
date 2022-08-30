module.exports=(io,socket)=>{
    socket.on("chat", (data) => {
        var msg = {
          from: {
            nickname: socket.nickname,
            userid: socket.userid,
          },
          msg: data.msg,
        }
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
    });
}