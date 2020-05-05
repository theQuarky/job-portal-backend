"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var _ = require("lodash");
var db_1 = require("../config/db");
var config_1 = require("../config/config");
exports.validateData = function (req, res, next) {
    var params = _.merge(req.params, req.body);
    var emailIdRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (_.isEmpty(params.fullName.trim())) {
        return res.boom.badRequest("Enter Full Name");
    }
    if (_.isEmpty(params.userName.trim())) {
        return res.boom.badRequest("Enter User Name");
    }
    if (_.isEmpty(params.emailId.trim()) || !emailIdRegEx.test(params.emailId.trim())) {
        return res.boom.badRequest("Enter valid Email Id");
    }
    if (_.isEmpty(params.phoneNumber.toString().trim()) || !_.isInteger(params.phoneNumber) || (params.phoneNumber.toString().length !== 10)) {
        return res.boom.badRequest("Enter Valid Phone Number");
    }
    if (_.isEmpty(params.password.trim())) {
        return res.boom.badRequest("Enter Password");
    }
    if (params.rePassword.trim() !== params.password.trim()) {
        return res.boom.badRequest("Password and Re-password are not matching");
    }
    return next();
};
exports.findCandidateByEmail = function (req, res, next) {
    var params = _.merge(req.params, req.body);
    db_1.default.query('SELECT * FROM candidate WHERE `email-id` = "' + params.emailId.trim() + '"', function (error, result, fields) {
        if (error) {
            console.log("error", error);
        }
        else {
            if (!_.isEmpty(result)) {
                return res.boom.badData("Email id is already taken!");
            }
            else {
                return next();
            }
        }
    });
};
exports.findCandidateByUserName = function (req, res, next) {
    var params = _.merge(req.params, req.body);
    db_1.default.query('SELECT * FROM candidate WHERE `user-name` = "' + params.userName.trim() + '"', function (error, result, fields) {
        if (error) {
            console.log("error", error);
        }
        else {
            if (!_.isEmpty(result)) {
                console.log(result);
                return res.boom.badData("User name is already taken!");
            }
            else {
                return next();
            }
        }
    });
};
exports.findCandidateByPhoneNumber = function (req, res, next) {
    var params = _.merge(req.params, req.body);
    db_1.default.query('SELECT * FROM candidate WHERE `phone-number` = "' + params.phoneNumber + '"', function (error, result, fields) {
        if (error) {
            console.log("error", error);
        }
        else {
            if (!_.isEmpty(result)) {
                return res.boom.badData("This phone number is already used!");
            }
            else {
                return next();
            }
        }
    });
};
exports.addCandidate = function (req, res, next) {
    var params = _.merge(req.params, req.body);
    var candidateData = {
        'full-name': params.fullName,
        'user-name': params.userName,
        'phone-number': params.phoneNumber,
        'email-id': params.emailId,
        'password': crypto.createHmac('sha256', config_1.default.SHA_KEY).update(params.password.trim()).digest('hex')
    };
    db_1.default.query('INSERT INTO candidate SET ?', candidateData, function (error, results, fields) {
        if (error)
            throw error;
        candidateData.id = results.insertId;
        req.candidate = candidateData;
        return next();
    });
};
exports.validLoginCredentials = function (req, res, next) {
    var params = _.merge(req.body, req.params);
    if (_.isEmpty(params.userName)) {
        return res.boom.badData("Enter username or emaild");
    }
    if (_.isEmpty(params.password)) {
        return res.boom.badData("Enter password");
    }
    var password = crypto.createHmac('sha256', config_1.default.SHA_KEY).update(params.password.trim()).digest('hex');
    db_1.default.query("SELECT id,`full-name`,`user-name`,`phone-number`,`email-id` FROM candidate WHERE `email-id`= '" + params.userName + "' or `user-name`= '" + params.userName + "' and password= '" + password + "'", function (error, results, fields) {
        if (error)
            throw error;
        console.log(results);
        req.candidate = results;
        return next();
    });
};
exports.generateToken = function (req, res, next) {
    var candidate = req.candidate;
    req.token = jwt.sign(JSON.stringify(candidate), config_1.default.JWT_ENCRYPTION);
    console.log(req.token);
    return next();
};
//# sourceMappingURL=candidateService.js.map