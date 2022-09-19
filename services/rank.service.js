const RankRepository = require("../repositories/rank.repository");

class RankService {
  rankRepository = new RankRepository();
  //나의 랭킹 상세정보
  rankMy = async (userId) => {
    try {
      const rankMy = await this.rankRepository.rankMy(userId);

      return rankMy;
    } catch (err) {
      throw err;
    }
  };
  //전체 랭킹
  rankList = async () => {
    try {
      const rankList = await this.rankRepository.rankList();

      //승률구하기
      let rankWithAvg = await rankList
        .map((user) => ({
          nickname: user.nickname,
          winavg: Math.floor((user.win / user.total) * 100),
        }))
        .sort((a, b) => b.winavg - a.winavg);

      let ranking = [];
      for (let i = 0; i < rankWithAvg.length; i++) {
        ranking.push({
          rank: i + 1,
          nickname: rankWithAvg[i].nickname,
          winavg: rankWithAvg[i].winavg,
        });
      }

      return ranking;
    } catch (err) {
      throw err;
    }
  };
}

module.exports = RankService;
