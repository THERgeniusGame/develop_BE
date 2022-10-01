'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Games", "turn", {
        type: Sequelize.STRING,
    });
},

down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Games", "turn");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
},
};
