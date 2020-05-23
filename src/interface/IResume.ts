import { IExperience } from './IExperience';
import { IEducation } from './IEducation';

export interface IResume {
    id?: number;
    fullName?: string;
    location?: string;
    experienceYear?: number;
    aboutYou?: string;
    resumePath?: string;
    education?: IEducation[];
    experience?: IExperience[];
}
