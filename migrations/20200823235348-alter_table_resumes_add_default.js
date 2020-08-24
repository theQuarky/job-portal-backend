"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      "ALTER TABLE `myoptjobs`.`resumes` CHANGE COLUMN `fullName` `fullName` VARCHAR(255) NULL DEFAULT NULL , CHANGE COLUMN `aboutYou` `aboutYou` VARCHAR(255) NULL DEFAULT NULL"
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      "ALTER TABLE `myoptjobs`.`resumes` CHANGE COLUMN `fullName` `fullName` VARCHAR(255) NULL ,CHANGE COLUMN `aboutYou` `aboutYou` VARCHAR(255) NULL "
    );
  },
};
