import * as express from "express";
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import { NextFunction, RequestHandler } from 'express';
import { IJobs } from '../interface/IJobs';
import Boom = require("boom");
import _ = require("lodash");
import JobModel from "../models/JobModel";
import { Op } from "sequelize";
import EmployerModel from '../models/EmployerModel';

export const validateData: express.RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const param: IJobs = _.merge(req.body, req.params);

    if (_.isUndefined(param.title)) {
        const err = new Error("Title is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.category)) {
        const err = new Error("category is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.employmentStatus)) {
        const err = new Error("employment status is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.qualification)) {
        const err = new Error("qualification is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.jobDescription)) {
        const err = new Error("job description is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.vacancy)) {
        const err = new Error("vacancy is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.responsibilities)) {
        const err = new Error("responsibilities is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.country)) {
        const err = new Error("country is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.location)) {
        const err = new Error("location is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.companyName)) {
        const err = new Error("company name is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.companyAddress)) {
        const err = new Error("company address is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.companyWebsite)) {
        const err = new Error("company website is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    if (_.isUndefined(param.companyProfile)) {
        const err = new Error("company profile is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    return next();
}

export const makeDataPacket: express.RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params: IJobs = _.merge(req.body, req.params);
    const dataPacket: IJobs = {
        vacancy: params.vacancy || null,
        title: params.title || null,
        salary: params.salary || null,
        responsibilities: params.responsibilities || null,
        qualification: params.qualification || null,
        location: params.location || null,
        jobDescription: params.jobDescription || null,
        gender: params.gender || null,
        experience: params.experience || null,
        employmentStatus: params.employmentStatus || null,
        dealLine: params.dealLine || null,
        country: params.country || null,
        companyWebsite: params.companyWebsite || null,
        companyProfile: params.companyProfile || null,
        companyName: params.companyName || null,
        companyAddress: params.companyAddress || null,
        category: params.category || null,
        benefits: params.benefits || null,
        addedBy: req.data.employer.id
    }
    req.jobs = dataPacket;
    req.data = dataPacket;
    return next();
}

export const insertJobs: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const data: IJobs = req.jobs;
    try {
        const response = await JobModel.create(data);
        req.jobs = response;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error!!");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const getJobById: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);
    if (_.isUndefined(params.id) || !_.isInteger(parseInt(params.id))) {
        const err = new Error("Invalid job id");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    try {
        const response: IJobs | any = await JobModel.findOne({
            where: {
                id: params.id,
                isDel: {
                    [Op.not]: 1
                }
            },
            include: [{ as: 'employer', model: EmployerModel }]
        });
        if (_.isNull(response)) {
            const err = new Error(`Job with id ${params.id} is not found!!`);
            return res.send(Boom.boomify(err, { statusCode: 400 }));
        }
        req.jobs = response;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error!!");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const deleteJob: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.params, req.body);
    try {
        const response = await JobModel.update({ isDel: 1 }, {
            where: {
                id: params.id
            }
        });
        console.log(response);
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error!!");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const updateJob: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);
    const dataPacket: IJobs = req.data;
    console.log(dataPacket);
    try {
        const response = await JobModel.update(dataPacket, { where: { id: params.id } });
        console.log(response);
        req.data = response;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error!!");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const getAllJobs: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.params, req.body, req.query);
    let fromLimit, toLimit;
    console.log(params.fromLimit, params.toLimit);

    if (_.isUndefined(params.fromLimit) || _.isUndefined(params.fromLimit) || !_.isInteger(parseInt(params.fromLimit)) || !_.isInteger(parseInt(params.toLimit))) {
        fromLimit = 0;
        toLimit = 5;
    } else {
        fromLimit = params.fromLimit;
        toLimit = params.toLimit
    }

    try {
        const response: IJobs | any = await JobModel.findAll({
            where: {
                isDel: {
                    [Op.not]: 1
                },
            },
            offset: parseInt(fromLimit),
            limit: parseInt(toLimit),
            include: [
                {
                    as: 'employer',
                    model: EmployerModel
                }
            ]
        });
        req.jobs = response;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error!!");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const myJobs: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.params, req.body, req.query);
    let fromLimit, toLimit;
    console.log(params.fromLimit, params.toLimit);
    const id = req.data.employer.id;
    if (_.isUndefined(params.fromLimit) || _.isUndefined(params.fromLimit) || !_.isInteger(parseInt(params.fromLimit)) || !_.isInteger(parseInt(params.toLimit))) {
        fromLimit = 0;
        toLimit = 5;
    } else {
        fromLimit = params.fromLimit;
        toLimit = params.toLimit
    }

    try {
        const response: IJobs | any = await JobModel.findAll({
            where: {
                isDel: {
                    [Op.not]: 1
                },
                addedBy: id
            },
            offset: parseInt(fromLimit),
            limit: parseInt(toLimit),
            raw: true
        });
        req.jobs = response;
        const len = await JobModel.findAll({
            where: {
                isDel: {
                    [Op.not]: 1
                },
                addedBy: id
            },
            raw: true
        });
        req.data = len.length;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error!!");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const countMyJobs: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const id = req.data.employer.id;
    try {
        const len = await JobModel.findAll({
            where: {
                isDel: {
                    [Op.not]: 1
                },
                addedBy: id
            },
            raw: true
        });
        req.data = len.length;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error!!");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const checkLoginType: express.RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const type = req.data.type;
    if (type !== "employer") {
        const err = new Error("Please login as employer!!");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    return next();
}
