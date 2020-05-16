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
    modelName: 'candidate',
    tableName: 'candidate'
});

export default CandidateModel;