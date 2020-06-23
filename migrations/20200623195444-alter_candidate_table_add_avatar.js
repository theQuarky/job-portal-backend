'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("ALTER TABLE `myoptjobs`.`candidate` ADD COLUMN `avatar` VARCHAR(400) NULL AFTER `password`");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("ALTER TABLE `myoptjobs`.`candidate` DROP COLUMN `avatar`");
  }
};
