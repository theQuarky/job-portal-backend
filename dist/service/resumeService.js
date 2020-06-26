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
const Boom = require("boom");
const _ = require("lodash");
const fs = require("fs");
const ResumeModel_1 = require("../models/ResumeModel");
const ExperienceModel_1 = require("../models/ExperienceModel");
const EducationModel_1 = require("../models/EducationModel");
const multer = require("multer");
const upload = multer({ dest: '../upload/resumes/' });
exports.checkLoginType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.data.type;
    if (type !== "candidate") {
        const err = new Error("Please login as candidate!!");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    return next();
});
exports.validateData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    if (_.isEmpty(params.fullName)) {
        const err = new Error("Full name is require!!");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isEmpty(params.aboutYou)) {
        const err = new Error("About you is require!!");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    // if (_.isEmpty(params.addedBy)) {
    //     const err = new Error("Candidate id is require");
    //     return res.send(Boom.boomify(err, { statusCode: 400 }));
    // }
    return next();
});
exports.makeDataPacket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params, req.data);
    const dataPacket = {
        fullName: params.fullName,
        location: params.location || null,
        experienceYear: params.experienceYear || 0,
        aboutYou: params.aboutYou,
        addedBy: req.data.candidate.id,
        resumePath: params.resumePath || null
    };
    req.data = dataPacket;
    req.resumes = dataPacket;
    return next();
});
exports.insertData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.data;
    try {
        const response = yield ResumeModel_1.default.create(data);
        req.resumes = response;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.getAllResume = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield ResumeModel_1.default.findAll({
            where: {
                isDel: 0
            },
            offset: parseInt(fromLimit),
            limit: parseInt(toLimit),
            include: [
                { model: EducationModel_1.default },
                { model: ExperienceModel_1.default }
            ],
            attributes: ["id", "fullName", "location", "experienceYear", "aboutYou", "addedBy", "resumePath"]
        });
        req.data = response;
        req.resumes = response;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.getAllResumeByCandidateId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.params, req.body, req.query);
    try {
        const response = yield ResumeModel_1.default.findAll({
            where: {
                addedBy: parseInt(params.id),
                isDel: 0
            },
            include: [
                { model: EducationModel_1.default },
                { model: ExperienceModel_1.default }
            ],
            attributes: ["id", "fullName", "location", "experienceYear", "aboutYou", "addedBy", "resumePath"]
        });
        req.data = response;
        req.resumes = response;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.getAllResumeById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.params, req.body, req.query);
    if (_.isUndefined(params.id) || !_.isInteger(parseInt(params.id))) {
        const err = new Error("Unvalid resume id");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    try {
        const response = yield ResumeModel_1.default.findOne({
            where: {
                id: parseInt(params.id),
                isDel: 0
            },
            include: [
                { model: EducationModel_1.default },
                { model: ExperienceModel_1.default }
            ],
            attributes: ["id", "fullName", "location", "experienceYear", "aboutYou", "addedBy", "resumePath"]
        });
        if (_.isEmpty(response) === false) {
            req.resumes = response;
            return next();
        }
        else {
            const err = new Error("could not found resume");
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        }
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.updateResume = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.params, req.body, req.query);
    const data = req.data;
    try {
        const response = yield ResumeModel_1.default.update(data, {
            where: {
                id: parseInt(params.id)
            }
        });
        data.id = params.id;
        req.resumes = data;
        console.log(response);
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.deleteResume = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.params, req.body, req.query);
    try {
        const response = yield ResumeModel_1.default.update({
            isDel: 1
        }, {
            where: {
                id: parseInt(params.id)
            }
        });
        req.resumes = response;
        console.log(response);
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.validateCandidateIdForResume = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.params, req.body, req.query);
    const checkData = req.resumes;
    if (req.data.candidate.id !== checkData.addedBy) {
        const err = new Error("You can not update this resume");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    return next();
});
exports.uploadResume = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (_.isUndefined(file)) {
        const err = new Error("You must have to upload resume!!");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    const fileName = file.originalname;
    const extensions = ['pdf', 'doc', 'docx', 'docm', 'dotx', 'dotm', 'docb'];
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
    fileExtenstion = fileExtenstion.reverse().join("");
    if (extensions.includes(fileExtenstion) === false) {
        const err = new Error("Invalid file");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    const tempName = Date.now() + fileName;
    const fileDdestination = './uploads/resumes/' + tempName;
    try {
        fs.writeFileSync(fileDdestination, file.buffer.toString('base64'), { encoding: 'base64' });
        req.resumes.resumePath = '/static/resumes/' + tempName;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.updateResumePath = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    try {
        const response = yield ResumeModel_1.default.update({ resumePath: req.resumes.resumePath }, {
            where: {
                id: params.id
            }
        });
        console.log(response);
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
//# sourceMappingURL=resumeService.js.map