import express from "express"
import { deleteJob, getAdminJobs, getAllJobs, getJobById, getSavedJobs, postJob, removeSavedJobs, saveJob } from "../controllers/jobController.js";
import isAuthenticate from "../middlewares/isAuthenticate.js";

const jobRouter = express.Router();

jobRouter.post("/post-job/:id", isAuthenticate, postJob);
jobRouter.get("/delete-job/:id", isAuthenticate, deleteJob);
jobRouter.get("/get-all-jobs", getAllJobs);
jobRouter.get("/get-job/:id", isAuthenticate, getJobById);
jobRouter.get("/get-admin-jobs", isAuthenticate, getAdminJobs);
jobRouter.get("/save-job/:id", isAuthenticate, saveJob);
jobRouter.get("/remove-saved-job/:id", isAuthenticate, removeSavedJobs);
jobRouter.get("/get-saved-jobs", isAuthenticate, getSavedJobs);


export default jobRouter