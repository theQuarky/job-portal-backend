import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import { NextFunction, RequestHandler } from "express";
import { IResume } from '../interface/IResume';
import Boom = require("boom");
import _ = require('lodash');
import * as fs from 'fs';
import ResumeModel from '../models/ResumeModel';
import ExperienceModel from '../models/ExperienceModel';
import EducationModel from '../models/EducationModel';

import multer = require('multer');

const upload = multer({ dest: './uploads/resumes/' });

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

    // if (_.isEmpty(params.addedBy)) {
    //     const err = new Error("Candidate id is require");
    //     return res.send(Boom.boomify(err, { statusCode: 400 }));
    // }

    return next();
}

export const makeDataPacket: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params: IResume = _.merge(req.body, req.params, req.data);
    const dataPacket: IResume = {
        fullName: params.fullName,
        location: params.location || null,
        experienceYear: params.experienceYear || 0,
        aboutYou: params.aboutYou,
        addedBy: req.data.candidate.id,
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
        req.resumes = response;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const getAllResume: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
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
        const response = await ResumeModel.findAll({
            where: {
                isDel: 0
            },
            offset: parseInt(fromLimit),
            limit: parseInt(toLimit),
            include: [
                { model: EducationModel },
                { model: ExperienceModel }
            ],
            attributes: ["id", "fullName", "location", "experienceYear", "aboutYou", "addedBy", "resumePath"]
        });
        req.data = response;
        req.resumes = response;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const getAllResumeByCandidateId: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.params, req.body, req.query);

    try {
        const response = await ResumeModel.findAll({
            where: {
                addedBy: parseInt(params.id),
                isDel: 0
            },
            include: [
                { model: EducationModel },
                { model: ExperienceModel }
            ],
            attributes: ["id", "fullName", "location", "experienceYear", "aboutYou", "addedBy", "resumePath"]
        });
        req.data = response;
        req.resumes = response;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const getAllResumeById: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.params, req.body, req.query);

    if (_.isUndefined(params.id) || !_.isInteger(parseInt(params.id))) {
        const err = new Error("Unvalid resume id");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    try {
        const response = await ResumeModel.findOne({
            where: {
                id: parseInt(params.id),
                isDel: 0
            },
            include: [
                { model: EducationModel },
                { model: ExperienceModel }
            ],
            attributes: ["id", "fullName", "location", "experienceYear", "aboutYou", "addedBy", "resumePath"]
        });

        if (_.isEmpty(response) === false) {
            req.resumes = response;
            return next();
        } else {
            const err = new Error("could not found resume");
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        }
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const updateResume: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.params, req.body, req.query);
    const data: IResume = req.data;
    try {
        const response = await ResumeModel.update(data,
            {
                where: {
                    id: parseInt(params.id)
                }
            }
        );
        data.id = params.id;
        req.resumes = data;
        console.log(response);
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const deleteResume: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.params, req.body, req.query);
    try {
        const response = await ResumeModel.update(
            {
                isDel: 1
            },
            {
                where: {
                    id: parseInt(params.id)
                }
            }
        );
        req.resumes = response;
        console.log(response);
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const validateCandidateIdForResume: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.params, req.body, req.query);

    const checkData = req.resumes;
    if (req.data.candidate.id !== checkData.addedBy) {
        const err = new Error("You can not update this resume");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    return next();
};

export const uploadResume: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const file = req.file;

    if(_.isUndefined(file)){
        const err = new Error("You must have to upload resume!!");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    const fileName = file.originalname;

    const extensions = ['pdf', 'doc', 'docx', 'docm', 'dotx', 'dotm', 'docb'];

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
    fileExtenstion = fileExtenstion.reverse().join("");

    if (extensions.includes(fileExtenstion) === false) {
        const err = new Error("Invalid file");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    const tempName = Date.now() + fileName;
    const fileDdestination = './uploads/resumes/' + tempName;

    try {
        fs.writeFileSync(fileDdestination, file.buffer.toString('base64'), { encoding: 'base64' });
        req.resumes.resumePath = '/static/resumes/' + tempName;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const updateResumePath: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction)=>{
    const id: number = req.data.candidate.id;

    try {
        const response = await ResumeModel.update({resumePath: req.resumes.resumePath}, {
            where: {
                id: id
            }
        });
        console.log(response);
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}