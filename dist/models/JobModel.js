"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const sequelize_3 = require("sequelize");
const EmployerModel_1 = require("./EmployerModel");
class JobModel extends sequelize_2.Model {
}
JobModel.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    category: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    employmentStatus: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    experience: {
        type: sequelize_1.INTEGER,
        allowNull: true
    },
    salary: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    qualification: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    dealLine: {
        type: sequelize_3.DATE,
        allowNull: false
    },
    jobDescription: {
        type: sequelize_1.TEXT,
        allowNull: false
    },
    benefits: {
        type: sequelize_1.TEXT,
        allowNull: true
    },
    gender: {
        type: sequelize_1.STRING,
        allowNull: true
    },
    vacancy: {
        type: sequelize_1.INTEGER,
        allowNull: false
    },
    responsibilities: {
        type: sequelize_1.TEXT,
        allowNull: false
    },
    country: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    location: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    companyName: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    companyAddress: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    companyWebsite: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    companyProfile: {
        type: sequelize_1.TEXT,
        allowNull: false
    },
    addedBy: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        references: {
            model: EmployerModel_1.default,
            key: 'id'
        }
    },
    numberOfApplicants: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    isDel: {
        type: sequelize_1.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize: db_1.default,
    modelName: 'jobs',
    tableName: 'jobs',
});
exports.default = JobModel;
//# sourceMappingURL=JobModel.js.map