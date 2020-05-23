"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('resumes',{
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      experienceYear: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 0,
      },
      aboutYou: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      resumePath: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('resumes');
  },
};
