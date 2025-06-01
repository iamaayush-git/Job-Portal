import express from "express"
import { checkAuth, login, logout, registerUser, updateProfile } from "../controllers/userController.js";
import isAuthenticate from "../middlewares/isAuthenticate.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", upload.single("photo"), registerUser)
userRouter.post("/login", login);
userRouter.get("/logout", isAuthenticate, logout)
userRouter.post("/profile/update", isAuthenticate, upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), updateProfile)
userRouter.get("/check-auth", checkAuth)

export default userRouter;