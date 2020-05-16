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

export const sendLoginToken: express.RequestHandler = (req: IRequest, res: IResponse, next: express.NextFunction) => {
    res.send({
        data: req.employer,
        token: req.token
    });
}