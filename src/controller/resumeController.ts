import { RequestHandler, NextFunction } from 'express';
import IRequest from "../interface/IRequest";
import IResponse from '../interface/IResponse';
import resume from '../api/resumeRoute';

export const tempController: RequestHandler = (req: IRequest, res: IResponse, next: NextFunction) =>{
    return res.json({
        msg: "Custom message!!"
    });
}


export const insertData: RequestHandler = (req: IRequest, res: IResponse, next: NextFunction) =>{
    return res.json({
        msg: req.data,
        resume: req.resumes,
        experience: req.experience,
        education: req.educations
    });
}

export const readData: RequestHandler = (req: IRequest, res: IResponse, next: NextFunction) =>{
    return res.json({
        resumes: req.resumes
    });
}
