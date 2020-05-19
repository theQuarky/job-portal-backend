import * as express from 'express';
import { IEmployer } from './IEmployer';
import { ICandidate } from './ICandidate';
import { IJobs } from './IJobs';

export default interface IRequest extends express.Request {
    data?: any;
    token?: string;
    employer?: IEmployer[] | IEmployer | any;
    candidate?: ICandidate[] | ICandidate | any;
    jobs?: IJobs[] | IJobs | any;
}