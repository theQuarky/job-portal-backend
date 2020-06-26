"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class CandidateModel extends sequelize_2.Model {
}
CandidateModel.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    fullName: {
        type: sequelize_1.STRING
    },
    userName: {
        type: sequelize_1.STRING
    },
    emailId: {
        type: sequelize_1.STRING
    },
    phoneNumber: {
        type: sequelize_1.STRING
    },
    password: {
        type: sequelize_1.STRING
    },
    isDel: {
        type: sequelize_1.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize: db_1.default,
    modelName: 'candidate',
    tableName: 'candidate'
});
exports.default = CandidateModel;
//# sourceMappingURL=CandidateModel.js.map