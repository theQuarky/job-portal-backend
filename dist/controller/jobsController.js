"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tempController = (req, res, next) => {
    return res.json({
        msg: "Custom message!!"
    });
};
exports.jobById = (req, res, next) => {
    return res.json({
        job: req.jobs
    });
};
exports.allJobs = (req, res, next) => {
    return res.json({
        job: req.jobs
    });
};
exports.updateJobs = (req, res, next) => {
    return res.json({
        message: req.data
    });
};
exports.deleteJob = (req, res, next) => {
    return res.json({
        message: `Job with id ${req.params.id} is deleted!!`
    });
};
//# sourceMappingURL=jobsController.js.map