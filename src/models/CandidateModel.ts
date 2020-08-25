import sequelize from '../config/db';
import { INTEGER, STRING } from 'sequelize';
import { Model, Sequelize } from 'sequelize';
import { DATE } from 'sequelize';

class CandidateModel extends Model { }

CandidateModel.init({
    id: {
        type: INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    fullName: {
        type: STRING
    },
    userName: {
        type: STRING
    },
    emailId: {
        type: STRING
    },
    phoneNumber: {
        type: STRING
    },
    password: {
        type: STRING
    },
    avatar:{
        type: STRING,
        allowNull: true
    },
    aboutUs:{
        type:STRING,
        allowNull:true,
        defaultValue:""
    },
    isDel: {
        type: INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'candidate',
    tableName: 'candidate'
});

export default CandidateModel;