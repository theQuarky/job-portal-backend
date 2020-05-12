"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var employerRoute_1 = require("./employerRoute");
var candidateRoute_1 = require("./candidateRoute");
var router = express_1.Router();
router.get('/', function (req, res) {
    res.send({
        msg: 'working!'
    });
});
router.use('/employer', employerRoute_1.default);
router.use('/candidate', candidateRoute_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map