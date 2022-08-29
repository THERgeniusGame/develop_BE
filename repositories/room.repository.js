const { Rooms, Users } = require("../models");

module.exports = class RoomRepository {
  //로비화면
  getRoomsInfo = async () => {
    const roomsInfo = await Rooms.findAll({
      raw: true,
    });
    const getUserId = await roomsInfo.map((roomInfo) => roomInfo.userId);

    const NicknameList = [];
    for (let i = 0; i < getUserId.length; i++) {
      let UserInfo = await Users.findOne({
        attributes: ["nickname"],
        where: { userId: getUserId[i] },
        raw: true,
      });
      NicknameList.push(UserInfo);
    }

    const Nicknames = NicknameList.map((nickname) => nickname.nickname);

    return { roomsInfo, Nicknames };
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
  getRoomList=async()=>{
    const roomsInfo = await Rooms.findAll({
      attributes: ["roomId"],
      raw: true,
    });
  }
};
