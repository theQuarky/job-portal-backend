import { Router, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import authentication from '../helpers/verifyToken';
import CONFIG from '../config/config';

const blog: Router = Router();

blog.post('/')

blog.get('/')

blog.put('/')

blog.delete('/')

export default blog;