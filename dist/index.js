"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = require("./App");
var config_1 = require("./config/config");
var PORT = config_1.default.PORT;
App_1.default.listen(PORT, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log(config_1.default.DB_URL);
    console.log("Server is listening on http://127.0.0.1:" + PORT);
});
//# sourceMappingURL=index.js.map