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
    enum: ['student', 'recuriter'],
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
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    photo: {
      type: String,
      default: "",

    }
  }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema)