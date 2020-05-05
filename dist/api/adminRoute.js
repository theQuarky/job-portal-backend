"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var jwt = require("jsonwebtoken");
var _ = require("lodash");
var verifyToken_1 = require("../helpers/verifyToken");
var config_1 = require("../config/config");
var admin = express_1.Router();
admin.post('/login', function (req, res, next) {
    var params = _.merge(req.body, req.params);
    if (params.email === 'ranahiren27@gmail.com' && params.password === 'hiren@27') {
        jwt.sign({ email: params.email, password: params.password }, config_1.default.JWT_ENCRYPTION, function (err, token) {
            console.log(token);
            res.json({
                token: token
            });
        });
    }
    else {
        res.json({
            message: "Enter valid email and password"
        });
    }
});
admin.get('/test', verifyToken_1.default, function (req, res, next) {
    jwt.verify(req.token, config_1.default.JWT_ENCRYPTION, function (err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            res.json({
                authData: authData
            });
        }
    });
});
exports.default = admin;
//# sourceMappingURL=adminRoute.js.map