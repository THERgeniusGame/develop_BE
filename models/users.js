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
        foreignKey: "userId"
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
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      win: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      lose: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      total: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      kakao: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
