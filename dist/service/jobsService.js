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
const JobModel_1 = require("../models/JobModel");
const sequelize_1 = require("sequelize");
const EmployerModel_1 = require("../models/EmployerModel");
exports.validateData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const param = _.merge(req.body, req.params);
    if (_.isUndefined(param.title)) {
        const err = new Error("Title is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.category)) {
        const err = new Error("category is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.employmentStatus)) {
        const err = new Error("employment status is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.qualification)) {
        const err = new Error("qualification is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.jobDescription)) {
        const err = new Error("job description is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.vacancy)) {
        const err = new Error("vacancy is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.responsibilities)) {
        const err = new Error("responsibilities is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.country)) {
        const err = new Error("country is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.location)) {
        const err = new Error("location is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.companyName)) {
        const err = new Error("company name is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.companyAddress)) {
        const err = new Error("company address is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.companyWebsite)) {
        const err = new Error("company website is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.companyProfile)) {
        const err = new Error("company profile is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    return next();
});
exports.makeDataPacket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    const dataPacket = {
        vacancy: params.vacancy || null,
        title: params.title || null,
        salary: params.salary || null,
        responsibilities: params.responsibilities || null,
        qualification: params.qualification || null,
        location: params.location || null,
        jobDescription: params.jobDescription || null,
        gender: params.gender || null,
        experience: params.experience || null,
        employmentStatus: params.employmentStatus || null,
        dealLine: params.dealLine || null,
        country: params.country || null,
        companyWebsite: params.companyWebsite || null,
        companyProfile: params.companyProfile || null,
        companyName: params.companyName || null,
        companyAddress: params.companyAddress || null,
        category: params.category || null,
        benefits: params.benefits || null,
        addedBy: req.data.employer.id
    };
    req.jobs = dataPacket;
    req.data = dataPacket;
    return next();
});
exports.insertJobs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.jobs;
    try {
        const response = yield JobModel_1.default.create(data);
        req.jobs = response;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error!!");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.getJobById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    if (_.isUndefined(params.id) || !_.isInteger(parseInt(params.id))) {
        const err = new Error("Invalid job id");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    try {
        const response = yield JobModel_1.default.findOne({
            where: {
                id: params.id,
                isDel: {
                    [sequelize_1.Op.not]: 1
                }
            },
            include: [{ as: 'employer', model: EmployerModel_1.default }]
        });
        if (_.isNull(response)) {
            const err = new Error(`Job with id ${params.id} is not found!!`);
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        }
        req.jobs = response;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error!!");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.deleteJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.params, req.body);
    try {
        const response = yield JobModel_1.default.update({ isDel: 1 }, {
            where: {
                id: params.id
            }
        });
        console.log(response);
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error!!");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.updateJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    const dataPacket = req.data;
    console.log(dataPacket);
    try {
        const response = yield JobModel_1.default.update(dataPacket, { where: { id: params.id } });
        console.log(response);
        req.data = response;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error!!");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.getAllJobs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield JobModel_1.default.findAll({
            where: {
                isDel: {
                    [sequelize_1.Op.not]: 1
                },
            },
            include: [
                {
                    as: 'employer',
                    model: EmployerModel_1.default,
                    attributes: ['id', 'fullName', 'userName', 'phoneNumber', 'avatar']
                }
            ]
        });
        req.jobs = response;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error!!");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.checkLoginType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.data.type;
    if (type !== "employer") {
        const err = new Error("Please login as employer!!");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    return next();
});
//# sourceMappingURL=jobsService.js.map