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
      const { password } = req.body;
      if (password === undefined) {
        res.json({ message: "Invalid-password" });
      }
      const checkPw = await this.service.checkPw(roomId, password);
      res.json({ checkPw });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = PlayGameController;
