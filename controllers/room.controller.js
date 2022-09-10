const RoomService = require("../services/room.service");

module.exports = class RoomController {
  roomService = new RoomService();

  //로비화면
  getRobby = async (req, res, next) => {
    try {
      let pageNum = req.query.page;
      let offset = 0;

      if (pageNum > 1) {
        offset = 9 * (pageNum - 1);
      }
      const roomsInfo = await this.roomService.getRoomsInfo(offset);

      return res.json({ roomsInfo });
    } catch (err) {
      next(err); //미들웨어로 보내는거
    }
  };

  //방만들기
  createRoom = async (req, res, next) => {
    try {
      const { userId } = res.locals;
      //const userId = 1; //test용
      const { roomTitle, roomLock, roomPw, currentUsers } = req.body;

      if (!roomTitle) {
        let err = new Error("Invalid-Datatype");
        err.status = 400;
        throw err;
      }

      const createRoom = await this.roomService.createRoom(
        roomTitle,
        roomLock,
        roomPw,
        currentUsers,
        userId
      );
      if (createRoom.success === true) {
        res
          .status(201)
          .json({ success: true, data: { roomId: createRoom.result } });
      } else throw new Error();
    } catch (err) {
      err.status, err.massage;
      next(err);
    }
  };

  //검색기능
  searchRoom = async (req, res, next) => {
    try {
      let pageNum = req.query.page;
      let offset = 9;

      const keyword = req.query;
      const searchRoom = await this.roomService.searchRoom(keyword);
      let result = [];
      for (let i = pageNum; i <= pageNum; i++) {
        result = searchRoom.slice(
          (i - 1) * (offset + 1),
          (i - 1) * (offset + 1) + offset
        );
      }
      res.status(200).json({ success: true, result });
    } catch (err) {
      err.status, err.massage;
      next(err);
    }
  };
};
