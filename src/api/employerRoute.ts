import { Router, NextFunction } from 'express';
import * as employerController from '../controller/employerController';
import * as employerService from '../service/employerService';

const employer: Router = Router();

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

export default employer;
