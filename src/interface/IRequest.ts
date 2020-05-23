import * as express from 'express';
import { IEmployer } from './IEmployer';
import { ICandidate } from './ICandidate';
import { IJobs } from './IJobs';
import { IResume } from './IResume';
import { IEducation } from './IEducation';
import { IExperience } from './IExperience';

export default interface IRequest extends express.Request {
    data?: any;
    token?: string;
    employer?: IEmployer[] | IEmployer | any;
    candidate?: ICandidate[] | ICandidate | any;
    jobs?: IJobs[] | IJobs | any;
    resumes?: IResume[] | IResume | any;
    educations?: IEducation[] | IEducation | any;
    experience?: IExperience[] | IExperience |any;
}