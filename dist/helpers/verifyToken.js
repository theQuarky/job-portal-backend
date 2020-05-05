"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authentication(req, res, next) {
    // Get auth header value
    var bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        var bearer = bearerHeader.split(' ');
        // Get token from array
        var bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    }
    else {
        // Forbidden
        res.sendStatus(403);
    }
}
exports.default = authentication;
//# sourceMappingURL=verifyToken.js.map