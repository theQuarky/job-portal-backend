"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      "ALTER TABLE `myoptjobs`.`resumes` ADD COLUMN `skills` varchar(1000) DEFAULT null AFTER location"
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      "ALTER TABLE `myoptjobs`.`resume` DROP COLUMN `skills`"
    );
  },
};
