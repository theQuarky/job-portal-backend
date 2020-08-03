"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class VlogModel extends sequelize_2.Model {
}
VlogModel.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    imgPath: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    isDel: {
        type: sequelize_1.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize: db_1.default,
    modelName: 'vlogs',
    tableName: 'vlogs'
});
exports.default = VlogModel;
//# sourceMappingURL=VlogModel.js.map