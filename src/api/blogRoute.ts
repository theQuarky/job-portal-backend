import { Router, NextFunction } from 'express';
import * as blogService from "../service/blogService";
import * as blogController from "../controller/blogControllers";
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import authentication from '../helpers/verifyToken';
import multer = require('multer');

const upload = multer();

const blog: Router = Router();

blog.post('/',authentication,upload.single('blogImg'),[
    blogService.checkLoginType,
    blogService.validateData,
    blogService.uploadBlogImg,
    blogService.insertBlog,
    blogController.allBlogs
]);

blog.get('/',[
    blogService.getAllBlog,
    blogController.allBlogs
]);

blog.get('/:id',[
    blogService.findBlogById,
    blogController.allBlogs
]);

blog.put('/:id',authentication,[
    blogService.checkLoginType,
    blogService.validateData,
    blogService.findBlogById,
    blogService.updateBlog,
    blogController.updateBlogs
]);

blog.put('/upload/:id',authentication,upload.single('blogImg'),[
    blogService.checkLoginType,
    blogService.findBlogById,
    blogService.uploadBlogImg,
    blogService.updateImgPath,
    blogController.updateBlogs
]);

blog.delete('/:id',authentication,[
    blogService.findBlogById,
    blogService.deletBlog,
    blogController.deleteBlog
]);

export default blog;