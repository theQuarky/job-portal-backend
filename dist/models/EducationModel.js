"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const ResumeModel_1 = require("./ResumeModel");
class EducationModel extends sequelize_2.Model {
}
EducationModel.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    resumeId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        references: {
            model: ResumeModel_1.default,
            key: 'id'
        }
    },
    designation: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    institute: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    startYear: {
        type: sequelize_1.INTEGER,
        allowNull: true
    },
    endYear: {
        type: sequelize_1.INTEGER,
        allowNull: true
    }
}, {
    sequelize: db_1.default,
    modelName: 'education',
    tableName: 'education'
});
exports.default = EducationModel;
//# sourceMappingURL=EducationModel.js.map