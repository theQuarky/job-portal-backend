"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("./config");
const sequelize = new sequelize_1.Sequelize(config_1.default.DB_URL);
exports.default = sequelize;
//# sourceMappingURL=db.js.map