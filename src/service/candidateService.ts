import * as express from 'express';
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import connection from '../config/db';
import CONFIG from '../config/config';
import { ICandidate } from '../interface/ICandidate';
import candidate from '../api/candidateRoute';

export const validateData: express.RequestHandler = (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params: any = _.merge(req.params, req.body);
    const emailIdRegEx: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (_.isEmpty(params.fullName.trim())) {
        return res.boom.badRequest("Enter Full Name");
    }

    if (_.isEmpty(params.userName.trim())) {
        return res.boom.badRequest("Enter User Name");
    }

    if (_.isEmpty(params.emailId.trim()) || !emailIdRegEx.test(params.emailId.trim())) {
        return res.boom.badRequest("Enter valid Email Id");
    }

    if (_.isEmpty(params.phoneNumber.toString().trim()) || !_.isInteger(params.phoneNumber) || (params.phoneNumber.toString().length !== 10)) {
        return res.boom.badRequest("Enter Valid Phone Number");
    }

    if (_.isEmpty(params.password.trim())) {
        return res.boom.badRequest("Enter Password");
    }

    if (params.rePassword.trim() !== params.password.trim()) {
        return res.boom.badRequest("Password and Re-password are not matching");
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
                return res.boom.badData("Email id is already taken!");
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
                return res.boom.badData("User name is already taken!");
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
                return res.boom.badData("This phone number is already used!");
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
        return res.boom.badData("Enter username or emaild");
    }
    if (_.isEmpty(params.password)) {
        return res.boom.badData("Enter password");
    }
    const password = crypto.createHmac('sha256', CONFIG.SHA_KEY).update(params.password.trim()).digest('hex');
    connection.query("SELECT id,`full-name`,`user-name`,`phone-number`,`email-id` FROM candidate WHERE `email-id`= '"+params.userName+"' or `user-name`= '"+params.userName+"' and password= '"+password+"'",
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