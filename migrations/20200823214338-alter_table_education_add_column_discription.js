'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("ALTER TABLE `myoptjobs`.`education` ADD COLUMN `description` varchar(1000) DEFAULT '' AFTER `endYear`");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("ALTER TABLE `myoptjobs`.`education` DROP COLUMN `description`");
  }
};
