import { Router } from 'express';
import * as employerController from '../controller/employerController';
import * as employerService from '../service/employerService';
import authentication from "../helpers/verifyToken";
import multer = require('multer');

const upload = multer();
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

employer.put('/avatar', authentication,upload.single('avatar'),[
    employerService.checkLoginType,
    employerService.uploadAvatar,
    employerService.updateAvatarPath,
    employerController.avatarPath
]);

employer.get('/',[
    employerService.getAllEmployer,
    employerController.sendEmployer
]);

employer.put('/:id', authentication,[
    employerService.checkLoginType,
    employerService.confirmId,
    employerService.validateDataForUpdate,
    employerService.findEmployerByEmailForUpdate,
    employerService.findEmployerByPhoneNumberForUpdate,
    employerService.updateEmployer,
    employerController.sendEmployer
]);

employer.delete('/:id',authentication,[
    employerService.checkLoginType,
    employerService.confirmId,
    employerService.deleteEmployer,
    employerController.deleteEmployer
]);

export default employer;
