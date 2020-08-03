"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const candidateController = require("../controller/candidateController");
const candidateService = require("../service/candidateService");
const verifyToken_1 = require("../helpers/verifyToken");
const multer = require("multer");
const upload = multer();
const candidate = express_1.Router();
candidate.post('/register', [
    candidateService.validateData,
    candidateService.findCandidateByEmail,
    candidateService.findCandidateByUserName,
    candidateService.findCandidateByPhoneNumber,
    candidateService.addCandidate,
    candidateController.sendCandidate
]);
candidate.post('/login', [
    candidateService.validLoginCredentials,
    candidateService.generateToken,
    candidateController.sendLoginToken
]);
candidate.put('/avatar', verifyToken_1.default, upload.single('avatar'), [
    candidateService.checkLoginType,
    candidateService.uploadAvatar,
    candidateService.updateAvatarPath,
    candidateController.avatarPath
]);
candidate.get('/', [
    candidateService.getAllCandidate,
    candidateController.sendCandidate
]);
candidate.put('/', verifyToken_1.default, [
    candidateService.checkLoginType,
    candidateService.validateDataForUpdate,
    candidateService.findCandidateByEmailForUpdate,
    candidateService.findCandidateByPhoneNumberForUpdate,
    candidateService.updateCandidate,
    candidateController.sendCandidate
]);
candidate.delete('/', verifyToken_1.default, [
    candidateService.checkLoginType,
    candidateService.deleteCandidate,
    candidateController.deleteCandidate
]);
exports.default = candidate;
//# sourceMappingURL=candidateRoute.js.map