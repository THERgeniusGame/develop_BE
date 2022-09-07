'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Games extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Games.belongsTo(models.Rooms, {
      foreignKey: "roomId",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
      // define association here
    }
  }
  Games.init({
    roomId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    round: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    batting: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    owner: DataTypes.JSON,
    guest: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Games',
  });
  return Games;
};