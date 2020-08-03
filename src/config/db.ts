import {Sequelize} from 'sequelize';
import CONFIG from './config';

const sequelize:Sequelize = new Sequelize(CONFIG.DB_URL,{logging:true});

export default sequelize;