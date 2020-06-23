import * as express from 'express';
import * as _ from 'lodash';
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';

export const sendCandidate: express.RequestHandler = (req:IRequest, res:IResponse, next:express.NextFunction)=> {
    console.log(req.candidate);
    return res.send({
        message: "candidate registered successfully",
        data: req.candidate
    });
}

export const deleteCandidate: express.RequestHandler = (req:IRequest, res:IResponse, next:express.NextFunction)=> {
    console.log(req.candidate);
    return res.send({
        message: "candidate deleted successfully"
    });
}
8

export const sendLoginToken: express.RequestHandler = (req: IRequest, res: IResponse, next: express.NextFunction) => {
    res.send({
        data: req.candidate,
        token: req.token
    });
}