const { Rooms, Users } = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const chatVaildation = require("../socket/event/chatRule/chattingfilter");

module.exports = class RoomRepository {
  //로비화면
  getRoomsInfo = async (offset) => {
    const roomsInfo = await Rooms.findAll({
      offset: offset,
      limit: 9,
      raw: true,
      attributes: [
        "roomId",
        "roomTitle",
        "roomLock",
        "roomPw",
        "currentUsers",
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

  //방전체개수
  getRoomsNum = async () => {
    const roomNum = await Rooms.count();

    return roomNum;
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
  createRoom = async (roomTitle, roomLock, roomPw, userId) => {
    const roomTitleFiltered = chatVaildation(roomTitle);
    console.log(roomTitleFiltered);
    const createRoom = await Rooms.create({
      roomTitle: roomTitleFiltered.message,
      roomLock,
      roomPw,
      currentUsers: 0,
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
      attributes: ["roomId", "userId"],
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
    const roomInfo = await Rooms.findOne({
      attributes: ["roomId", "userId"],
      include: [
        {
          model: Users,
          as: "User",
          attributes: ["nickname"],
        },
      ],
      where: {
        roomId: roomId,
      },
      raw: true,
    });
    return roomInfo;
  };

  //방이름으로 검색
  searchInRooms = async (keyword) => {
    try {
      //방이름으로 찾기
      const searchInRooms = await Rooms.findAll({
        where: { roomTitle: { [Op.like]: `%${keyword.keyword}%` } },
        attributes: [
          "roomId",
          "roomTitle",
          "roomLock",
          "roomPw",
          "currentUsers",
          "userId",
        ],
        include: [
          {
            model: Users,
            attributes: ["nickname"],
          },
        ],
        raw: true,
      });

      return searchInRooms;
    } catch (err) {
      console.log("re", err);
      throw err;
    }
  };

  //닉네임으로 검색
  searchInUsers = async (keyword) => {
    try {
      //닉네임으로 찾기
      const searchInUsers = await Users.findAll({
        where: { nickname: { [Op.like]: `%${keyword.keyword}%` } },
        attributes: ["nickname"],
        include: [
          {
            model: Rooms,
            attributes: [
              "roomId",
              "roomTitle",
              "roomLock",
              "roomPw",
              "currentUsers",
              "userId",
            ],
          },
        ],
        raw: true,
      });

      const searchInNick = searchInUsers.filter(
        (room) => room["Rooms.roomId"] !== null
      );

      return searchInNick;
    } catch (err) {
      console.log("re", err);
      throw err;
    }
  };

  //방의 인원수 증가,감소
  upCurrentUsers = async (roomId) => {
    const room = await Rooms.findOne({
      where: {
        roomId: roomId,
      },
    });
    const up = await room.increment("currentUsers", { by: 1 });
    return up;
  };
  downCurrentUsers = async (roomId) => {
    const room = await Rooms.findOne({
      where: {
        roomId: roomId,
      },
    });
    const down = await room.decrement("currentUsers", { by: 1 });
    return down;
  };

  //공개방
  roomUnlock = async (offset) => {
    try {
      const roomUnlock = await Rooms.findAll({
        offset: offset,
        limit: 9,
        raw: true,
        where: { roomLock: false },
        attributes: [
          "roomId",
          "roomTitle",
          "roomLock",
          "roomPw",
          "currentUsers",
          "userId",
        ],
        include: [
          {
            model: Users,
            attributes: ["nickname"],
          },
        ],
      });

      return roomUnlock;
    } catch (err) {
      console.log("re", err);
      throw err;
    }
  };

  //공개방 개수
  unlockNum = async () => {
    const unlockNum = await Rooms.count({ where: { roomLock: false } });
    return unlockNum;
  };

  //비공개방
  roomLock = async (offset) => {
    try {
      const roomLock = await Rooms.findAll({
        offset: offset,
        limit: 9,
        raw: true,
        where: { roomLock: true },
        attributes: [
          "roomId",
          "roomTitle",
          "roomLock",
          "roomPw",
          "currentUsers",
          "userId",
        ],
        include: [
          {
            model: Users,
            attributes: ["nickname"],
          },
        ],
      });
      return roomLock;
    } catch (err) {
      console.log("re", err);
      throw err;
    }
  };

  //비공개방 개수
  lockNum = async () => {
    const lockNum = await Rooms.count({ where: { roomLock: true } });
    return lockNum;
  };
};
