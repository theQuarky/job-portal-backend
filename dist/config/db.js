"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var config_1 = require("./config");
var sequelize = mysql.createConnection(config_1.default.DB_URL);
exports.default = sequelize;
//# sourceMappingURL=db.js.map