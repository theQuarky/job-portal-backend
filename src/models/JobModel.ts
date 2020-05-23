import sequelize from '../config/db';
import { INTEGER, STRING, FLOAT, TEXT } from 'sequelize';
import { Model, Sequelize } from 'sequelize';
import { DATE } from 'sequelize';
import EmployerModel from './EmployerModel';

class JobModel extends Model { }

JobModel.init({
    id: {
        type: INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: STRING,
        allowNull: false,
    },
    category: {
        type: STRING,
        allowNull: false
    },
    employmentStatus: {
        type: STRING,
        allowNull: false
    },
    experience: {
        type: INTEGER,
        allowNull: true
    },
    salary: {
        type: STRING,
        allowNull: false
    },
    qualification: {
        type: STRING,
        allowNull: false
    },
    dealLine: {
        type: DATE,
        allowNull: false
    },
    jobDescription: {
        type: TEXT,
        allowNull: false
    },
    benefits: {
        type: TEXT,
        allowNull: true
    },
    gender: {
        type: STRING,
        allowNull: true
    },
    vacancy: {
        type: INTEGER,
        allowNull: false
    },
    responsibilities: {
        type: TEXT,
        allowNull: false
    },
    country: {
        type: STRING,
        allowNull: false
    },
    location: {
        type: STRING,
        allowNull: false
    },
    companyName: {
        type: STRING,
        allowNull: false
    },
    companyAddress: {
        type: STRING,
        allowNull: false
    },
    companyWebsite: {
        type: STRING,
        allowNull: false
    },
    companyProfile: {
        type: TEXT,
        allowNull: false
    },
    addedBy: {
        type: INTEGER,
        allowNull: false,
        references: {
            model: EmployerModel,
            key: 'id'
        }
    },
    numberOfApplicants: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    isDel: {
        type: INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'jobs',
    tableName: 'jobs',
});

export default JobModel;