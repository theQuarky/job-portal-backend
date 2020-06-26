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
const EducationModel_1 = require("../models/EducationModel");
const Boom = require("boom");
const _ = require("lodash");
exports.makeDataPacket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    if (_.isEmpty(params.education)) {
        return next();
    }
    let flag = false;
    const dataPacket = [];
    const educations = params.education;
    yield educations.forEach((education) => {
        if (_.isEmpty(education.designation) || _.isEmpty(education.institute)) {
            flag = true;
        }
        const packet = {
            resumeId: req.resumes.id,
            designation: education.designation,
            institute: education.institute,
            startYear: education.startYear || null,
            endYear: education.endYear || null
        };
        dataPacket.push(packet);
    });
    if (flag) {
        const err = new Error("Designation and institute is require!!");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    req.educations = dataPacket;
    return next();
});
exports.insertData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (_.isEmpty(req.educations) || _.isUndefined(req.educations)) {
        return next();
    }
    const dataPacket = req.educations;
    try {
        const response = yield EducationModel_1.default.bulkCreate(dataPacket);
        req.educations = response;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error!");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.deleteData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    try {
        const response = yield EducationModel_1.default.destroy({
            where: {
                resumeId: parseInt(id)
            }
        });
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error!");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
//# sourceMappingURL=educationService.js.map