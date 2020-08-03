"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogService = require("../service/blogService");
const blogController = require("../controller/blogControllers");
const verifyToken_1 = require("../helpers/verifyToken");
const multer = require("multer");
const upload = multer();
const blog = express_1.Router();
blog.post('/', verifyToken_1.default, upload.single('blogImg'), [
    blogService.checkLoginType,
    blogService.validateData,
    blogService.uploadBlogImg,
    blogService.insertBlog,
    blogController.allBlogs
]);
blog.get('/', [
    blogService.getAllBlog,
    blogController.allBlogs
]);
blog.get('/:id', [
    blogService.findBlogById,
    blogController.allBlogs
]);
blog.put('/:id', verifyToken_1.default, [
    blogService.checkLoginType,
    blogService.validateData,
    blogService.findBlogById,
    blogService.updateBlog,
    blogController.updateBlogs
]);
blog.put('/upload/:id', verifyToken_1.default, upload.single('blogImg'), [
    blogService.checkLoginType,
    blogService.findBlogById,
    blogService.uploadBlogImg,
    blogService.updateImgPath,
    blogController.updateBlogs
]);
blog.delete('/:id', verifyToken_1.default, [
    blogService.findBlogById,
    blogService.deletBlog,
    blogController.deleteBlog
]);
exports.default = blog;
//# sourceMappingURL=blogRoute.js.map