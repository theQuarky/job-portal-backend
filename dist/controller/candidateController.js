"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCandidate = (req, res, next) => {
    console.log(req.candidate);
    return res.send({
        message: "candidate registered successfully",
        data: req.candidate
    });
};
exports.sendLoginToken = (req, res, next) => {
    res.send({
        data: req.candidate,
        token: req.token
    });
};
//# sourceMappingURL=candidateController.js.map