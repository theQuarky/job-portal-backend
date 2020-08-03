"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BlogModel_1 = require("../models/BlogModel");
const Boom = require("boom");
const _ = require("lodash");
const fs = require("fs");
exports.validateData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.checkLoginType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.data.type;
    if (type !== "admin") {
        const err = new Error("Please login as admin!!");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    return next();
});
exports.uploadBlogImg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    };
    const fileName = file.originalname;
    const extensions = ['jpg', 'jpeg', 'png'];
    const fileNameArray = fileName.split("");
    let fileNameLength = fileNameArray.length;
    let charFlag = fileNameArray[fileNameLength];
    let fileExtenstion = [];
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
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.insertBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    const packege = {
        title: params.title,
        shortDescription: params.shortDescription,
        description: params.description,
        imgPath: req.blogs.imgPath
    };
    try {
        const data = yield BlogModel_1.default.create(packege, { raw: true });
        console.log(data);
        req.blogs = data;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.getAllBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.params, req.body, req.query);
    let fromLimit, toLimit;
    console.log(params.fromLimit, params.toLimit);
    if (_.isUndefined(params.fromLimit) || _.isUndefined(params.fromLimit) || !_.isInteger(parseInt(params.fromLimit)) || !_.isInteger(parseInt(params.toLimit))) {
        fromLimit = 0;
        toLimit = 10;
    }
    else {
        fromLimit = params.fromLimit;
        toLimit = params.toLimit;
    }
    try {
        const data = yield BlogModel_1.default.findAll({
            where: {
                isDel: 0
            },
            offset: parseInt(fromLimit),
            limit: parseInt(toLimit)
        });
        req.blogs = data;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.findBlogById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    if (_.isEmpty(params.id)) {
        const err = new Error("Id of blog is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    try {
        const data = yield BlogModel_1.default.findOne({ where: { id: params.id, isDel: 0 } });
        if (_.isEmpty(data)) {
            const error = new Error(`Blog with id ${params.id} is not found!!`);
            return res.send(Boom.boomify(error, { statusCode: 400 }));
        }
        req.blogs = data;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.updateBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    const packege = {
        title: params.title,
        shortDescription: params.shortDescription,
        description: params.description
    };
    try {
        const data = yield BlogModel_1.default.update(packege, {
            where: {
                id: params.id
            }
        });
        console.log(data);
        req.data = data;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.updateImgPath = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    try {
        const data = yield BlogModel_1.default.update({ imgPath: req.blogs.imgPath }, {
            where: {
                id: params.id
            }
        });
        console.log(data);
        req.data = data;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.deletBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    try {
        const data = yield BlogModel_1.default.update({ isDel: 1 }, {
            where: {
                id: params.id
            }
        });
        console.log(data);
        req.data = data;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
//# sourceMappingURL=blogService.js.map