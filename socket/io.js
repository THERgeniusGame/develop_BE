const http = require("http");
const { Server } = require("socket.io");
const { error404, error } = require("../middlewares/error.socket");
const RoomRepository = require("../repositories/room.repository");

class IO {
  roomRepository = new RoomRepository();
  constructor(app) {
    this.server = http.createServer(app);
    this.io = new Server(this.server);
    // this.roomList = this.getRoomList;
    this.roomList =[{roomId:1},{roomId:2}]
    this.connectServer();
  }
  getRoomList = async () => {
    const list = await this.roomRepository.getRoomList();
    return list;
  };
  connectServer = async () => {
    for (let i = 0; i < this.roomList.length; i++) {
      const room=this.roomList[i].roomId;
      let nsp = this.io.of("/"+room).on("connection", (socket) => {
        // 접속한 클라이언트의 정보가 수신되면
        socket.on("login", (data) => {
          console.log(data)
          console.log(
            "Client logged-in:\n name:" +
              data.name +
              "\n userid: " +
              data.userid +
              "\n this room: " +
              data.room
          );

          // socket에 클라이언트 정보를 저장한다
          socket.name = data.name;
          socket.userid = data.userid;

          // 접속된 모든 클라이언트에게 메시지를 전송한다
          nsp.emit("login", data.name);
        });

        // 클라이언트로부터의 메시지가 수신되면
        socket.on("client_msg", (data) => {
          var msg = {
            from: {
              name: socket.name,
              userid: socket.userid,
            },
            msg: data.msg,
          };

          // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
          if (msg.msg !== "") {
            console.log("IN %s,Message from %s: %s",data.room, socket.name, data.msg);
            nsp.emit("server_msg", msg);
          }

          // 메시지를 전송한 클라이언트에게만 메시지를 전송한다
          // socket.emit('s2c chat', msg);

          // 접속된 모든 클라이언트에게 메시지를 전송한다
          // io.emit('s2c chat', msg);

          // 특정 클라이언트에게만 메시지를 전송한다
          // io.to(id).emit('s2c chat', data);
        });
        // force client disconnect from server
        socket.on("forceDisconnect", () => {
          socket.disconnect();
        });

        socket.on("disconnect", () => {
          console.log("user disconnected: " + socket.name);
        });
      });
    }
  };
  setErrorHandler() {
    this.io.use(error404);
    this.io.use(error);
  }
}

module.exports = IO;
