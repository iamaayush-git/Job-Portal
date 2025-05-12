import express from "express"
import { login, logout, registerUser, updateProfile } from "../controllers/userController.js";
import isAuthenticate from "../middlewares/isAuthenticate.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", login);
userRouter.get("/logout", logout)
userRouter.post("/profile/update", isAuthenticate, updateProfile)

export default userRouter;