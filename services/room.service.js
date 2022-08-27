const RoomRepository = require("../repositories/room.repository");

module.exports = class RoomService {
  roomRepository = new RoomRepository();

  //로비화면
  getRoomsInfo = async () => {
    const roomsInfo = await this.roomRepository.getRoomsInfo();
    let RoomInfoResult;

    if (roomsInfo.roomsInfo.length === 0) {
      return {
        success: false,
        status: 400,
        msg: "Not-Exist-RoomInfo",
      };
    } else {
      RoomInfoResult = roomsInfo.roomsInfo.map((roomInfo, index) => {
        return {
          roomId: roomInfo.roomId,
          roomTitle: roomInfo.roomTitle,
          roomCategory: roomInfo.roomCategory,
          roomLock: roomInfo.roomLock,
          roomPw: roomInfo.roomPw,
          nickname: roomsInfo.Nicknames[index],
          currentUsers: 0,
        };
      });
    }

    return RoomInfoResult;
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

    return { createRoom, success: true };
  };
};
