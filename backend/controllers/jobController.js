import { Application } from "../models/applicationModel.js";
import { Company } from "../models/companyModel.js";
import { Job } from "../models/jobModel.js";
import { User } from "../models/userModel.js";

const postJob = async (req, res) => {
  try {
    const { title, description, salary, location, jobType, position, requirements, experienceLevel } = req.body;
    const userId = req.user.userId;
    const companyId = req.params.id;

    if (!title || !description || !salary || !location || !jobType || !position || !companyId || !requirements || !experienceLevel) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory"
      })
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Company id doesn't match"
      })
    }


    const requirementArray = requirements.split(',').map(item => item.trim())

    const job = await Job.create({
      title,
      description,
      salary,
      location,
      jobType,
      position: Number(position),
      requirements: requirementArray,
      experienceLevel: Number(experienceLevel),
      company: companyId,
      created_by: userId
    })

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      })
    }
    const userId = req.user.userId;
    if (job.created_by.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this job"
      })
    }

    await Job.findByIdAndDelete(jobId);
    await Application.deleteMany({ job: jobId })
    await User.updateMany(
      { "profile.savedJobs": jobId },
      { $pull: { "profile.savedJobs": jobId } }
    );

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully"
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    }

    const jobs = await Job.find(query).populate("company").sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        success: false,
        message: "Jobs not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Jobs",
      jobs
    })


  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })

  }
}

const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate('company').populate('applications');
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "job",
      job
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

const getAdminJobs = async (req, res) => {
  try {
    const userId = req.user.userId;
    const allAdminJobs = await Job.find({ created_by: userId }).populate('company')
    if (!allAdminJobs) {
      return res.status(404).json({
        success: false,
        message: "No jobs found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "All jobs",
      allAdminJobs
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}
const saveJob = async (req, res) => {
  try {
    const { userId } = req.user
    const jobId = req.params.id

    let user = await User.findById(userId).populate('profile.savedJobs')
    const job = await Job.findById(jobId)

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Jobs not found"
      })
    }


    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    const isAlreadyApplied = user.profile.savedJobs.some(job => job._id.toString() === jobId)

    if (isAlreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "Job already saved"
      })
    }


    user.profile.savedJobs.push(job._id);
    await user.save();

    user = await User.findById(userId).populate({
      path: 'profile.savedJobs',
      populate: 'company'
    })

    return res.status(200).json({
      success: true,
      message: "Job saved successfully",
      savedJobs: user.profile.savedJobs
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

const getSavedJobs = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId).populate({
      path: 'profile.savedJobs',
      populate: {
        path: 'company'
      }
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Saved jobs",
      savedJobs: user.profile.savedJobs
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

const removeSavedJobs = async (req, res) => {
  try {
    const { userId } = req.user;
    const jobId = req.params.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Jobs not found"
      })
    }

    const user = await User.findById(userId).populate({
      path: 'profile.savedJobs',
      populate: 'company'
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    const savedJobs = user.profile.savedJobs.filter((job) => job._id.toString() !== jobId)
    user.profile.savedJobs = savedJobs
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Jobs removed successfully",
      savedJobs: user.profile.savedJobs
    })



  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}


export { postJob, getAllJobs, getJobById, getAdminJobs, saveJob, removeSavedJobs, getSavedJobs, deleteJob }