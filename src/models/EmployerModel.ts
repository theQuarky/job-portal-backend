import sequelize from '../config/db';
import { INTEGER, STRING } from 'sequelize';
import { Model, Sequelize } from 'sequelize';
import { DATE } from 'sequelize';

class EmployerModel extends Model { }

EmployerModel.init({
    id: {
        type: INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    'full-name': {
        type: STRING
    },
    'user-name': {
        type: STRING
    },
    'email-id': {
        type: STRING
    },
    'phone-number': {
        type: STRING
    },
    'password': {
        type: STRING
    },
    'del': {
        type: INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'employer',
    tableName: 'employer'
});

export default EmployerModel;