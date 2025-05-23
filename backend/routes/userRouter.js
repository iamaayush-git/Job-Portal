import express from "express"
import { login, logout, registerUser, updateProfile } from "../controllers/userController.js";
import isAuthenticate from "../middlewares/isAuthenticate.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", upload.single("profile"), registerUser)
userRouter.post("/login", login);
userRouter.get("/logout", logout)
userRouter.post("/profile/update", isAuthenticate, updateProfile)

export default userRouter;