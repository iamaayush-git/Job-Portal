import { Application } from "../models/applicationModel.js";
import { Job } from "../models/jobModel.js";
import { User } from "../models/userModel.js";

const applyJob = async (req, res) => {
  try {
    const userId = req.user.userId;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job id is required"
      })
    }
    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "Already applied for this application"
      })
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "job doesn't match"
      })
    }

    const application = await Application.create({
      job: jobId,
      applicant: userId,
    })

    job.applications.push(application._id);
    await job.save();

    return res.status(201).json({
      success: true,
      message: "Job applied successfully"
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

const cancelApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { userId } = req.user;

    const application = await Application.findById(applicationId)

    const isVerify = application.applicant.toString() === userId
    if (!isVerify) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to access this application."
      })
    }


    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      })
    }

    await Job.updateMany(
      { applications: applicationId },
      { $pull: { applications: applicationId } }
    )

    await Application.findByIdAndDelete(applicationId);

    return res.status(200).json({
      success: true,
      message: "Application deleted successful"
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user.userId;
    const appliedJobs = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
      path: 'job',
      populate: {
        path: 'company'
      },
      options: { sort: { createdAt: -1 } }
    })

    if (!appliedJobs) {
      return res.status(404).json({
        success: false,
        message: "Jobs not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Applied jobs",
      appliedJobs
    })


  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const applicants = await Application.find({ job: jobId }).sort({ createdAt: -1 }).populate({
      path: 'applicant',
      options: { sort: { createdAt: -1 } }
    })

    if (!applicants) {
      return res.status(404).json({
        success: false,
        message: "No applicant found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Applicants",
      applicants
    })


  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })

  }
}

const updateStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;
    const updatedApplication = await Application.findByIdAndUpdate(applicationId, { status }, { new: true })

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required"
      })
    }

    if (!updatedApplication) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Status updated successfully"
    })


  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}


export { applyJob, getAppliedJobs, getApplicants, updateStatus, cancelApplication }