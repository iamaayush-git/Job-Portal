import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cloudinary } from "../utils/cloudinary.js";
import fs from 'fs'

const registerUser = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      })
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({

      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role
    })

    return res.status(201).json({
      message: "User created successfully",
      success: true,
    })


  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      })
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email or password incorrect",
        success: false,
      })
    }

    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return res.status(400).json({
        success: false,
        message: "Email or password incorrect"
      })
    }

    if (user.role !== role) {
      return res.status(400).json({
        success: false,
        message: "Account doesn't exist with current role"
      })
    }

    const token = jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    }

    res.status(200).cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24
    }).json({
      message: "Login successful",
      user,
      success: true
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "").json({
      success: true,
      message: "Logout successfully",
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills, photo, resume } = req.body;
    const photoFile = req.files['photo']?.[0];
    const resumeFile = req.files['resume']?.[0];


    // cloudinary here
    let photoUrl = null
    if (photoFile) {
      const result = await cloudinary.uploader.upload(photoFile.path, {
        folder: 'profile-photos'
      })
      photoUrl = result.secure_url;
      // delete files from local storage
      fs.unlinkSync(photoFile.path)
    }
    let resumeUrl = null
    if (resumeFile) {
      const result = await cloudinary.uploader.upload(resumeFile.path, {
        folder: 'resume'
      })
      resumeUrl = result.secure_url
      fs.unlinkSync(resumeFile.path)
    }




    const skillsArray = skills ? skills.split(',').map(skill => skill.trim()) : undefined

    const userId = req.user.userId;
    const updatedUser = await User.findByIdAndUpdate(userId, {
      fullname,
      email,
      phoneNumber,
      profile: {
        bio,
        skills: skillsArray,
        photo: photoUrl || photo,
        resume: resumeUrl || resume,
      },
    }, { new: true })

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false
      })
    }
    const user = {
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      role: updatedUser.role,
      profile: {
        bio: updatedUser.profile.bio,
        skills: updatedUser.profile.skills,
        photo: updatedUser.profile.photo,
        resume: updatedUser.profile.resume,
      }
    }



    res.status(200).json({
      message: "Profiled updated successfully",
      success: true,
      user
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

const checkAuth = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized"
      })
    }

    const user = await User.findById(req.user.userId).select("-password");
    return res.status(200).json({
      success: true,
      message: "user",
      user
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

export { registerUser, login, logout, updateProfile, checkAuth }