"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCandidate = function (req, res, next) {
    console.log(req.candidate);
    return res.send({
        message: "candidate registed successfully",
        data: req.candidate
    });
};
exports.sendLoginToken = function (req, res, next) {
    res.send({
        data: req.candidate[0],
        token: req.token
    });
};
//# sourceMappingURL=candidateController.js.map