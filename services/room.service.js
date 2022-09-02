const RoomRepository = require("../repositories/room.repository");

module.exports = class RoomService {
  roomRepository = new RoomRepository();

  //로비화면
  getRoomsInfo = async (offset) => {
    const roomsInfo = await this.roomRepository.getRoomsInfo(offset);

    let RoomInfoResult;

    if (roomsInfo.length === 0) {
      return {
        success: false,
        status: 400,
        msg: "Not-Exist-RoomInfo",
      };
    }

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
  };

  //방만들기
  createRoom = async (roomTitle, roomCategory, roomLock, roomPw, userId) => {
    const existUser = await this.roomRepository.UserInfo(userId);

    if (!existUser) {
      return {
        success: false,
        status: 400,
        msg: "Not-Exist-UserInfo",
      };
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
  };
};
