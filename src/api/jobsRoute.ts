import { Router } from 'express';
import * as jobController from '../controller/jobsController';
import * as jobServices from '../service/jobsService';
import * as employerServices from '../service/employerService';
import authentication from '../helpers/verifyToken';

const jobs: Router = Router();

// jobs.get('/', authentication, [
//     jobServices.checkLoginType,
//     jobController.tempController
// ]);

jobs.post('/', authentication, [
    jobServices.checkLoginType,
    jobServices.validateData,
    jobServices.makeDataPacket,
    jobServices.insertJobs,
    jobController.tempController
]);

jobs.get('/',[
    jobServices.getAllJobs,
    jobController.allJobs
]);

jobs.get('/myjobs',authentication,[
    jobServices.checkLoginType,
    jobServices.myJobs,
    jobController.allJobs
]);

jobs.get('/myjobscount',authentication,[
    jobServices.checkLoginType,
    jobServices.countMyJobs,
    jobController.myJobLength
]);

jobs.get('/:id',[
    jobServices.getJobById,
    jobController.jobById
]);

jobs.put('/:id',authentication,[
    jobServices.checkLoginType,
    jobServices.validateData,
    jobServices.makeDataPacket,
    jobServices.getJobById,
    jobServices.updateJob,
    jobController.updateJobs
]);

jobs.delete('/:id',authentication,[
    jobServices.checkLoginType,
    jobServices.getJobById,
    jobServices.deleteJob,
    jobController.deleteJob
])

export default jobs;