"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Games extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Games.init(
    {
      gameId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      round: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      batting: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      owner: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      guest: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Games",
    }
  );
  return Games;
};
