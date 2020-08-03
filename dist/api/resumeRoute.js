"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../helpers/verifyToken");
const resumeService = require("../service/resumeService");
const educationService = require("../service/educationService");
const experienceService = require("../service/experienceService");
const resumeController = require("../controller/resumeController");
const candidateService = require("../service/candidateService");
const multer = require("multer");
const upload = multer();
const resume = express_1.Router();
resume.post('/', verifyToken_1.default, [
    resumeService.checkLoginType,
    resumeService.validateData,
    resumeService.makeDataPacket,
    resumeService.insertData,
    educationService.makeDataPacket,
    educationService.insertData,
    experienceService.makeDataPacket,
    experienceService.insertData,
    resumeController.insertData
]);
resume.get('/:id', [
    resumeService.getAllResumeById,
    resumeController.readData
]);
resume.get('/', [
    resumeService.getAllResume,
    resumeController.readData
]);
resume.get('/candidate/:id', [
    candidateService.findCandidateById,
    resumeService.getAllResumeByCandidateId,
    resumeController.readData
]);
resume.put('/:id', verifyToken_1.default, [
    resumeService.checkLoginType,
    resumeService.validateData,
    resumeService.getAllResumeById,
    resumeService.validateCandidateIdForResume,
    resumeService.makeDataPacket,
    resumeService.updateResume,
    educationService.deleteData,
    educationService.makeDataPacket,
    educationService.insertData,
    experienceService.deleteData,
    experienceService.makeDataPacket,
    experienceService.insertData,
    resumeController.insertData
]);
resume.delete('/:id', verifyToken_1.default, [
    resumeService.checkLoginType,
    resumeService.getAllResumeById,
    resumeService.validateCandidateIdForResume,
    resumeService.deleteResume,
    resumeController.deleteData
]);
resume.put('/uploadResume/', verifyToken_1.default, upload.single('resumeFile'), [
    resumeService.checkLoginType,
    resumeService.uploadResume,
    resumeService.updateResumePath,
    resumeController.resumePath
]);
exports.default = resume;
//# sourceMappingURL=resumeRoute.js.map