const http = require("http");
const { Server } = require("socket.io");
const { error404, error } = require("../middlewares/error.socket");
const RoomRepository = require("../repositories/room.repository");

class IO {
  roomRepository = new RoomRepository();
  constructor(app) {
    this.server = http.createServer(app);
    this.io = new Server(this.server);
    this.connectServer();
  }
  getRoomList = () => {
    const list = this.roomRepository.getRoomList();
    return list;
  };

  getRoomId=(room)=>{
    const roomId = this.roomRepository.findRoomId(room);
    return roomId;
  }

  connectServer = async () => {
    let roomList=await this.getRoomList()
    console.log(roomList)
    // let roomList =[{roomId:1},{roomId:2}]
    let count = 0;
    let nsp = this.io.on("connection", (socket) => {
      // console.log(socket)
      // 접속한 클라이언트의 정보가 수신되면
      socket.on("login", async(data) => {
        //user 검사
        const user=data.userId

        //room 검사
        const room=data.room
        if(roomList.filter((ele)=>(ele.roomId==room).length===0)){
          let currentID=await this.getRoomId(room);
          if(currentID===null || currentID===undefined ){
            console.log("room: "+room+" is WRONG_URL");
            socket.disconnect();
            return;
          }else{
            roomList.push({roomId:room})
          }
        } 
        count++;
        console.log(
          "Client logged-in:\n nickname:" +
            data.nickname +
            "\n userid: " +
            data.userid +
            "\n this room: " +
            data.room
        );
        // socket에 클라이언트 정보를 저장한다
        socket.nickname = data.nickname;
        socket.userid = data.userid;
        socket.room=data.room;

        socket.join(room);
        // 접속된 모든 클라이언트에게 메시지를 전송한다
        nsp.to(data.room).emit("login", data.nickname);
      });

      // 클라이언트로부터의 메시지가 수신되면
      socket.on("client_msg", (data) => {
        var msg = {
          from: {
            nickname: socket.nickname,
            userid: socket.userid,
          },
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
          nsp.to(socket.room).emit("server_msg", msg);
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
        count--;
        socket.disconnect();
      });

      socket.on("disconnect", () => {
        console.log("user disconnected: " + socket.name);
      });
    });
  };
  setErrorHandler() {
    this.io.use(error404);
    this.io.use(error);
  }
}

module.exports = IO;
