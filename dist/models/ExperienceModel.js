"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const ResumeModel_1 = require("./ResumeModel");
class ExperienceModel extends sequelize_2.Model {
}
ExperienceModel.init({
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
    companyName: {
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
    modelName: 'experience',
    tableName: 'experience'
});
exports.default = ExperienceModel;
//# sourceMappingURL=ExperienceModel.js.map