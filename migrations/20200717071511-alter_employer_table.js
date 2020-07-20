'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("ALTER TABLE `myoptjobs`.`employer` ADD COLUMN `aboutUs` varchar(1000) DEFAULT null AFTER avatar");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("ALTER TABLE `myoptjobs`.`employer` DROP COLUMN `aboutUs`");
  }
};
