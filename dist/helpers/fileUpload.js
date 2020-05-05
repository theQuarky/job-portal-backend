"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multer = require("multer");
var storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, callback) {
        console.log("fasdfsda: " + file);
        callback(null, './' + Date.now() + file.originalname);
    }
});
var upload = multer({ storage: storage });
exports.default = upload;
//# sourceMappingURL=fileUpload.js.map