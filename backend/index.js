import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import connectMongodb from "./utils/db.js";
import userRouter from "./routes/userRouter.js";
import companyRouter from "./routes/companyRouter.js";
import jobRouter from "./routes/jobRouter.js";

const app = express();
dotenv.config();
connectMongodb();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const corsOptions = {
  credentials: true
}
app.use(cors(corsOptions));


// api endpoints
app.get('/', (req, res) => {
  res.status(200).send("API working")
})

app.use("/api/v1/user", userRouter)
app.use("/api/v1/company", companyRouter)
app.use("/api/v1/job", jobRouter)


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`)
})