const { Rooms, Users } = require("../models");

module.exports = class RoomRepository {
  //로비화면
  getRoomsInfo = async (offset) => {
    const roomsInfo = await Rooms.findAll({
      offset: offset,
      limit: 6,
      raw: true,
      //through: { attributes: ["createdAt", "updatedAt"] },
      attributes: [
        "roomId",
        "roomTitle",
        "roomCategory",
        "roomLock",
        "roomPw",
        "userId",
      ],
      include: [
        {
          model: Users,
          as: "User",
          attributes: ["nickname"],
        },
      ],
    });

    return roomsInfo;
  };

  //유저정보 확인
  UserInfo = async (userId) => {
    const userInfo = await Users.findOne({
      where: {
        userId,
      },
      raw: true,
    });
    return userInfo;
  };

  //방만들기
  createRoom = async (roomTitle, roomCategory, roomLock, roomPw, userId) => {
    const createRoom = await Rooms.create({
      roomTitle,
      roomCategory,
      roomLock,
      roomPw,
      userId,
    });
    return createRoom;
  };

  //roomIdList
  getRoomList = async () => {
    const roomsInfo = await Rooms.findAll({
      attributes: ["roomId"],
      raw: true,
    });
    return roomsInfo;
  };
  //roomId find
  findRoomId = async (roomId) => {
    const roomsInfo = await Rooms.findOne({
      attributes: ["roomId"],
      where: {
        roomId: roomId,
      },
    });
    return roomsInfo;
  };
};
