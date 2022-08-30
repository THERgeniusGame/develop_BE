const RoomRepository = require("../repositories/room.repository");

module.exports = class RoomService {
  roomRepository = new RoomRepository();

  //로비화면
  getRoomsInfo = async (offset) => {
    const roomsInfo = await this.roomRepository.getRoomsInfo(offset);

    if (roomsInfo.length === 0) {
      return {
        success: false,
        status: 400,
        msg: "Not-Exist-RoomInfo",
      };
    }
    return roomsInfo;
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
