const RoomRepository = require("../../repositories/room.repository");
const { error404, error } = require("../middlewares/error");

class SocketLogin {
  roomRepository = new RoomRepository();
  roomIdCheck = async (room) => {
    const roomId = await this.roomRepository.findRoomId(room);
    return roomId === null || roomId === undefined;
  };

  roomListCheck = (roomId, roomList) => {
    return roomList.filter((ele) => ele.roomId == roomId).length === 0;
  };

  Login = async (io, socket, roomList) => {
    socket.on("login", async (data) => {
      try {
        //data 검사,token,room 

      //room 검사
        if (this.roomListCheck(data.room, roomList)) {
          if (await this.roomIdCheck(data.room)) {
            console.log("room: " + data.room + " is WRONG_URL");
            let msg = {
              from: {
                nickname: "server",
                userid: "server",
              },
              msg: "잘못된 접근",
            };
            socket.emit("chat", msg);
            return socket.disconnect();
          } else {
            roomList.push({ roomId: data.room / 1, userCount: 0 });
            console.log(roomList);
          }
        }
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
        socket.room = data.room;
        const index = roomList.findIndex((ele) => ele.roomId == socket.room);
        roomList[index].userCount++;
        socket.join(socket.room);
        // 접속된 모든 클라이언트에게 메시지를 전송한다
        io.to(data.room).emit("login", data.nickname);
      } catch (err) {
        error(err,socket)
      }
    });
  };
}

module.exports = SocketLogin;
