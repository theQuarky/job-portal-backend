import * as express from 'express';
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import Boom = require('boom');
import * as _ from 'lodash';
import * as fs from 'fs';
import CONFIG from '../config/config';

export const validateData: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction)=>{
    const params = _.merge(req.body, req.params);
    
    if(_.isEmpty(params.title)){
        const err = new Error("Title is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    if(_.isEmpty(params.shortDescription)){
        const err = new Error("Sort Description is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));  
    }

    if(_.isEmpty(params.description)){
        const err = new Error("Description is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    return next();
}



