"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCandidate = (req, res, next) => {
    console.log(req.candidate);
    return res.send({
        message: "candidate registered successfully",
        data: req.candidate
    });
};
exports.deleteCandidate = (req, res, next) => {
    console.log(req.candidate);
    return res.send({
        message: "candidate deleted successfully"
    });
};
8;
exports.sendLoginToken = (req, res, next) => {
    res.send({
        data: req.candidate,
        token: req.token
    });
};
exports.avatarPath = (req, res, next) => {
    return res.json({
        msg: req.candidate.avatar
    });
};
//# sourceMappingURL=candidateController.js.map