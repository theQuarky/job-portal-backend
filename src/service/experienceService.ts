import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import { NextFunction, RequestHandler } from "express";
import Boom = require("boom");
import _ = require('lodash');
import { IExperience } from '../interface/IExperience';
import EducationModel from '../models/EducationModel';


export const makeDataPacket: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);

    if (_.isEmpty(params.experience)) {
        return next();
    }
    let flag = false;

    const dataPacket: IExperience[] = [];
    const experiences = params.experience;
    await experiences.forEach((experience: IExperience) => {
        if(_.isEmpty(experience.designation) || _.isEmpty(experience.companyName)){
            flag = true;
        }
        const packet = {
            resumeId: req.resumes.id,
            designation: experience.designation,
            institute: experience.companyName,
            startYear: experience.startYear || null,
            endYear: experience.endYear || null
        };
        dataPacket.push(packet);
    });

    if(flag){
        const err = new Error("Designation and company name is require!!");
        return res.send(Boom.boomify(err,{statusCode:400}));
    }
    req.experience = dataPacket;
    return next();
}
export const insertData: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    if (_.isEmpty(req.experience) || _.isUndefined(req.experience)) {
        return next();
    }
    const dataPacket = req.experience;
    try {
        const response = await EducationModel.bulkCreate(dataPacket);
        console.log(response);
        req.experience = response;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error!");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}