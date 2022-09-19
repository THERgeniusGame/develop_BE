"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Users", // name of Target model
      "lose", // name of the key we're adding
      {
        type: Sequelize.INTEGER,
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "Users", // name of Target model
      "lose", // name of the key we're adding
      {
        type: Sequelize.INTEGER,
      }
    );
  },
};
