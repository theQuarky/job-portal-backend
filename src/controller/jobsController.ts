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
        job: req.jobs
    });
}

export const allJobs: RequestHandler = (req: IRequest, res: IResponse, next: NextFunction) =>{
    return res.json({
        job: req.jobs
    });
}

export const updateJobs: RequestHandler = (req: IRequest, res: IResponse, next: NextFunction) =>{
    return res.json({
        message: req.data
    });
}

export const deleteJob: RequestHandler = (req: IRequest, res: IResponse, next: NextFunction) =>{
    return res.json({
        message: `Job with id ${req.params.id} is deleted!!`
    });
}