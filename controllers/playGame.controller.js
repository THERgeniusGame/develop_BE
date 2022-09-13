const Service = require("../services/playGame.service");

class PlayGameController {
  service = new Service();
  visitGame = async (req, res, next) => {
    const { roomId } = req.params;
    const info = await this.service.getRoomInfo(roomId);
    return res.json({ info });
  };

  checkPw = async (req, res, next) => {
    try {
      const { roomId } = req.params;
      const { roomPw } = req.body;
      if (!roomPw) {
        return res.status(400).json({ message: "Invalid-roomPw" });
      }
      const checkPw = await this.service.checkPw(roomId, roomPw);

      if (checkPw.success !== true) {
        return res.status(400).json({ message: "Incorrect roomPw" });
      }
      return res.json({ success: true });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = PlayGameController;
