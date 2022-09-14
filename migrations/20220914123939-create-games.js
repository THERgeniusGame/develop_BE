"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Games", {
      gameId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      roomId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      round: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      batting: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      owner: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      guest: {
        type: Sequelize.JSON,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Games");
  },
};
