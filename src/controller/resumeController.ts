import { RequestHandler, NextFunction } from 'express';
import IRequest from "../interface/IRequest";
import IResponse from '../interface/IResponse';
import resume from '../api/resumeRoute';

export const resumePath: RequestHandler = (req: IRequest, res: IResponse, next: NextFunction) =>{
    return res.json({
        msg: req.resumes.resumePath
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

export const deleteData: RequestHandler = (req: IRequest, res: IResponse, next: NextFunction) =>{
    return res.json({
        mdg: "resume deleted successfully!!"
    });
}
