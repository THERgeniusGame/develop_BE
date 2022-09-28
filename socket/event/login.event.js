const RoomRepository = require("../../repositories/room.repository");
const UserRepository = require("../../repositories/user.repository");
const { error404, error } = require("../middlewares/error");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const env = process.env;

class SocketLogin {
  roomRepository = new RoomRepository();
  userRepository = new UserRepository();
  roomIdCheck = async (room) => {
    let roomInfo = await this.roomRepository.findRoomId(room);
    return roomInfo;
  };

  roomListCheck = (roomId, roomList) => {
    return roomList.filter((ele) => ele.roomId == roomId).length === 0;
  };

  Login = async (io, socket, roomList) => {
    socket.on("login", async (data) => {
      console.log("event:login")
      try {
        //data 검사,token,room
        const room = data.room;
        const token = data.token;
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5pY2tuYW1lIjoi7J2A64KY66y0Iiwid2luIjowLCJ0b3RhbCI6MCwiaWF0IjoxNjYyMDE5MjU2LCJleHAiOjE2NjI2MjQwNTZ9.iCKWK2ZXAlSwzErq6aARvIhPwlEiJnYTK3h6K0xWa_w";
        if (room === undefined || token === undefined) {
          throw("Bad-Request");
        }

        //전달받은 token 해체
        try {
          const userInfo = jwt.verify(token, env.SECRET_KEY);
          socket.userId = userInfo.userId;
          socket.nickname = userInfo.nickname;
          socket.win = userInfo.win;
          socket.total = userInfo.total;
        } catch (err) {
          if (err.name === "TokenExpiredError") {
            throw("Expired-Token")
          }
        }
        
        //room 검사
        if (this.roomListCheck(data.room, roomList)) {
          let roomInfo = await this.roomIdCheck(data.room);
          if (roomInfo === undefined || roomInfo===null) {
            console.log("room: " + data.room + " is WRONG_URL");
            throw("Wrong-Url");
          } else {
            socket.room = data.room;
            roomInfo.userCount = 0;
            roomInfo.userList = [];
            roomInfo.ownerId = roomInfo.userId;
            roomInfo.owner = roomInfo["User.nickname"];
            roomInfo.userList = [];
            roomInfo.ready=0;
            delete roomInfo["User.nickname"];
            delete roomInfo.userId;
            roomList.push(roomInfo);
          }
        } else {
          socket.room = data.room;
        }

        //roomList에서 해당찾기
        const index = roomList.findIndex((ele) => ele.roomId == socket.room);
        socket.index=index;
        
        //room 정보 조정 - 인원수 조정
        if (roomList[index].userCount >= 2) {
          return socket.disconnect();
        }
        roomList[index].userCount++;
        let user = {
          userId: socket.userId,
          nickname: socket.nickname,
          socketId: socket.id,
        };
        const userIndex = roomList[index].userList.findIndex(
          (ele) => ele.userId === user.userId
        );
        if (userIndex !== -1) {
          roomList[index].userList[userIndex].socketId = socket.id;
          await this.roomRepository.upCurrentUsers(socket.room);
        } else {
          roomList[index].userList.push(user);
          await this.roomRepository.upCurrentUsers(socket.room);
        }

        //owner가 방안에 있는지 체크
        if(roomList[index].userList.find(ele=>{
          roomList[index].ownerId==ele.userId;
        })===undefined){
          throw("None-Exist-Owner");
        }

        //로그인 정보
        console.log(
          "Client logged-in:\n nickname:" +
            socket.nickname +
            "\n userid: " +
            socket.userId +
            "\n this room: " +
            socket.room
        );

        //room으로 이동
        socket.join(socket.room);
        //roomList의 userList에 user 추가

        //전달 메시지 제작
        let user_send_data = {
          userId: socket.userId,
          nickname: socket.nickname,
          socketId: socket.id,
        }
        let room_send_data = {
          room: socket.room,
          owner: roomList[index].owner,
          userList: roomList[index].userList,
        };
        // 접속된 모든 클라이언트에게 메시지를 전송한다
        io.to(socket.id).emit("login_user", user_send_data);
        io.to(data.room).emit("login_room", room_send_data);
      } catch (err) {
        error(err,io,socket)
      }
    });
  };
}

module.exports = SocketLogin;
//로그인(시작 기능)
//1.들어온 데이터 확인 token,room
//2.roomList확인하여 있는 방인지 확인, 없으면 데이터베이스 조회
//3.token 해체하여 유저데이터 저장
//4.socket에 필요한 정보 저장
//5.room으로 전송
//6.보낼 메시지 작성
//7.메시지 전송
