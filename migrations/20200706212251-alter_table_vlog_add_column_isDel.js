'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("ALTER TABLE `myoptjobs`.`vlogs` ADD COLUMN `isDel` int DEFAULT 0");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("ALTER TABLE `myoptjobs`.`vlogs` DROP COLUMN `isDel`");
  }
};
