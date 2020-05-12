"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmployer = function (req, res, next) {
    return res.send({
        message: "employer registed successfully",
        data: req.employer
    });
};
exports.sendLoginToken = function (req, res, next) {
    res.send({
        data: req.candidate[0],
        token: req.token
    });
};
//# sourceMappingURL=employerController.js.map