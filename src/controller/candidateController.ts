import * as express from 'express';
import * as _ from 'lodash';
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';

export const sendCandidate: express.RequestHandler = (req:IRequest, res:IResponse, next:express.NextFunction)=> {
    console.log(req.candidate);
    return res.send({
        message: "candidate registed successfully",
        data: req.candidate
    });
}

export const sendLoginToken: express.RequestHandler = (req: IRequest, res: IResponse, next: express.NextFunction) => {
    res.send({
        data: req.candidate[0],
        token: req.token
    });
}