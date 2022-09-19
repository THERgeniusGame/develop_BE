'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Reports.belongsTo(models.Users, {
        foreignKey: "userId",
        onDelete: "cascade",
        onUpdate: "cascade",
      });
      models.Reports.hasOne(models.Comments, {
        foreignKey: "reportId",
        onDelete: "cascade",
        onUpdate: "cascade",
      });
      // define association here
    }
  }
  Reports.init({
    reportId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reportTitle:  {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reportContent:  {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reportCategory:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      default:0
    },
  }, {
    sequelize,
    modelName: 'Reports',
  });
  return Reports;
};