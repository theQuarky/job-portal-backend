import { Router } from 'express';
import * as employerController from '../controller/employerController';
import * as employerService from '../service/employerService';
import authentication from "../helpers/verifyToken";
const employer: Router = Router();

employer.post('/register', [
    employerService.validateData,
    employerService.findEmployerByUserName,
    employerService.findEmployerByEmail,
    employerService.findEmployerByPhoneNumber,
    employerService.addEmployer,
    employerController.sendEmployer
]);

employer.get('/',[
    employerService.getAllEmployer,
    employerController.sendEmployer
]);

employer.put('/', authentication,[
    employerService.checkLoginType,
    employerService.validateDataForUpdate,
    employerService.findEmployerByEmailForUpdate,
    employerService.findEmployerByPhoneNumberForUpdate,
    employerService.updateEmployer,
    employerController.sendEmployer
]);

employer.delete('/',authentication,[
    employerService.checkLoginType,
    employerService.deleteEmployer,
    employerController.deleteEmployer
]);
employer.post('/login', [
    employerService.validLoginCredentials,
    employerService.generateToken,
    employerController.sendLoginToken
]);

export default employer;
