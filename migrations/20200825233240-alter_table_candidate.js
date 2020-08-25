'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("ALTER TABLE `myoptjobs`.`candidate` ADD COLUMN `aboutUs` varchar(1000) DEFAULT null AFTER avatar");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("ALTER TABLE `myoptjobs`.`candidate` DROP COLUMN `aboutUs`");
  }
};
