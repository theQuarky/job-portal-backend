"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employerRoute_1 = require("./employerRoute");
const candidateRoute_1 = require("./candidateRoute");
const jobsRoute_1 = require("./jobsRoute");
const resumeRoute_1 = require("./resumeRoute");
const blogRoute_1 = require("./blogRoute");
const vlogRoute_1 = require("./vlogRoute");
const adminRoute_1 = require("./adminRoute");
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
router.use('/blog', blogRoute_1.default);
router.use('/vlog', vlogRoute_1.default);
router.use('/admin', adminRoute_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map