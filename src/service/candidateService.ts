import * as express from 'express';
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import connection from '../config/db';
import CONFIG from '../config/config';
import { ICandidate } from '../interface/ICandidate';
import Boom = require('boom');

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

export const findCandidateByEmail: express.RequestHandler = (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params: any = _.merge(req.params, req.body);

    connection.query('SELECT * FROM candidate WHERE `email-id` = "' + params.emailId.trim() + '"', function (error, result, fields) {
        if (error) {
            console.log("error", error);
        } else {
            if (!_.isEmpty(result)) {
                const err = new Error("Email id is already taken!");
                return res.send(Boom.boomify(err, { statusCode: 400 }));
            } else {
                return next();
            }
        }
    });
}

export const findCandidateByUserName: express.RequestHandler = (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params: any = _.merge(req.params, req.body);

    connection.query('SELECT * FROM candidate WHERE `user-name` = "' + params.userName.trim() + '"', function (error, result, fields) {
        if (error) {
            console.log("error", error);
        } else {
            if (!_.isEmpty(result)) {
                console.log(result);
                const err = new Error("User name is already taken!");
                return res.send(Boom.boomify(err, { statusCode: 400 }));
            } else {
                return next();
            }
        }
    });
}

export const findCandidateByPhoneNumber: express.RequestHandler = (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params: any = _.merge(req.params, req.body);

    connection.query('SELECT * FROM candidate WHERE `phone-number` = "' + params.phoneNumber + '"', function (error, result, fields) {
        if (error) {
            console.log("error", error);
        } else {
            if (!_.isEmpty(result)) {
                const err = new Error("This phone number is already used!");
                return res.send(Boom.boomify(err, { statusCode: 400 }));
            } else {
                return next();
            }
        }
    });
}

export const addCandidate: express.RequestHandler = (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params: any = _.merge(req.params, req.body);

    const candidateData: ICandidate = {
        'full-name': params.fullName,
        'user-name': params.userName,
        'phone-number': params.phoneNumber,
        'email-id': params.emailId,
        'password': crypto.createHmac('sha256', CONFIG.SHA_KEY).update(params.password.trim()).digest('hex')
    }

    connection.query('INSERT INTO candidate SET ?', candidateData,
        function (error, results, fields) {
            if (error) throw error;

            candidateData.id = results.insertId;
            req.candidate = candidateData;

            return next();
        });
}

export const validLoginCredentials: express.RequestHandler = (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params = _.merge(req.body, req.params);

    if (_.isEmpty(params.userName)) {
        const err = new Error("Enter username or emaild");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isEmpty(params.password)) {
        const err = new Error("Enter password");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    const password = crypto.createHmac('sha256', CONFIG.SHA_KEY).update(params.password.trim()).digest('hex');
    connection.query("SELECT id,`full-name`,`user-name`,`phone-number`,`email-id` FROM candidate WHERE `email-id`= '" + params.userName + "' or `user-name`= '" + params.userName + "' and password= '" + password + "'",
        function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            req.candidate = results;
            return next();
        });
}

export const generateToken: express.RequestHandler = (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const candidate = req.candidate;
    req.token = jwt.sign(JSON.stringify(candidate), CONFIG.JWT_ENCRYPTION);
    console.log(req.token)
    return next()
}