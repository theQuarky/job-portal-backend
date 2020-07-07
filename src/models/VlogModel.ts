import sequelize from '../config/db';
import { INTEGER, STRING } from 'sequelize';
import { Model, Sequelize } from 'sequelize';

class VlogModel extends Model { }

VlogModel.init({
    id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: STRING,
        allowNull: false
    },
    imgPath: {
        type: STRING,
        allowNull: false
    },
    isDel:{
        type:INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'vlogs',
    tableName: 'vlogs'
});

export default VlogModel;