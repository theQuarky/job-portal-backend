"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config_1 = require("../config/config");
const Boom = require("boom");
function authentication(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        const decode = jwt.verify(bearerToken, config_1.default.JWT_ENCRYPTION);
        // will send invalid jwt automatically else continue code further
        req.data = decode;
        console.log(decode);
        return next();
    }
    else {
        // Forbidden
        const err = new Error("Please login");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
}
exports.default = authentication;
//# sourceMappingURL=verifyToken.js.map