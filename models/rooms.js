"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  // class Rooms extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     models.Rooms.belongsTo(models.Users, {
  //       foreignKey: "userId",
  //       onDelete: "cascade",
  //       onUpdate: "cascade",
  //     });
  //     // define association here
  //   }
  // }
  Rooms.init(
    {
      roomId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      roomTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roomLock: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      roomPw: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currentUsers: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Rooms",
    }
  );
  return Rooms;
};
