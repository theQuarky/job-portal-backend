import sequelize from "../config/db";
import { INTEGER, STRING, FLOAT, TEXT } from "sequelize";
import { Model, Sequelize } from "sequelize";
import { DATE } from "sequelize";
import EducationModel from "./EducationModel";
import ExperienceModel from "./ExperienceModel";

class ResumeModel extends Model {}

ResumeModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: STRING,
      allowNull: false,
    },
    location: {
      type: STRING,
      allowNull: true,
    },
    skills: {
      type: STRING,
      allowNull: true,
    },
    experienceYear: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    aboutYou: {
      type: TEXT,
      defaultValue:'',
      allowNull: true,
    },
    addedBy: {
      type: INTEGER,
      allowNull: false,
    },
    resumePath: {
      type: STRING,
      allowNull: true,
    },
    isDel: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "resumes",
    tableName: "resumes",
  }
);

export default ResumeModel;
