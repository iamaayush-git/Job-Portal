import express from "express";
import { applyJob, cancelApplication, getApplicants, getAppliedJobs, updateStatus } from "../controllers/applicationController.js";
import isauthenicate from "../middlewares/isAuthenticate.js"

const applicationRouter = express.Router();


applicationRouter.get("/apply/:id", isauthenicate, applyJob)
applicationRouter.get("/cancel-application/:id", isauthenicate, cancelApplication)
applicationRouter.get("/get-applied-jobs", isauthenicate, getAppliedJobs)
applicationRouter.get("/get-applicants/:id", isauthenicate, getApplicants)
applicationRouter.post("/update-status/:id", isauthenicate, updateStatus)

export default applicationRouter;