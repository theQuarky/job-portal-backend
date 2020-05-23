"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("education", {
      resumeId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      designation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      institute: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      startYear: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      endYear: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('education')
  },
};
