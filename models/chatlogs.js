'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatLogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.ChatLogs.belongsTo(models.Games, {
        foreignKey: "gameId",
        onDelete: "cascade",
        onUpdate: "cascade",
      });
      models.ChatLogs.belongsTo(models.Rooms, {
        foreignKey: "roomId",
        onDelete: "cascade",
        onUpdate: "cascade",
      });
      // define association here
    }
  }
  ChatLogs.init({
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gameId: {
      type: DataTypes.INTEGER,
    },
    chatLog: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ChatLogs',
  });
  return ChatLogs;
};