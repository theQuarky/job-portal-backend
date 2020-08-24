"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      "ALTER TABLE `myoptjobs`.`resumes` ADD UNIQUE INDEX `addedBy_UNIQUE` (`addedBy` ASC) VISIBLE"
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      "ALTER TABLE `myoptjobs`.`resumes` DROP INDEX `addedBy_UNIQUE`"
    );
  },
};
