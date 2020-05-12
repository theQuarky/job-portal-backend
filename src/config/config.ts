import * as dotenv from 'dotenv';
dotenv.config();
const DB_HOST = "localhost";
const PASS = "toor";
const DB_USER = "root";
const DB_NAME = "myoptjobs";

const DB_URLSTRING = process.env.DB_URL || "mysql://root:toor@localhost:3306/myoptjobs?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700";//"mysql://"+DB_USER+":"+PASS+"@"+DB_HOST+"/"+DB_NAME+"?debug=true&reconnect=true";
const CONFIG = {
  APP: process.env.APP || 'development',
  PORT: process.env.PORT || '8000',
  DB_URL: process.env.DB_URL || DB_URLSTRING,

  JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || 'jwt_screate_key',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10,

  SHA_KEY: process.env.SHA_KEY || 'sha_screte_key'
};

export default CONFIG;