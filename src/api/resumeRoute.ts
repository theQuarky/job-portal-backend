import { Router } from "express";
import authentication from "../helpers/verifyToken";
import * as resumeService from "../service/resumeService";
import * as educationService from "../service/educationService";
import * as experienceService from "../service/experienceService";
import * as resumeController from "../controller/resumeController";
import * as candidateService from "../service/candidateService";
import multer = require("multer");

const upload = multer();
const resume: Router = Router();

resume.post("/", authentication, [
  resumeService.checkLoginType,
  resumeService.validateData,
  resumeService.makeDataPacket,
  resumeService.insertData,
  educationService.deleteData,
  educationService.makeDataPacket,
  educationService.insertData,
  experienceService.deleteData,
  experienceService.makeDataPacket,
  experienceService.insertData,
  resumeController.insertData,
]);

resume.get("/:id", [resumeService.getAllResumeById, resumeController.readData]);

resume.get("/", [resumeService.getAllResume, resumeController.readData]);

resume.get("/candidate/:id", [
  candidateService.findCandidateById,
  resumeService.getAllResumeByCandidateId,
  resumeController.readData,
]);

resume.put("/uploadResume/", authentication, upload.single("resumeFile"), [
  resumeService.checkLoginType,
  resumeService.uploadResume,
  resumeService.updateResumePath,
  resumeController.resumePath,
]);

resume.put("/:id", authentication, [
  resumeService.checkLoginType,
  resumeService.validateData,
  resumeService.getAllResumeById,
  resumeService.validateCandidateIdForResume,
  resumeService.makeDataPacket,
  resumeService.updateResume,
  educationService.deleteData,
  educationService.makeDataPacket,
  educationService.insertData,
  experienceService.deleteData,
  experienceService.makeDataPacket,
  experienceService.insertData,
  resumeController.insertData,
]);

resume.delete("/:id", authentication, [
  resumeService.checkLoginType,
  resumeService.getAllResumeById,
  resumeService.validateCandidateIdForResume,
  resumeService.deleteResume,
  resumeController.deleteData,
]);

export default resume;
