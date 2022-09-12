const RoomRepository = require("../repositories/room.repository");

module.exports = class RoomService {
  roomRepository = new RoomRepository();

  //로비화면
  getRoomsInfo = async (offset) => {
    try {
      const roomsInfo = await this.roomRepository.getRoomsInfo(offset);
      if (roomsInfo.length === 0) {
        return { message: "No-Exist-roomInfo" };
      }
      let roomInfoResult;

      roomInfoResult = roomsInfo.map((roomInfo) => {
        if (roomInfo.roomLock === 0) {
          roomInfo.roomLock = false;
        } else {
          roomInfo.roomLock = true;
        }
      });

      let result = roomsInfo.map((roomInfo) => ({
        roomId: roomInfo.roomId,
        roomTitle: roomInfo.roomTitle,
        roomLock: roomInfo.roomLock,
        roomPw: roomInfo.roomPw,
        currentUsers: roomInfo.currentUsers,
        userId: roomInfo.userId,
        nickname: roomInfo["User.nickname"],
      }));
      return result;
    } catch (err) {
      throw err;
    }
  };

  //방만들기
  createRoom = async (roomTitle, roomLock, roomPw, userId) => {
    try {
      const existUser = await this.roomRepository.UserInfo(userId);

      if (!existUser) {
        let err = new Error("Not-Exist-UserInfo");
        err.status = 400;
        throw err;
      }

      const createRoom = await this.roomRepository.createRoom(
        roomTitle,
        roomLock,
        roomPw,
        userId
      );
      const result = createRoom.dataValues.roomId;

      return { result, success: true };
    } catch (err) {
      throw err;
    }
  };

  //검색기능
  searchRoom = async (keyword) => {
    try {
      const searchInRooms = await this.roomRepository.searchInRooms(keyword);
      let roomInfoResult;

      roomInfoResult = searchInRooms.map((roomInfo) => {
        if (roomInfo.roomLock === 0) {
          roomInfo.roomLock = false;
        } else {
          roomInfo.roomLock = true;
        }
      });

      let roomInfoFromRooms = searchInRooms.map((roomInfo) => ({
        roomId: roomInfo.roomId,
        roomTitle: roomInfo.roomTitle,
        roomLock: roomInfo.roomLock,
        roomPw: roomInfo.roomPw,
        currentUsers: roomInfo.currentUsers,
        userId: roomInfo.userId,
        nickname: roomInfo["User.nickname"],
      }));

      const searchInUsers = await this.roomRepository.searchInUsers(keyword);

      let roomInfoResult2;

      roomInfoResult2 = searchInUsers.map((roomInfo) => {
        if (roomInfo["Rooms.roomLock"] === 0) {
          roomInfo["Rooms.roomLock"] = false;
        } else {
          roomInfo["Rooms.roomLock"] = true;
        }
      });

      let roomInfoFromUsers = searchInUsers.map((roomInfo) => ({
        roomId: roomInfo["Rooms.roomId"],
        roomTitle: roomInfo["Rooms.roomTitle"],
        roomLock: roomInfo["Rooms.roomLock"],
        roomPw: roomInfo["Rooms.roomPw"],
        currentUsers: roomInfo["Rooms.currentUsers"],
        userId: roomInfo["Rooms.userId"],
        nickname: roomInfo.nickname,
      }));

      const searchResult = roomInfoFromRooms
        .concat(
          roomInfoFromUsers.filter(
            (room) =>
              roomInfoFromRooms.findIndex(
                (Room) => Room.roomId === room.roomId
              ) < 0
          )
        )
        .sort((a, b) => a["roomId"] - b["roomId"]);

      return searchResult;
    } catch (err) {
      console.log("service error");
      throw err;
    }
  };
};
