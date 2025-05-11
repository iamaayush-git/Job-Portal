import express from "express"
import { login, registerUser, updateProfile } from "../controllers/userController.js";
import isAuthentiate from "../middlewares/isAuthenticate.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", login);
userRouter.post("/profile/update", isAuthentiate, updateProfile)

export default userRouter;