import {Sequelize} from 'sequelize';
import CONFIG from './config';

const sequelize:Sequelize = new Sequelize(CONFIG.DB_URL);

export default sequelize;