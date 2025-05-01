import mongoose from "mongoose";

const connectMongodb = async () => {
  await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("DB connected successfully");
  }).catch((error) => {
    console.log(error)
  })
}

export default connectMongodb