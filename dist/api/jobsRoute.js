"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobController = require("../controller/jobsController");
const jobServices = require("../service/jobsService");
const verifyToken_1 = require("../helpers/verifyToken");
const jobs = express_1.Router();
// jobs.get('/', authentication, [
//     jobServices.checkLoginType,
//     jobController.tempController
// ]);
jobs.post('/', verifyToken_1.default, [
    jobServices.checkLoginType,
    jobServices.validateData,
    jobServices.makeDataPacket,
    jobServices.insertJobs,
    jobController.tempController
]);
jobs.get('/', [
    jobServices.getAllJobs,
    jobController.allJobs
]);
jobs.get('/:id', [
    jobServices.getJobById,
    jobController.jobById
]);
jobs.put('/:id', verifyToken_1.default, [
    jobServices.checkLoginType,
    jobServices.validateData,
    jobServices.makeDataPacket,
    jobServices.getJobById,
    jobServices.updateJob,
    jobController.updateJobs
]);
jobs.delete('/:id', verifyToken_1.default, [
    jobServices.checkLoginType,
    jobServices.getJobById,
    jobServices.deleteJob,
    jobController.deleteJob
]);
exports.default = jobs;
//# sourceMappingURL=jobsRoute.js.map