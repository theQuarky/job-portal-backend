import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import { NextFunction, RequestHandler } from "express";
import { IResume } from '../interface/IResume';
import Boom = require("boom");
import _ = require('lodash');
import ResumeModel from '../models/ResumeModel';

export const checkLoginType: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const type = req.data.type;
    if (type !== "candidate") {
        const err = new Error("Please login as candidate!!");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    return next();
}

export const validateData: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params: IResume | any = _.merge(req.body, req.params);

    if (_.isEmpty(params.fullName)) {
        const err = new Error("Full name is require!!");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    if (_.isEmpty(params.aboutYou)) {
        const err = new Error("About you is require!!");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    return next();
}

export const makeDataPacket: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params: IResume = _.merge(req.body, req.params, req.data);
    const dataPacket: IResume = {
        fullName: params.fullName,
        location: params.location || null,
        experienceYear: params.experienceYear || 0,
        aboutYou: params.aboutYou,
        resumePath: params.resumePath || null
    };
    req.data = dataPacket;
    req.resumes = dataPacket;
    return next();
}

export const insertData: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const data: IResume = req.data;
    try {
        const response = await ResumeModel.create(data);
        console.log(response);
        req.resumes = response;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}