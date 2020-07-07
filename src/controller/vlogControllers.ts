import { RequestHandler, NextFunction } from 'express';
import IRequest from "../interface/IRequest";
import IResponse from '../interface/IResponse';

export const tempController: RequestHandler = (req: IRequest, res: IResponse, next: NextFunction) =>{
    return res.json({
        msg: "Custom message!!"
    });
}

export const vlogById: RequestHandler = (req: IRequest, res: IResponse, next: NextFunction) =>{
    return res.json({
        Vlog: req.vlogs
    });
}

export const allVlogs: RequestHandler = (req: IRequest, res: IResponse, next: NextFunction) =>{
    console.log(req.blogs);
    return res.json({
        Vlog: req.vlogs
    });
}

export const updateVlogs: RequestHandler = (req: IRequest, res: IResponse, next: NextFunction) =>{
    return res.json({
        message: req.data
    });
}

export const deleteVlog: RequestHandler = (req: IRequest, res: IResponse, next: NextFunction) =>{
    return res.json({
        message: `Vlog with id ${req.params.id} is deleted!!`
    });
}