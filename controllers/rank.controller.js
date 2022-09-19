const Rankservice = require("../services/rank.service");

class RankController {
  rankservice = new Rankservice();

  rankMy = async (req, res, next) => {};

  rankList = async (req, res, next) => {};
}

module.exports = RankController;
