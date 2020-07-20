import * as express from 'express';
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import CONFIG from '../config/config';
import * as fs from 'fs';
import { IEmployer } from '../interface/IEmployer';
import Boom = require('boom');
import EmployerModel from '../models/EmployerModel';
import { Op } from 'sequelize';

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

export const validateDataForUpdate: express.RequestHandler = (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params: any = _.merge(req.params, req.body);
    const emailIdRegEx: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (_.isEmpty(params.fullName)) {
        const err = new Error("Enter Full Name");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    if (_.isEmpty(params.userName)) {
        const err = new Error("Enter User Name");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    if (_.isEmpty(params.emailId) || !emailIdRegEx.test(params.emailId)) {
        const err = new Error("Enter valid Email Id");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    if (_.isEmpty(params.phoneNumber.toString()) || !_.isInteger(parseInt(params.phoneNumber)) || (params.phoneNumber.toString().length !== 10)) {
        const err = new Error("Enter Valid Phone Number");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    return next();
}

export const checkLoginType: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const type = req.data.type;
    if (type !== "employer") {
        const err = new Error("Please login as employer!!");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    return next();
}

export const findEmployerByEmail: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params: any = _.merge(req.params, req.body);
    try {
        const data: IEmployer | any = await EmployerModel.findAll({
            where: {
                emailId: params.emailId,
                isDel: 0
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

export const findEmployerByUserName: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params: any = _.merge(req.params, req.body);
    try {
        const data: IEmployer | any = await EmployerModel.findAll({
            where: {
                userName: params.userName,
                isDel: 0
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

export const findEmployerByPhoneNumber: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params: any = _.merge(req.params, req.body);
    try {
        const data: IEmployer | any = await EmployerModel.findAll({
            where: {
                phoneNumber: params.phoneNumber,
                isDel: 0
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

export const addEmployer: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params: any = _.merge(req.params, req.body);

    const employerData: IEmployer = {
        fullName: params.fullName,
        userName: params.userName,
        phoneNumber: params.phoneNumber,
        emailId: params.emailId,
        password: crypto.createHmac('sha256', CONFIG.SHA_KEY).update(params.password.trim()).digest('hex')
    }
    try {
        const data = await EmployerModel.create(employerData);
        req.employer = data;
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
        const data: IEmployer | any = await EmployerModel.findOne({
            where: {
                [Op.or]: [
                    {
                        [Op.and]: {
                            emailId: {
                                [Op.eq]: params.userName
                            },
                            password: {
                                [Op.eq]: password
                            }
                        }
                    },
                    {
                        [Op.and]: {
                            userName: {
                                [Op.eq]: params.userName
                            },
                            password: {
                                [Op.eq]: password
                            }
                        }
                    }
                ],
                isDel: 0
            },
            attributes: ["id", "fullName", "emailId", "phoneNumber", "userName", "avatar", "aboutUs"]
        });
        if (_.isEmpty(data)) {
            const err = new Error("Username and password is not matching!!");
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        }
        req.employer = data;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const generateToken: express.RequestHandler = (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const employer = { employer: req.employer, type: 'employer' };
    req.token = jwt.sign(JSON.stringify(employer), CONFIG.JWT_ENCRYPTION);
    return next();
}

export const findEmployerByEmailForUpdate: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params: any = _.merge(req.params, req.body);
    try {
        const data: IEmployer | any = await EmployerModel.findAll({
            where: {
                emailId: params.emailId,
                isDel: 0,
                id: {
                    [Op.not]: params.id
                }
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

export const findEmployerByPhoneNumberForUpdate: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params: any = _.merge(req.params, req.body);

    try {
        const data: IEmployer | any = await EmployerModel.findAll({
            where: {
                phoneNumber: params.phoneNumber,
                isDel: 0,
                id: {
                    [Op.not]: params.id
                }
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

export const updateEmployer: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params: any = _.merge(req.params, req.body);

    const employerData: IEmployer = {
        fullName: params.fullName,
        userName: params.userName,
        phoneNumber: params.phoneNumber,
        emailId: params.emailId,
        aboutUs: params.aboutUs
    };

    try {
        const data = await EmployerModel.update(employerData, {
            where: {
                id: params.id,
                isDel: 0
            }
        });
        req.employer = data;
        return next();
    } catch (error) {
        console.log(error)
        return res.send(Boom.boomify(error, { statusCode: 500 }));
    }

}

export const deleteEmployer: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params: any = _.merge(req.params, req.body);

    try {
        const data = await EmployerModel.update({ isDel: 1 }, {
            where: {
                id: params.id
            }
        });
        req.employer = data;
        return next();
    } catch (error) {
        console.log(error)
        return res.send(Boom.boomify(error, { statusCode: 500 }));
    }

}

export const confirmId: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params: any = _.merge(req.params, req.body);

    if (params.id.toString() !== req.data.employer.id.toString()) {
        const err = new Error("Invalid request");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    return next();
}

export const checkPassword: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params: any = _.merge(req.params, req.body);

    if (_.isEmpty(params.oldPassword)) {
        const err = new Error("Old Password required");
        return res.send(Boom.boomify(err, { statusCode: 400 }));

    }
    if (_.isEmpty(params.newPassword)) {
        const err = new Error("New Password required");
        return res.send(Boom.boomify(err, { statusCode: 400 }));

    }
    if (_.isEmpty(params.reNewPassword)) {
        const err = new Error("ReType New Password required");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (params.newPassword.toString().trim() !== params.reNewPassword.toString().trim()) {
        const err = new Error("ReType New Password required");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    const oldPassword = crypto.createHmac('sha256', CONFIG.SHA_KEY).update(params.oldPassword.trim()).digest('hex');
    try {
        const response = EmployerModel.findAll({
            where: {
                id: params.id,
                password: oldPassword
            }
        });
        if (_.isEmpty(response) === false) {
            const err = new Error("Entered wrong password!!");
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        } else {
            return next();
        }
    } catch (error) {
        console.log(error)
        return res.send(Boom.boomify(error, { statusCode: 500 }));
    }
}

export const changePassword: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params: any = _.merge(req.params, req.body);
    const password = crypto.createHmac('sha256', CONFIG.SHA_KEY).update(params.newPassword.trim()).digest('hex');
    try {
        const response = EmployerModel.update({
            password
        }, {
            where: {
                id: params.id
            }
        });
        return next();
    } catch (error) {
        console.log(error)
        return res.send(Boom.boomify(error, { statusCode: 500 }));
    }
}

export const getAllEmployer: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params = _.merge(req.params, req.body, req.query);
    let fromLimit, toLimit;
    console.log(params.fromLimit, params.toLimit);

    if (_.isUndefined(params.fromLimit) || _.isUndefined(params.fromLimit) || !_.isInteger(parseInt(params.fromLimit)) || !_.isInteger(parseInt(params.toLimit))) {
        fromLimit = 0;
        toLimit = 10;
    } else {
        fromLimit = params.fromLimit;
        toLimit = params.toLimit
    }
    try {
        const data: IEmployer[] | any = await EmployerModel.findAll({
            where: {
                isDel: 0
            },
            offset: parseInt(fromLimit),
            limit: parseInt(toLimit),
            attributes: ["id", "fullName", "emailId", "phoneNumber", "userName", "avatar", "aboutUs"]
        });
        req.employer = data;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const uploadAvatar: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const file = req.file;

    if (_.isUndefined(file)) {
        const err = new Error("You must have to upload image!!");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    try {
        const fileName = file.originalname;

        const extensions = ['png', 'jpg', 'jpeg'];

        const fileNameArray = fileName.split("");
        let fileNameLength = fileNameArray.length;
        let charFlag = fileNameArray[fileNameLength];
        let fileExtenstion: any = [];

        while (charFlag !== ".") {
            fileNameLength = fileNameLength - 1;
            charFlag = fileNameArray[fileNameLength];
            fileExtenstion.push(charFlag);
        }
        fileExtenstion.pop();
        fileExtenstion = fileExtenstion.reverse().join("").toLowerCase();

        if (extensions.includes(fileExtenstion) === false) {
            const err = new Error("Invalid file");
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        }
        const tempName = Date.now() + fileName;
        const fileDdestination = './uploads/avatars/' + tempName;

        fs.writeFileSync(fileDdestination, file.buffer.toString('base64'), { encoding: 'base64' });
        req.employer = { avatar: '/static/avatars/' + tempName };

        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const updateAvatarPath: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const id: number = req.data.employer.id;
    try {
        const response = await EmployerModel.update({ avatar: req.employer.avatar }, {
            where: {
                id: id
            }
        });
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}