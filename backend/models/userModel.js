import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'recruiter'],
    required: true,
  },
  profile: {
    bio: {
      type: String,
    },
    resume: {
      type: String
    },
    resumeOriginalName: {
      type: String,
    },
    skills: [{ type: String }],
    // company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    photo: {
      type: String,
      default: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
    }
  }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema)