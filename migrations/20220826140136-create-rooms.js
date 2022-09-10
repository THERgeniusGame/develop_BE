'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
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
      roomPw:  {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currentUsers: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rooms');
  }
};

