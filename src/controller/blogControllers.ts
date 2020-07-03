import { RequestHandler, NextFunction } from 'express';
import IRequest from "../interface/IRequest";
import IResponse from '../interface/IResponse';

export const tempController: RequestHandler = (req: IRequest, res: IResponse, next: NextFunction) =>{
    return res.json({
        msg: "Custom message!!"
    });
}

export const jobById: RequestHandler = (req: IRequest, res: IResponse, next: NextFunction) =>{
    return res.json({
        Blog: req.blogs
    });
}

export const allBlogs: RequestHandler = (req: IRequest, res: IResponse, next: NextFunction) =>{
    console.log(req.blogs);
    return res.json({
        Blog: req.blogs
    });
}

export const updateBlogs: RequestHandler = (req: IRequest, res: IResponse, next: NextFunction) =>{
    return res.json({
        message: req.data
    });
}

export const deleteBlog: RequestHandler = (req: IRequest, res: IResponse, next: NextFunction) =>{
    return res.json({
        message: `Blog with id ${req.params.id} is deleted!!`
    });
}