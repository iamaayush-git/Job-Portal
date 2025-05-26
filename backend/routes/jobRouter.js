import express from "express"
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/jobController.js";
import isAuthenticate from "../middlewares/isAuthenticate.js";

const jobRouter = express.Router();

jobRouter.post("/post-job", isAuthenticate, postJob);
jobRouter.get("/get-all-jobs", getAllJobs);
jobRouter.get("/get-job/:id", isAuthenticate, getJobById);
jobRouter.get("/get-admin-jobs", isAuthenticate, getAdminJobs);



export default jobRouter