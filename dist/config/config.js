"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
var DB_HOST = "sql12.freesqldatabase.com";
var PASS = "dgThsrJ8ep";
var DB_USER = "sql12338029";
var DB_NAME = "sql12338029";
var DB_URLSTRING = process.env.DB_URL || "mysql://" + DB_USER + ":" + PASS + "@" + DB_HOST + "/" + DB_NAME + "?debug=true&reconnect=true";
var CONFIG = {
    APP: process.env.APP || 'development',
    PORT: process.env.PORT || '8000',
    DB_URL: process.env.DB_URL || DB_URLSTRING,
    JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || 'jwt_screate_key',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
    SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
    SHA_KEY: process.env.SHA_KEY || 'sha_screte_key'
};
exports.default = CONFIG;
//# sourceMappingURL=config.js.map