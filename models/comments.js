'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comments.belongsTo(models.Reports, {
        foreignKey: "reportId",
        onDelete: "cascade",
        onUpdate: "cascade",
      });
    }
  }
  Comments.init({
    commentId:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    commentContent:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    reportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};