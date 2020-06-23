import { Router, NextFunction } from 'express';
import * as candidateController from '../controller/candidateController';
import * as candidateService from '../service/candidateService';
import authentication from '../helpers/verifyToken';

const candidate: Router = Router();

candidate.post('/register', [
    candidateService.validateData,
    candidateService.findCandidateByEmail,
    candidateService.findCandidateByUserName,
    candidateService.findCandidateByPhoneNumber,
    candidateService.addCandidate,
    candidateController.sendCandidate
]);

candidate.get('/',[
    candidateService.getAllCandidate,
    candidateController.sendCandidate
]);

candidate.put('/', authentication,[
    candidateService.checkLoginType,
    candidateService.validateDataForUpdate,
    candidateService.findCandidateByEmailForUpdate,
    candidateService.findCandidateByPhoneNumberForUpdate,
    candidateService.updateCandidate,
    candidateController.sendCandidate
]);

candidate.delete('/',authentication,[
    candidateService.checkLoginType,
    candidateService.deleteCandidate,
    candidateController.deleteCandidate
]);

candidate.post('/login', [
    candidateService.validLoginCredentials,
    candidateService.generateToken,
    candidateController.sendLoginToken
]);

export default candidate;
