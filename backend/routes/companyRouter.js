import express from "express"
import { deleteCompany, getAllCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/companyController.js";
import isAuthenticate from "../middlewares/isAuthenticate.js"
import upload from "../middlewares/multer.js";
const companyRouter = express.Router();

companyRouter.post("/register", isAuthenticate, registerCompany)
companyRouter.post("/update-company/:id", isAuthenticate, upload.single("logo"), updateCompany)
companyRouter.get("/delete-company/:id", isAuthenticate, deleteCompany)
companyRouter.get("/get-all-company", isAuthenticate, getAllCompany)
companyRouter.get("/get-company/:id", isAuthenticate, getCompanyById)




export default companyRouter