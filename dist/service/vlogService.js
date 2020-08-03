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
const Boom = require("boom");
const _ = require("lodash");
const fs = require("fs");
const VlogModel_1 = require("../models/VlogModel");
exports.checkLoginType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.data.type;
    if (type !== "admin") {
        const err = new Error("Please login as admin!!");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    return next();
});
exports.validateData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    if (_.isEmpty(params.title)) {
        const err = new Error("Title is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    return next();
});
exports.uploadVlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    };
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
    const fileDdestination = './uploads/vlogs/' + tempName;
    try {
        fs.writeFileSync(fileDdestination, file.buffer.toString('base64'), { encoding: 'base64' });
        console.log('/static/blogs/' + tempName);
        req.vlogs.imgPath = '/static/vlogs/' + tempName;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.insertVlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    const packege = {
        title: params.title,
        imgPath: req.vlogs.imgPath
    };
    try {
        const data = yield VlogModel_1.default.create(packege, { raw: true });
        console.log(data);
        req.vlogs = data;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.getAllVlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const data = yield VlogModel_1.default.findAll({
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
exports.findVlogById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    if (_.isEmpty(params.id)) {
        const err = new Error("Id of vlog is require");
        return res.send(Boom.boomify(err, { statusCode: 400 }));
    }
    try {
        const data = yield VlogModel_1.default.findOne({ where: { id: params.id, isDel: 0 } });
        if (_.isEmpty(data)) {
            const error = new Error(`Vlog with id ${params.id} is not found!!`);
            return res.send(Boom.boomify(error, { statusCode: 400 }));
        }
        req.vlogs = data;
        return next();
    }
    catch (error) {
        console.log(error);
        const err = new Error("Server side error");
        return res.send(Boom.boomify(err, { statusCode: 500 }));
    }
});
exports.updateVlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    const packege = {
        title: params.title
    };
    try {
        const data = yield VlogModel_1.default.update(packege, {
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
        const data = yield VlogModel_1.default.update({ imgPath: req.vlogs.imgPath }, {
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
exports.deletVlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = _.merge(req.body, req.params);
    try {
        const data = yield VlogModel_1.default.update({ isDel: 1 }, {
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
//# sourceMappingURL=vlogService.js.map