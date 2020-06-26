"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmployer = (req, res, next) => {
    return res.send({
        message: "employer registered successfully",
        data: req.employer
    });
};
exports.sendLoginToken = (req, res, next) => {
    res.send({
        data: req.employer,
        token: req.token
    });
};
//# sourceMappingURL=employerController.js.map