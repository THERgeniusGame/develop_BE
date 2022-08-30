const RoomService = require("../services/room.service");

module.exports = class RoomController {
  roomService = new RoomService();

  //로비화면
  getRobby = async (req, res, next) => {
    let pageNum = req.query.page;
    let offset = 0;

    if (pageNum > 1) {
      offset = 6 * (pageNum - 1);
    }
    const roomsInfo = await this.roomService.getRoomsInfo(offset);

    if (roomsInfo.success !== false) {
      res.status(200).json({ success: true, data: roomsInfo });
    } else {
      return res
        .status(roomsInfo.status)
        .send({ success: false, msg: roomsInfo.msg });
    }
  };

  //방만들기
  createRoom = async (req, res, next) => {
    const { userId } = res.locals;
    //const userId = 1; //test용
    const { roomTitle, roomCategory, roomLock, roomPw } = req.body;

    if (!roomTitle) {
      return res.status(400).send({ success: false, msg: "Invalid-Datatype" });
    }

    const createRoom = await this.roomService.createRoom(
      roomTitle,
      roomCategory,
      roomLock,
      roomPw,
      userId
    );
    if (createRoom.success === true) {
      res.status(201).json({ success: true });
    } else {
      return res
        .status(createRoom.status)
        .send({ success: false, msg: createRoom.msg });
    }
  };
};
