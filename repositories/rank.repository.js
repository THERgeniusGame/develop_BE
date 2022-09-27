const { Users } = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

class RankRepository {
  rankMy = async (userId) => {
    const userInfo = await Users.findOne({
      where: {
        userId,
      },
      attributes: ["nickname", "win", "lose", "total"],
      raw: true,
    });

    return userInfo;
  };

  rankNothing = async (userId) => {
    const rankNothing = await Users.findOne({
      where: {
        userId,
      },
      attributes: ["nickname", "win", "lose", "total"],
      raw: true,
    });

    return rankNothing;
  };
  rankList = async () => {
    const userInfo = await Users.findAll({
      where: {
        total: { [Op.ne]: 0 },
      },
      attributes: ["nickname", "win", "lose", "total"],
      raw: true,
    });
    return userInfo;
  };
}

module.exports = RankRepository;
