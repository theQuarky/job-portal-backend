import * as express from "express";
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import { NextFunction, RequestHandler } from 'express';
import Boom = require("boom");
import _ = require("lodash");
import * as fs from 'fs';
import { Op } from "sequelize";
import { IVlog } from '../interface/IVlog';
import VlogModel from '../models/VlogModel';

export const checkLoginType: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const type = req.data.type;
    if (type !== "admin") {
        const err = new Error("Please login as admin!!");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    return next();
}

export const validateData: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);
    if (_.isEmpty(params.title)) {
        const err = new Error("Title is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    return next();
}

export const uploadVlog: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const file = req.file;
    const params = _.merge(req.body, req.params);
    if (_.isUndefined(file)) {
        const err = new Error("You must have to upload vlog video!!");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    req.blogs = {
        title: params.title || "",
        shortDescription: params.shortDescription || "",
        description: params.description || ""
    }

    const fileName = file.originalname;

    const extensions = [
        "mp4",
        "m4a",
        "m4v",
        "f4v",
        "f4a",
        "m4b",
        "m4r",
        "f4b",
        "mov",
        "wmv",
        "wma",
        "webm",
        "flv"
    ];

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
    const fileDdestination = './uploads/vlogs/' + tempName;

    try {
        fs.writeFileSync(fileDdestination, file.buffer.toString('base64'), { encoding: 'base64' });
        console.log('/static/blogs/' + tempName);
        req.vlogs.imgPath = '/static/vlogs/' + tempName;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const insertVlog: RequestHandler = async (req: IRequest, res: IResponse, next: NextFunction) => {
    const params = _.merge(req.body, req.params);
    const packege: IVlog = {
        title: params.title,
        imgPath: req.vlogs.imgPath
    };
    try {
        const data = await VlogModel.create(packege, { raw: true });
        console.log(data);
        req.vlogs = data;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const getAllVlog: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
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
        const data: IVlog[] | any = await VlogModel.findAll({
            where: {
                isDel: 0
            },
            offset: parseInt(fromLimit),
            limit: parseInt(toLimit)
        });
        req.blogs = data;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const findVlogById: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params = _.merge(req.body, req.params);
    if (_.isEmpty(params.id)) {
        const err = new Error("Id of vlog is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    try {
        const data = await VlogModel.findOne({ where: { id: params.id, isDel: 0 } });
        if (_.isEmpty(data)) {
            const error = new Error(`Vlog with id ${params.id} is not found!!`);
            return res.send(Boom.boomify(error, { statusCode: 400 }));
        }
        req.vlogs = data;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const updateVlog: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params = _.merge(req.body, req.params);

    const packege: IVlog = {
        title: params.title
    };
    try {
        const data = await VlogModel.update(packege, {
            where: {
                id: params.id
            }
        });
        console.log(data);
        req.data = data;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const updateImgPath: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params = _.merge(req.body, req.params);

    try {
        const data = await VlogModel.update({ imgPath: req.vlogs.imgPath }, {
            where: {
                id: params.id
            }
        });
        console.log(data);
        req.data = data;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const deletVlog: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params = _.merge(req.body, req.params);

    try {
        const data = await VlogModel.update({ isDel: 1 }, {
            where: {
                id: params.id
            }
        });
        console.log(data);
        req.data = data;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}