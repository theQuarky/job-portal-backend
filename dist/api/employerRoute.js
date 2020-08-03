"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employerController = require("../controller/employerController");
const employerService = require("../service/employerService");
const verifyToken_1 = require("../helpers/verifyToken");
const multer = require("multer");
const upload = multer();
const employer = express_1.Router();
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
employer.put('/avatar', verifyToken_1.default, upload.single('avatar'), [
    employerService.checkLoginType,
    employerService.uploadAvatar,
    employerService.updateAvatarPath,
    employerController.avatarPath
]);
employer.get('/', [
    employerService.getAllEmployer,
    employerController.sendEmployer
]);
employer.get('/:id', [
    employerService.getEmployerById,
    employerController.sendEmployer
]);
employer.put('/:id', verifyToken_1.default, [
    employerService.checkLoginType,
    employerService.confirmId,
    employerService.validateDataForUpdate,
    employerService.findEmployerByEmailForUpdate,
    employerService.findEmployerByPhoneNumberForUpdate,
    employerService.updateEmployer,
    employerService.getEmployerById,
    employerService.generateToken,
    employerController.sendLoginToken
]);
employer.put('/changePassword/:id', verifyToken_1.default, []);
employer.delete('/:id', verifyToken_1.default, [
    employerService.checkLoginType,
    employerService.deleteEmployer,
    employerController.deleteEmployer
]);
exports.default = employer;
//# sourceMappingURL=employerRoute.js.map