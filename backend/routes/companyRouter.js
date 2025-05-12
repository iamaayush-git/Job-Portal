import express from "express"
import { getAllCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/companyController.js";
import isAuthenticate from "../middlewares/isAuthenticate.js"
const companyRouter = express.Router();

companyRouter.post("/register", isAuthenticate, registerCompany)
companyRouter.post("/update-company/:id", isAuthenticate, updateCompany)
companyRouter.get("/get-all-company", isAuthenticate, getAllCompany)
companyRouter.get("/get-company/:id", isAuthenticate, getCompanyById)




export default companyRouter