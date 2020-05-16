import * as dotenv from 'dotenv';
dotenv.config();

const DB_URLSTRING = process.env.DB_URL || "mysql://root:toor@localhost:3306/myoptjobs";
const CONFIG = {
  APP: process.env.APP || 'development',
  PORT: process.env.PORT || '8000',
  DB_URL: process.env.DB_URL || DB_URLSTRING,

  JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || 'jwt_secrete_key',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10,

  SHA_KEY: process.env.SHA_KEY || 'sha_secrete_key'
};

export default CONFIG;