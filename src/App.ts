import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import apiV1 from './api/index';
import * as errorHandler from './helpers/errorHandler';
const boom = require('express-boom');
import sequelize from './config/db';
import IRequest from './interface/IRequest';
import IResponse from './interface/IResponse';
import { NextFunction } from 'express';
import * as _ from 'lodash';
import JobModel from './models/JobModel';
import ResumeModel from './models/ResumeModel';
import EducationModel from './models/EducationModel';
import ExperienceModel from './models/ExperienceModel';
import CandidateModel from './models/CandidateModel';
import EmployerModel from './models/EmployerModel';


class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.setMiddleware();
    this.setRoutes();
    this.catchErrors();
    this.connectToDatebase();
  }

  private setMiddleware(): void {
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(express.static(__dirname + '/uploads'));
    this.express.use(cors());
    this.express.use(boom());
    this.express.use((req: IRequest, res: IResponse, next: NextFunction) => {
      const params = _.merge(req.body, req.params);
      console.table(params);
      return next();
    });
  }

  private setRoutes(): void {
    this.express.use('/v1', apiV1);
  }

  private catchErrors(): void {
    this.express.use(errorHandler.notFound);
    this.express.use(errorHandler.internalServerError);
  }

  private connectToDatebase(): void {
    sequelize.sync({ force: false });
    sequelize.authenticate()
      .then(() => {

        ExperienceModel.hasOne(ResumeModel);
        ResumeModel.hasMany(ExperienceModel);

        EducationModel.hasOne(ResumeModel);
        ResumeModel.hasMany(EducationModel);

        JobModel.hasOne(EmployerModel, { foreignKey: 'id' });
        EmployerModel.hasMany(JobModel);

        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
  }
}

export default new App().express;
