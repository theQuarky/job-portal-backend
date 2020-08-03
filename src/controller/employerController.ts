import * as express from 'express';
import * as _ from 'lodash';
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';

export const sendEmployer: express.RequestHandler = (req: IRequest, res: IResponse, next: express.NextFunction) => {
    return res.send({
        message: "employer registered successfully",
        data: req.employer
    });
}

export const deleteEmployer: express.RequestHandler = (req:IRequest, res:IResponse, next:express.NextFunction)=> {
    console.log(req.employer);
    return res.send({
        message: "employer deleted successfully"
    });
}

export const changePassword: express.RequestHandler = (req:IRequest, res:IResponse, next:express.NextFunction)=> {
    console.log(req.employer);
    return res.send({
        message: "password changed successfully!!"
    });
}


export const sendLoginToken: express.RequestHandler = (req: IRequest, res: IResponse, next: express.NextFunction) => {
    res.send({
        data: req.employer,
        token: req.token
    });
}

export const avatarPath: express.RequestHandler = (req: IRequest, res: IResponse, next: express.NextFunction) =>{
    return res.json({
        msg: req.employer.avatar
    });
}