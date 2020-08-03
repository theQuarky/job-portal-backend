"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tempController = (req, res, next) => {
    return res.json({
        msg: "Custom message!!"
    });
};
exports.vlogById = (req, res, next) => {
    return res.json({
        Vlog: req.vlogs
    });
};
exports.allVlogs = (req, res, next) => {
    console.log(req.blogs);
    return res.json({
        Vlog: req.vlogs
    });
};
exports.updateVlogs = (req, res, next) => {
    return res.json({
        message: req.data
    });
};
exports.deleteVlog = (req, res, next) => {
    return res.json({
        message: `Vlog with id ${req.params.id} is deleted!!`
    });
};
//# sourceMappingURL=vlogControllers.js.map