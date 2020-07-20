import sequelize from '../config/db';
import { INTEGER, STRING } from 'sequelize';
import { Model, Sequelize } from 'sequelize';

class EmployerModel extends Model { }

EmployerModel.init({
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
        allowNull: true
    },
    isDel: {
        type: INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'employer',
    tableName: 'employer'
});

export default EmployerModel;