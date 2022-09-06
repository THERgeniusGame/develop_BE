const RoomRepository = require("../repositories/room.repository");

module.exports = class RoomService {
  roomRepository = new RoomRepository();

  //로비화면
  getRoomsInfo = async (offset) => {
    try {
      const roomsInfo = await this.roomRepository.getRoomsInfo(offset);
      if (roomsInfo.length === 0) {
        let err = new Error("No-Exist-roomInfo");
        err.status = 400;
        throw err;
      }
      let RoomInfoResult;

      RoomInfoResult = roomsInfo.map((roomInfo) => {
        if (roomInfo.roomLock === 0) {
          roomInfo.roomLock = false;
        } else {
          roomInfo.roomLock = true;
        }
      });

      let result = roomsInfo.map((roomInfo) => ({
        roomId: roomInfo.roomId,
        roomTitle: roomInfo.roomTitle,
        roomCategory: roomInfo.roomCategory,
        roomLock: roomInfo.roomLock,
        roomPw: roomInfo.roomPw,
        userId: roomInfo.userId,
        nickname: roomInfo["User.nickname"],
      }));
      return result;
    } catch (err) {
      throw err;
    }
  };

  //방만들기
  createRoom = async (roomTitle, roomCategory, roomLock, roomPw, userId) => {
    try {
      const existUser = await this.roomRepository.UserInfo(userId);

      if (!existUser) {
        let err = new Error("Not-Exist-UserInfo");
        err.status = 400;
        throw err;
      }

      const createRoom = await this.roomRepository.createRoom(
        roomTitle,
        roomCategory,
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
};
