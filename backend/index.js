import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import connectMongodb from "./utils/db.js";
import userRouter from "./routes/userRouter.js";
import companyRouter from "./routes/companyRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";

const app = express();
dotenv.config();
connectMongodb();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true,
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // allowedHeaders: ['Content-Type', 'Authorization']
  }
));


// api endpoints
app.get('/', (req, res) => {
  res.status(200).send("API working")
})

app.use("/api/v1/user", userRouter)
app.use("/api/v1/company", companyRouter)
app.use("/api/v1/job", jobRouter)
app.use("/api/v1/application", applicationRouter)


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`)
})