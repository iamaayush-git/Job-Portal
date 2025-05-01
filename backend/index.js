import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import connectMongodb from "./utils/db.js";

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


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`)
})