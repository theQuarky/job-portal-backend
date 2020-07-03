import { IBlog } from './../interface/IBlog';
import * as express from 'express';
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import BlogModel from "../models/BlogModel";
import Boom = require('boom');
import * as _ from 'lodash';
import * as fs from 'fs';
import CONFIG from '../config/config';

export const validateData: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params = _.merge(req.body, req.params);

    if (_.isEmpty(params.title)) {
        const err = new Error("Title is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    if (_.isEmpty(params.shortDescription)) {
        const err = new Error("Sort Description is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    if (_.isEmpty(params.description)) {
        const err = new Error("Description is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }

    return next();
}

export const checkLoginType: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const type = req.data.type;
    if (type !== "admin") {
        const err = new Error("Please login as admin!!");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    return next();
}

export const uploadBlogImg: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const file = req.file;
    const params = _.merge(req.body, req.params);
    if (_.isUndefined(file)) {
        const err = new Error("You must have to upload blog image!!");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    req.blogs = {
        title: params.title || "",
        shortDescription: params.shortDescription || "",
        description: params.description || ""
    }

    const fileName = file.originalname;

    const extensions = ['jpg', 'jpeg', 'png'];

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
    const fileDdestination = './uploads/blogs/' + tempName;

    try {
        fs.writeFileSync(fileDdestination, file.buffer.toString('base64'), { encoding: 'base64' });
        console.log('/static/blogs/' + tempName);
        req.blogs.imgPath = '/static/blogs/' + tempName;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const insertBlog: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params = _.merge(req.body, req.params);
    const packege: IBlog = {
        title: params.title,
        shortDescription: params.shortDescription,
        description: params.description,
        imgPath: req.blogs.imgPath
    };
    try {
        const data = await BlogModel.create(packege, { raw: true });
        console.log(data);
        req.blogs = data;
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const getAllBlog: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
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
        const data: IBlog[] | any = await BlogModel.findAll({
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

export const findBlogById: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params = _.merge(req.body, req.params);
    if (_.isEmpty(params.id)) {
        const err = new Error("Id of blog is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    try {
        const data = await BlogModel.findOne({ where: { id: params.id, isDel: 0 } });
        if (_.isEmpty(data)) {
            const error = new Error(`Blog with id ${params.id} is not found!!`);
            return res.send(Boom.boomify(error, { statusCode: 400 }));
        }
        return next();
    } catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
}

export const updateBlog: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params = _.merge(req.body, req.params);

    const packege: IBlog = {
        title: params.title,
        shortDescription: params.shortDescription,
        description: params.description
    };
    try {
        const data = await BlogModel.update(packege, {
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
        const data = await BlogModel.update({ imgPath: req.blogs.imgPath }, {
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

export const deletBlog: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const params = _.merge(req.body, req.params);

    try {
        const data = await BlogModel.update({ isDel: 1 }, {
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