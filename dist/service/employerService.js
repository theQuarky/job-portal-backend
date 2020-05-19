"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var _ = require("lodash");
var db_1 = require("../config/db");
var config_1 = require("../config/config");
var Boom = require("boom");
exports.validateData = function (req, res, next) {
    var params = _.merge(req.params, req.body);
    var emailIdRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (_.isEmpty(params.fullName.trim())) {
        var err = new Error("Enter Full Name");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isEmpty(params.userName.trim())) {
        var err = new Error("Enter User Name");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isEmpty(params.emailId.trim()) || !emailIdRegEx.test(params.emailId.trim())) {
        var err = new Error("Enter valid Email Id");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isEmpty(params.phoneNumber.toString().trim()) || !_.isInteger(parseInt(params.phoneNumber)) || (params.phoneNumber.toString().length !== 10)) {
        var err = new Error("Enter Valid Phone Number");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isEmpty(params.password.trim())) {
        var err = new Error("Enter Password");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (params.rePassword.trim() !== params.password.trim()) {
        var err = new Error("Password and Re-password are not matching");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    return next();
};
exports.findEmployerByEmail = function (req, res, next) {
    var params = _.merge(req.params, req.body);
    db_1.default.query('SELECT * FROM employer WHERE `email-id` = "' + params.emailId.trim() + '"', function (error, result, fields) {
        if (error) {
            console.log("error", error);
        }
        else {
            if (!_.isEmpty(result)) {
                var err = new Error("Email id is already taken!");
                return res.send(Boom.boomify(err, { statusCode: 400 }));
            }
            else {
                return next();
            }
        }
    });
};
exports.findEmployerByUserName = function (req, res, next) {
    var params = _.merge(req.params, req.body);
    db_1.default.query('SELECT * FROM employer WHERE `user-name` = "' + params.userName.trim() + '"', function (error, result, fields) {
        if (error) {
            console.log("error", error);
        }
        else {
            if (!_.isEmpty(result)) {
                console.log(result);
                var err = new Error("User name is already taken!");
                return res.send(Boom.boomify(err, { statusCode: 400 }));
            }
            else {
                return next();
            }
        }
    });
};
exports.findEmployerByPhoneNumber = function (req, res, next) {
    var params = _.merge(req.params, req.body);
    db_1.default.query('SELECT * FROM employer WHERE `phone-number` = "' + params.phoneNumber + '"', function (error, result, fields) {
        if (error) {
            console.log("error", error);
        }
        else {
            if (!_.isEmpty(result)) {
                var err = new Error("This phone number is already used!");
                return res.send(Boom.boomify(err, { statusCode: 400 }));
            }
            else {
                return next();
            }
        }
    });
};
exports.addEmployer = function (req, res, next) {
    var params = _.merge(req.params, req.body);
    var employerData = {
        fullName: params.fullName,
        userName: params.userName,
        phoneNumber: params.phoneNumber,
        emailId: params.emailId,
        password: crypto.createHmac('sha256', config_1.default.SHA_KEY).update(params.password.trim()).digest('hex')
    };
    db_1.default.query('INSERT INTO employer SET ?', employerData, function (error, results, fields) {
        if (error)
            throw error;
        employerData.id = results.insertId;
        req.employer = employerData;
        return next();
    });
};
exports.validLoginCredentials = function (req, res, next) {
    var params = _.merge(req.body, req.params);
    if (_.isEmpty(params.userName)) {
        var err = new Error("Enter username or emaild");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isEmpty(params.password)) {
        var err = new Error("Enter password");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    var password = crypto.createHmac('sha256', config_1.default.SHA_KEY).update(params.password.trim()).digest('hex');
    db_1.default.query("SELECT id,`full-name`,`user-name`,`phone-number`,`email-id` FROM employer WHERE `email-id`= '" + params.userName + "' or `user-name`= '" + params.userName + "' and password= '" + password + "'", function (error, results, fields) {
        if (error)
            throw error;
        console.log(results);
        req.employer = results;
        return next();
    });
};
exports.generateToken = function (req, res, next) {
    var employer = req.employer;
    req.token = jwt.sign(JSON.stringify(employer), config_1.default.JWT_ENCRYPTION);
    console.log(req.token);
    return next();
};
//# sourceMappingURL=employerService.js.map