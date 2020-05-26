import sequelize from '../config/db';
import { INTEGER, STRING, FLOAT, TEXT } from 'sequelize';
import { Model, Sequelize } from 'sequelize';
import { DATE } from 'sequelize';
import ResumeModel from './ResumeModel';

class ExperienceModel extends Model { }

ExperienceModel.init({
    id:{
        type:INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey:true
    },
    resumeId: {
        type: INTEGER,
        allowNull: false,
        references: {
            model: ResumeModel,
            key: 'id'
        }
    },
    designation: {
        type: STRING,
        allowNull: false
    },
    companyName: {
        type: STRING,
        allowNull: false
    },
    startYear: {
        type: INTEGER,
        allowNull: true
    },
    endYear: {
        type: INTEGER,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'experience',
    tableName: 'experience'
});

export default ExperienceModel;