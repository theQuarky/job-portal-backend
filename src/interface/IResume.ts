import { IExperience } from './IExperience';
import { IEducation } from './IEducation';

export interface IResume {
    id?: number;
    fullName?: string;
    location?: string;
    skills?:string;
    experienceYear?: number;
    aboutYou?: string;
    addedBy?:number;
    resumePath?: string;
    education?: IEducation[];
    experience?: IExperience[];
    isDel?: number; 
}
