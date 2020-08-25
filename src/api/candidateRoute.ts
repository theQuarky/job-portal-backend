import { Router, NextFunction } from 'express';
import * as candidateController from '../controller/candidateController';
import * as candidateService from '../service/candidateService';
import authentication from '../helpers/verifyToken';
import multer = require('multer');

const upload = multer();
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

candidate.put('/avatar', authentication,upload.single('avatar'),[
    candidateService.checkLoginType,
    candidateService.uploadAvatar,
    candidateService.updateAvatarPath,
    candidateController.avatarPath
]);

candidate.get('/',[
    candidateService.getAllCandidate,
    candidateController.sendCandidate
]);

candidate.get('/:id',[
    candidateService.getCandidateById,
    candidateController.sendCandidate
]);

candidate.put('/changePassword/:id',authentication,[
    candidateService.checkPassword,
    candidateService.changePassword,
    candidateController.changePassword
]);

candidate.put('/:id', authentication,[
    candidateService.checkLoginType,
    candidateService.confirmId,
    candidateService.validateDataForUpdate,
    candidateService.findCandidateByEmailForUpdate,
    candidateService.findCandidateByPhoneNumberForUpdate,
    candidateService.updateCandidate,
    candidateService.getCandidateById,
    candidateService.generateToken,
    candidateController.sendLoginToken
]);

candidate.delete('/',authentication,[
    candidateService.checkLoginType,
    candidateService.deleteCandidate,
    candidateController.deleteCandidate
]);

export default candidate;
