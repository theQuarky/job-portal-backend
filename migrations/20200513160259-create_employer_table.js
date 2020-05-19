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
      fullName: {
        type: DataTypes.STRING,
      },
      userName: {
        type: DataTypes.STRING,
      },
      emailId: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isDel: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable("employer");
  },
};
