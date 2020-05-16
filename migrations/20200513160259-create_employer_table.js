"use strict";

module.exports = {
  up: (sequelize, DataTypes) => {
    return sequelize.createTable("employer", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      "full-name": {
        type: DataTypes.STRING,
      },
      "user-name": {
        type: DataTypes.STRING,
      },
      "email-id": {
        type: DataTypes.STRING,
      },
      "phone-number": {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      del: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },

  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable("employer");
  },
};
