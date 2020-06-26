import { Router, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import authentication from '../helpers/verifyToken';
import CONFIG from '../config/config';

const vlog: Router = Router();

vlog.post('/')

vlog.get('/')

vlog.put('/')

vlog.delete('/')

export default vlog;