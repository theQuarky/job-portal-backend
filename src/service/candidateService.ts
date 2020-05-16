import * as express from 'express';
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import CONFIG from '../config/config';
import { ICandidate } from '../interface/ICandidate';
import Boom = require('boom');
import CandidateModel from '../models/CandidateModel';

export const validateData: express.RequestHandler = (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params: any = _.merge(req.params, req.body);
    const emailIdRegEx: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (_.isEmpty(params.fullName.trim())) {
        const err = new Error("Enter Full Name");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    if (_.isEmpty(params.userName.trim())) {
        const err = new Error("Enter User Name");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    if (_.isEmpty(params.emailId.trim()) || !emailIdRegEx.test(params.emailId.trim())) {
        const err = new Error("Enter valid Email Id");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    if (_.isEmpty(params.phoneNumber.toString().trim()) || !_.isInteger(parseInt(params.phoneNumber)) || (params.phoneNumber.toString().length !== 10)) {
        const err = new Error("Enter Valid Phone Number");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    if (_.isEmpty(params.password.trim())) {
        const err = new Error("Enter Password");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    if (params.rePassword.trim() !== params.password.trim()) {
        const err = new Error("Password and Re-password are not matching");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    return next();
}

export const findCandidateByEmail: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params: any = _.merge(req.params, req.body);
    try {
        const data: ICandidate | any = await CandidateModel.findAll({
            where: {
                'email-id': params.emailId
            },
            attributes: ['id']
        });
        if (_.isEmpty(data) === false) {
            const err = new Error("Email id is used!!");
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        } else {
            return next();
        }
    } catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const findCandidateByUserName: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params: any = _.merge(req.params, req.body);
    try {
        const data: ICandidate | any = await CandidateModel.findAll({
            where: {
                'user-name': params.userName
            },
            attributes: ['id']
        });
        if (_.isEmpty(data) === false) {
            const err = new Error("Username is taken!!");
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        } else {
            return next();
        }
    } catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const findCandidateByPhoneNumber: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params: any = _.merge(req.params, req.body);
    try {
        const data: ICandidate | any = await CandidateModel.findAll({
            where: {
                'phone-number': params.phoneNumber
            },
            attributes: ['id']
        });

        if (_.isEmpty(data) === false) {
            const err = new Error("Phone number is used!!");
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        } else {
            return next();
        }
    } catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }

}

export const addCandidate: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params: any = _.merge(req.params, req.body);

    const candidateData: ICandidate = {
        'full-name': params.fullName,
        'user-name': params.userName,
        'phone-number': params.phoneNumber,
        'email-id': params.emailId,
        'password': crypto.createHmac('sha256', CONFIG.SHA_KEY).update(params.password.trim()).digest('hex')
    }
    try {
        const data = await CandidateModel.create(candidateData);
        req.candidate = data;
        return next();
    } catch (error) {
        console.log(error)
        return res.send(Boom.boomify(error, { statusCode: 500 }));
    }
}

export const validLoginCredentials: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params = _.merge(req.body, req.params);

    if (_.isEmpty(params.userName)) {
        const err = new Error("Enter username or email id");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isEmpty(params.password)) {
        const err = new Error("Enter password");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    const password = crypto.createHmac('sha256', CONFIG.SHA_KEY).update(params.password.trim()).digest('hex');

    try {
        const data: ICandidate | any = await CandidateModel.findOne({
            where: {
                'user-name': params.userName,
                'password': password
            },
            raw: true
        });
        if(_.isEmpty(data)){
            const err = new Error("Username and password is not matching!!");
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        }
        req.candidate = data;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const generateToken: express.RequestHandler = (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const candidate = req.candidate;
    req.token = jwt.sign(JSON.stringify(candidate), CONFIG.JWT_ENCRYPTION);
    console.log(req.token);
    return next();
}