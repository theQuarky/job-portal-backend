import { Router } from 'express';
import authentication from '../helpers/verifyToken';
import * as resumeService from '../service/resumeService';
import * as educationService from '../service/educationService';
import * as experienceService from '../service/experienceService';
import * as resumeController from '../controller/resumeController';

const resume: Router = Router();

resume.post('/',authentication,[
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

export default resume;