import * as express from 'express';
import { IEmployer } from './IEmployer';
import { ICandidate } from './ICandidate';

export default interface IRequest extends express.Request {
    data?: any;
    token?: string;
    employer?: IEmployer[] | IEmployer | any;
    candidate?: ICandidate[] | ICandidate | any;
}