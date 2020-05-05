import { Router, NextFunction } from 'express';
import * as candidateController from '../controller/candidateController';
import * as candidateService from '../service/candidateService';
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';

const candidate: Router = Router();

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

export default candidate;
