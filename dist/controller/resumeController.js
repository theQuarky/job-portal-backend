"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resumePath = (req, res, next) => {
    return res.json({
        msg: req.resumes.resumePath
    });
};
exports.insertData = (req, res, next) => {
    return res.json({
        msg: req.data,
        resume: req.resumes,
        experience: req.experience,
        education: req.educations
    });
};
exports.readData = (req, res, next) => {
    return res.json({
        resumes: req.resumes
    });
};
exports.deleteData = (req, res, next) => {
    return res.json({
        mdg: "resume deleted successfully!!"
    });
};
//# sourceMappingURL=resumeController.js.map