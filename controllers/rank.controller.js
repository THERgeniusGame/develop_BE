const Rankservice = require("../services/rank.service");

class RankController {
  rankService = new Rankservice();

  rankMy = async (req, res, next) => {
    try {
      const { userId } = res.locals;
      const rankMy = await this.rankService.rankMy(userId);
      const ranking = await this.rankService.rankList();
      console.log(rankMy.nickname);
      console.log(ranking);
      const userRank = ranking.find(rankMy.nickname);
      console.log(userRank);
      res.status(200).send(rankMy);
    } catch (err) {
      next(err);
    }
  };

  rankList = async (req, res, next) => {
    try {
      const rankList = await this.rankService.rankList();

      res.status(200).send(rankList);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = RankController;
