const Chat = require("./chat.event");
const Disconnect = require("./disconnect.event");
const { error } = require("../middlewares/error");
const RoomRepository = require("../../repositories/room.repository");
const SocketLogin = require("./login.event");
const GameEvent=require("./game.event")

class EventConnection {
  roomRepository = new RoomRepository();
  socketLogin = new SocketLogin();

  getRoomList = () => {
    const list = this.roomRepository.getRoomList();
    return list;
  };

  getRoomId = (room) => {
    const roomId = this.roomRepository.findRoomId(room);
    return roomId;
  };
  connection = async (io) => {
    let roomList = await this.getRoomList();
    roomList.map(async (room) => await(
      room.userCount = 0,
      room.userList=[],
      room.ownerId=room.userId,
      room.owner=room["User.nickname"],
      room.ready=0,
      delete room["User.nickname"],
      delete room.userId
      ));
    io.on("connection", async (socket) => {
        try {
          // console.log(socket)
          // 접속한 클라이언트의 정보가 수신되면
          this.socketLogin.Login(io, socket, roomList);
          // 클라이언트로부터의 메시지가 수신되면
          Chat(io, socket);
          // force client disconnect from server
          Disconnect(io, socket, roomList);
          new GameEvent(io,socket,roomList);
        } catch (err) {
          error(err,socket)
        }
    });
  };
}

module.exports = EventConnection;
