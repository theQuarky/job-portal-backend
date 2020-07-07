import { Router, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import * as vlogService from '../service/vlogService';
import * as vlogController from '../controller/vlogControllers';
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import authentication from '../helpers/verifyToken';
import CONFIG from '../config/config';

import multer = require('multer');

const upload = multer();

const vlog: Router = Router();

vlog.post('/',authentication,[
    vlogService.checkLoginType,
    vlogService.validateData,
    vlogService.uploadVlog,
    vlogService.insertVlog,
    vlogController.allVlogs
]);

vlog.get('/',[
    vlogService.getAllVlog,
    vlogController.allVlogs
]);

vlog.get('/:id',[
    vlogService.findVlogById,
    vlogController.allVlogs
]);

vlog.put('/:id',authentication,[
    vlogService.checkLoginType,
    vlogService.validateData,
    vlogService.findVlogById,
    vlogService.updateVlog,
    vlogController.updateVlogs
]);

vlog.put('/upload/:id',authentication,upload.single('vlogImg'),[
    vlogService.checkLoginType,
    vlogService.findVlogById,
    vlogService.uploadVlog,
    vlogService.updateImgPath,
    vlogController.updateVlogs
]);

vlog.delete('/:id',authentication,[
    vlogService.findVlogById,
    vlogService.deletVlog,
    vlogController.deleteVlog
]);

export default vlog;