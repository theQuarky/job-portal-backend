"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("jobs", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      employmentStatus: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      experience: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      salary: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      qualification: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dealLine: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      jobDescription: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      benefits: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vacancy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      responsibilities: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      companyAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      companyWebsite: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      companyProfile: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      addedBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "employer",
          key: "id",
        }
      },
      numberOfApplicants: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      isDel: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    return queryInterface.dropTable("jobs");
  },
};
