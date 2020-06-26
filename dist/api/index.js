"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employerRoute_1 = require("./employerRoute");
const candidateRoute_1 = require("./candidateRoute");
const jobsRoute_1 = require("./jobsRoute");
const resumeRoute_1 = require("./resumeRoute");
const router = express_1.Router();
router.get('/', (req, res) => {
    res.send({
        msg: 'working!'
    });
});
router.use('/employer', employerRoute_1.default);
router.use('/candidate', candidateRoute_1.default);
router.use('/jobs', jobsRoute_1.default);
router.use('/resume', resumeRoute_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map