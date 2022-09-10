'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
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
        type:DataTypes.JSON,
        allowNull: false,
      },
      guest:{
        type:DataTypes.JSON,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Games');
  }
};