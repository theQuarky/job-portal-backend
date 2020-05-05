"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var cors = require("cors");
var express = require("express");
var index_1 = require("./api/index");
var errorHandler = require("./helpers/errorHandler");
var boom = require('express-boom');
var db_1 = require("./config/db");
var _ = require("lodash");
var App = /** @class */ (function () {
    function App() {
        this.express = express();
        this.setMiddleware();
        this.setRoutes();
        this.catchErrors();
        this.connectToDatebase();
    }
    App.prototype.setMiddleware = function () {
        this.express.use(cors());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express.static(__dirname + '/uploads'));
        this.express.use(cors());
        this.express.use(boom());
        this.express.use(function (req, res, next) {
            var params = _.merge(req.body, req.params);
            console.table(params);
            return next();
        });
    };
    App.prototype.setRoutes = function () {
        this.express.use('/v1', index_1.default);
    };
    App.prototype.catchErrors = function () {
        this.express.use(errorHandler.notFound);
        this.express.use(errorHandler.internalServerError);
    };
    App.prototype.connectToDatebase = function () {
        db_1.default.connect(function (err) {
            if (err)
                throw err;
            console.log('You are now connected with mysql database...');
        });
    };
    return App;
}());
exports.default = new App().express;
//# sourceMappingURL=App.js.map