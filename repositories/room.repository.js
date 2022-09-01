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

  //delete rooomID
  deleteRoom = async (roomId) => {
    const roomsInfo = await Rooms.destroy({
      where: {
        roomId: roomId,
      },
    });
    return roomsInfo;
  };

  //roomIdList
  getRoomList = async () => {
    const roomsInfo = await Rooms.findAll({
      attributes: ["roomId","userId"],
      raw: true,
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

  //roomId find
  findRoomId = async (roomId) => {
    const roomsInfo = await Rooms.findOne({
      attributes: ["roomId","userId"],
      where: {
        roomId: roomId,
      },
      include: [
        {
          model: Users,
          attributes: ["nickname"],
        },
      ],
    });
    return roomsInfo;
  };

  //room find
  findRoomId = async (roomId) => {
    const roomsInfo = await Rooms.findOne({
      where: {
        roomId: roomId,
      },
    });
    return roomsInfo;
  };
};
