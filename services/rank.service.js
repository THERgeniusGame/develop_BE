const RankRepository = require("../repositories/rank.repository");

class RankService {
  rankRepository = new RankRepository();
}

module.exports = RankService;
