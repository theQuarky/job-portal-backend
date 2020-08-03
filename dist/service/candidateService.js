"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const fs = require("fs");
const config_1 = require("../config/config");
const Boom = require("boom");
const CandidateModel_1 = require("../models/CandidateModel");
const sequelize_1 = require("sequelize");
exports.validateData = (req, res, next) => {
    const params = _.merge(req.params, req.body);
    const emailIdRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    console.log("afsdf");
    if (_.isEmpty(params.fullName)) {
        const err = new Error("Enter Full Name");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isEmpty(params.userName)) {
        const err = new Error("Enter User Name");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isEmpty(params.emailId) || !emailIdRegEx.test(params.emailId)) {
        const err = new Error("Enter valid Email Id");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isEmpty(params.phoneNumber.toString()) || !_.isInteger(parseInt(params.phoneNumber)) || (params.phoneNumber.toString().length !== 10)) {
        const err = new Error("Enter Valid Phone Number");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isEmpty(params.password)) {
        const err = new Error("Enter Password");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (params.rePassword !== params.password) {
        const err = new Error("Password and Re-password are not matching");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    return next();
};
exports.validateDataForUpdate = (req, res, next) => {
    const params = _.merge(req.params, req.body);
    const emailIdRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    console.log("afsdf");
    if (_.isEmpty(params.fullName)) {
        const err = new Error("Enter Full Name");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isEmpty(params.userName)) {
        const err = new Error("Enter User Name");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isEmpty(params.emailId) || !emailIdRegEx.test(params.emailId)) {
        const err = new Error("Enter valid Email Id");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isEmpty(params.phoneNumber.toString()) || !_.isInteger(parseInt(params.phoneNumber)) || (params.phoneNumber.toString().length !== 10)) {
        const err = new Error("Enter Valid Phone Number");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    return next();
};
exports.checkLoginType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.data.type;
    if (type !== "candidate") {
        const err = new Error("Please login as candidate!!");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    return next();
});
exports.findCandidateByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.params, req.body);
    try {
        const data = yield CandidateModel_1.default.findAll({
            where: {
                emailId: params.emailId,
                isDel: 0
            },
            attributes: ['id']
        });
        if (_.isEmpty(data) === false) {
            const err = new Error("Email id is used!!");
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        }
        else {
            return next();
        }
    }
    catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.findCandidateById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.params, req.body);
    if (_.isUndefined(params.id) || !_.isInteger(parseInt(params.id))) {
        const err = new Error("Unvalid candidate id");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    try {
        const data = yield CandidateModel_1.default.findAll({
            where: {
                id: parseInt(params.id),
                isDel: 0
            },
            attributes: ['id']
        });
        if (_.isEmpty(data) === false) {
            req.candidate = data;
            return next();
        }
        else {
            const err = new Error("could not found candidate");
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        }
    }
    catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.findCandidateByUserName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.params, req.body);
    try {
        const data = yield CandidateModel_1.default.findAll({
            where: {
                userName: params.userName,
                isDel: 0
            },
            attributes: ['id']
        });
        if (_.isEmpty(data) === false) {
            const err = new Error("Username is taken!!");
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        }
        else {
            return next();
        }
    }
    catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.findCandidateByPhoneNumber = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.params, req.body);
    try {
        const data = yield CandidateModel_1.default.findAll({
            where: {
                phoneNumber: params.phoneNumber,
                isDel: 0
            },
            attributes: ['id']
        });
        if (_.isEmpty(data) === false) {
            const err = new Error("Phone number is used!!");
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        }
        else {
            return next();
        }
    }
    catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.addCandidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.params, req.body);
    const candidateData = {
        fullName: params.fullName,
        userName: params.userName,
        phoneNumber: params.phoneNumber,
        emailId: params.emailId,
        password: crypto.createHmac('sha256', config_1.default.SHA_KEY).update(params.password).digest('hex')
    };
    try {
        const data = yield CandidateModel_1.default.create(candidateData);
        req.candidate = data;
        return next();
    }
    catch (error) {
        console.log(error);
        return res.send(Boom.boomify(error, { statusCode: 500 }));
    }
});
exports.validLoginCredentials = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    if (_.isEmpty(params.userName)) {
        const err = new Error("Enter username or email id");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isEmpty(params.password)) {
        const err = new Error("Enter password");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    const password = crypto.createHmac('sha256', config_1.default.SHA_KEY).update(params.password).digest('hex');
    try {
        const data = yield CandidateModel_1.default.findOne({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        [sequelize_1.Op.and]: {
                            emailId: {
                                [sequelize_1.Op.eq]: params.userName
                            },
                            password: {
                                [sequelize_1.Op.eq]: password
                            }
                        }
                    },
                    {
                        [sequelize_1.Op.and]: {
                            userName: {
                                [sequelize_1.Op.eq]: params.userName
                            },
                            password: {
                                [sequelize_1.Op.eq]: password
                            }
                        }
                    }
                ],
                isDel: 0
            },
            attributes: ["id", "fullName", "emailId", "phoneNumber", "userName", "avatar"]
        });
        if (_.isEmpty(data)) {
            const err = new Error("Username and password is not matching!!");
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        }
        req.candidate = data;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.generateToken = (req, res, next) => {
    const candidate = { candidate: req.candidate, type: 'candidate' };
    req.token = jwt.sign(JSON.stringify(candidate), config_1.default.JWT_ENCRYPTION);
    console.log(req.token);
    return next();
};
exports.findCandidateByEmailForUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.params, req.body);
    const id = req.data.candidate.id;
    try {
        const data = yield CandidateModel_1.default.findAll({
            where: {
                emailId: params.emailId,
                isDel: 0,
                id: {
                    [sequelize_1.Op.not]: id
                }
            },
            attributes: ['id']
        });
        if (_.isEmpty(data) === false) {
            const err = new Error("Email id is used!!");
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        }
        else {
            return next();
        }
    }
    catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.findCandidateByPhoneNumberForUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.params, req.body);
    const id = req.data.candidate.id;
    try {
        const data = yield CandidateModel_1.default.findAll({
            where: {
                phoneNumber: params.phoneNumber,
                isDel: 0,
                id: {
                    [sequelize_1.Op.not]: id
                }
            },
            attributes: ['id']
        });
        if (_.isEmpty(data) === false) {
            const err = new Error("Phone number is used!!");
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        }
        else {
            return next();
        }
    }
    catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.updateCandidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.params, req.body);
    const id = req.data.candidate.id;
    const candidateData = {
        fullName: params.fullName,
        userName: params.userName,
        phoneNumber: params.phoneNumber,
        emailId: params.emailId
    };
    try {
        const data = yield CandidateModel_1.default.update(candidateData, {
            where: {
                id: id,
                isDel: 0
            }
        });
        req.candidate = data;
        return next();
    }
    catch (error) {
        console.log(error);
        return res.send(Boom.boomify(error, { statusCode: 500 }));
    }
});
exports.deleteCandidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.params, req.body);
    const id = req.data.candidate.id;
    try {
        const data = yield CandidateModel_1.default.update({ isDel: 1 }, {
            where: {
                id: id
            }
        });
        req.candidate = data;
        return next();
    }
    catch (error) {
        console.log(error);
        return res.send(Boom.boomify(error, { statusCode: 500 }));
    }
});
exports.getAllCandidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.params, req.body, req.query);
    let fromLimit, toLimit;
    console.log(params.fromLimit, params.toLimit);
    if (_.isUndefined(params.fromLimit) || _.isUndefined(params.fromLimit) || !_.isInteger(parseInt(params.fromLimit)) || !_.isInteger(parseInt(params.toLimit))) {
        fromLimit = 0;
        toLimit = 10;
    }
    else {
        fromLimit = params.fromLimit;
        toLimit = params.toLimit;
    }
    try {
        const data = yield CandidateModel_1.default.findAll({
            where: {
                isDel: 0
            },
            offset: parseInt(fromLimit),
            limit: parseInt(toLimit)
        });
        req.candidate = data;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.uploadAvatar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (_.isUndefined(file)) {
        const err = new Error("You must have to upload image!!");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    try {
        const fileName = file.originalname;
        const extensions = ['png', 'jpg', 'jpeg'];
        const fileNameArray = fileName.split("");
        let fileNameLength = fileNameArray.length;
        let charFlag = fileNameArray[fileNameLength];
        let fileExtenstion = [];
        while (charFlag !== ".") {
            fileNameLength = fileNameLength - 1;
            charFlag = fileNameArray[fileNameLength];
            fileExtenstion.push(charFlag);
        }
        fileExtenstion.pop();
        fileExtenstion = fileExtenstion.reverse().join("").toLowerCase();
        if (extensions.includes(fileExtenstion) === false) {
            const err = new Error("Invalid file");
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        }
        const tempName = Date.now() + fileName;
        const fileDdestination = './uploads/avatars/' + tempName;
        fs.writeFileSync(fileDdestination, file.buffer.toString('base64'), { encoding: 'base64' });
        req.candidate = { avatar: '/static/avatars/' + tempName };
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.updateAvatarPath = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.data.candidate.id;
    try {
        const response = yield CandidateModel_1.default.update({ avatar: req.candidate.avatar }, {
            where: {
                id: id
            }
        });
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
//# sourceMappingURL=candidateService.js.map