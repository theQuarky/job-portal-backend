"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class ResumeModel extends sequelize_2.Model {
}
ResumeModel.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    fullName: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    location: {
        type: sequelize_1.STRING,
        allowNull: true
    },
    experienceYear: {
        type: sequelize_1.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    aboutYou: {
        type: sequelize_1.TEXT,
        allowNull: false
    },
    addedBy: {
        type: sequelize_1.INTEGER,
        allowNull: false
    },
    resumePath: {
        type: sequelize_1.STRING,
        allowNull: true
    },
    isDel: {
        type: sequelize_1.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
}, {
    sequelize: db_1.default,
    modelName: 'resumes',
    tableName: 'resumes'
});
exports.default = ResumeModel;
//# sourceMappingURL=ResumeModel.js.map