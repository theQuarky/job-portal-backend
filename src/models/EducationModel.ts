import sequelize from '../config/db';
import { INTEGER, STRING, FLOAT, TEXT } from 'sequelize';
import { Model, Sequelize } from 'sequelize';
import ResumeModel from './ResumeModel';

class EducationModel extends Model { }

EducationModel.init({
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
    institute: {
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
    modelName: 'education',
    tableName: 'education'
});

export default EducationModel;
