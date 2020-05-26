import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import { NextFunction, RequestHandler } from "express";
import EducationModel from '../models/EducationModel';
import Boom = require("boom");
import _ = require('lodash');
import { IEducation } from '../interface/IEducation';
import { any } from 'bluebird';
import resume from '../api/resumeRoute';

export const makeDataPacket: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);

    if (_.isEmpty(params.education)) {
        return next();
    }
    let flag = false;
    const dataPacket: IEducation[] = [];
    const educations = params.education;
    await educations.forEach((education: IEducation) => {
        if (_.isEmpty(education.designation) || _.isEmpty(education.institute)) {
            flag = true;
        }
        const packet = {
            resumeId: req.resumes.id,
            designation: education.designation,
            institute: education.institute,
            startYear: education.startYear || null,
            endYear: education.endYear || null
        };
        dataPacket.push(packet);
    });
    if (flag) {
        const err = new Error("Designation and institute is require!!");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    req.educations = dataPacket;
    return next();
}

export const insertData: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    if (_.isEmpty(req.educations) || _.isUndefined(req.educations)) {
        return next();
    }
    const dataPacket = req.educations;
    try {
        const response = await EducationModel.bulkCreate(dataPacket);
        req.educations = response;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error!");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const deleteData: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const id = req.body.id;

    try {
        const response = await EducationModel.destroy({
            where: {
                resumeId: parseInt(id)
            }
        });
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error!");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}