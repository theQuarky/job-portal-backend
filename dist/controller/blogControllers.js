"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tempController = (req, res, next) => {
    return res.json({
        msg: "Custom message!!"
    });
};
exports.blogById = (req, res, next) => {
    return res.json({
        Blog: req.blogs
    });
};
exports.allBlogs = (req, res, next) => {
    console.log(req.blogs);
    return res.json({
        Blog: req.blogs
    });
};
exports.updateBlogs = (req, res, next) => {
    return res.json({
        message: req.data
    });
};
exports.deleteBlog = (req, res, next) => {
    return res.json({
        message: `Blog with id ${req.params.id} is deleted!!`
    });
};
//# sourceMappingURL=blogControllers.js.map