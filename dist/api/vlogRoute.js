"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vlogService = require("../service/vlogService");
const vlogController = require("../controller/vlogControllers");
const verifyToken_1 = require("../helpers/verifyToken");
const multer = require("multer");
const upload = multer();
const vlog = express_1.Router();
vlog.post('/', verifyToken_1.default, [
    vlogService.checkLoginType,
    vlogService.validateData,
    vlogService.uploadVlog,
    vlogService.insertVlog,
    vlogController.allVlogs
]);
vlog.get('/', [
    vlogService.getAllVlog,
    vlogController.allVlogs
]);
vlog.get('/:id', [
    vlogService.findVlogById,
    vlogController.allVlogs
]);
vlog.put('/:id', verifyToken_1.default, [
    vlogService.checkLoginType,
    vlogService.validateData,
    vlogService.findVlogById,
    vlogService.updateVlog,
    vlogController.updateVlogs
]);
vlog.put('/upload/:id', verifyToken_1.default, upload.single('vlogImg'), [
    vlogService.checkLoginType,
    vlogService.findVlogById,
    vlogService.uploadVlog,
    vlogService.updateImgPath,
    vlogController.updateVlogs
]);
vlog.delete('/:id', verifyToken_1.default, [
    vlogService.findVlogById,
    vlogService.deletVlog,
    vlogController.deleteVlog
]);
exports.default = vlog;
//# sourceMappingURL=vlogRoute.js.map