"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const candidateController = require("../controller/candidateController");
const candidateService = require("../service/candidateService");
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
exports.default = candidate;
//# sourceMappingURL=candidateRoute.js.map