"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var candidateController = require("../controller/candidateController");
var candidateService = require("../service/candidateService");
var candidate = express_1.Router();
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