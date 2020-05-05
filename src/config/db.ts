import * as mysql from 'mysql';
import CONFIG from './config';

const connection = mysql.createConnection(CONFIG.DB_URL);

export default connection;