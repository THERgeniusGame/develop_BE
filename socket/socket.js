const http = require("http");
const { Server } = require("socket.io");
const { error404, error } = require("../middlewares/error.socket");
const RoomRepository = require("../repositories/room.repository");
const event_connection=require("./event/connection")
class IO {
  roomRepository = new RoomRepository();
  constructor(app) {
    this.server = http.createServer(app);
    this.connectServer(this.server);
  }
  getRoomList = () => {
    const list = this.roomRepository.getRoomList();
    return list;
  };

  getRoomId=(room)=>{
    const roomId = this.roomRepository.findRoomId(room);
    return roomId;
  }
  
  connectServer = async (server) => {
    let io = new Server(server);
    event_connection(io)
  };
}

module.exports = IO;
