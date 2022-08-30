"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Users.hasMany(models.Rooms, {
        foreignKey: "userId",
        onDelete: "cascade",
        onUpdate: "cascade",
      });
      // define association here
    }
  }
  Users.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: DataTypes.STRING,
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
      win: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      total: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
