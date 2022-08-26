
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Rooms.belongsTo(models.Users, {
        foreignKey: "userId",
        onDelete: "cascade",
        onUpdate: "cascade",
      });
      // define association here
    }
  }
  Rooms.init({
    roomId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roomTitle: DataTypes.STRING,
    roomCategory: DataTypes.INTEGER,
    roomLock: DataTypes.BOOLEAN,
    roomPw: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rooms',
  });
  return Rooms;
};
