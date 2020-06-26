"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const config_1 = require("./config/config");
const PORT = config_1.default.PORT;
App_1.default.listen(PORT, err => {
    if (err) {
        return console.log(err);
    }
    console.log(config_1.default.DB_URL);
    console.log(`Server is listening on http://127.0.0.1:${PORT}`);
});
//# sourceMappingURL=index.js.map