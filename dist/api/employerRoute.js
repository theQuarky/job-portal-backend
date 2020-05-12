"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var employerController = require("../controller/employerController");
var employerService = require("../service/employerService");
var employer = express_1.Router();
employer.post('/register', [
    employerService.validateData,
    employerService.findEmployerByUserName,
    employerService.findEmployerByEmail,
    employerService.findEmployerByPhoneNumber,
    employerService.addEmployer,
    employerController.sendEmployer
]);
employer.post('/login', [
    employerService.validLoginCredentials,
    employerService.generateToken,
    employerController.sendLoginToken
]);
exports.default = employer;
//# sourceMappingURL=employerRoute.js.map