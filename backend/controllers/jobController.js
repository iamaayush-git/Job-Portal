import { Job } from "../models/jobModel.js";

const postJob = async (req, res) => {
  try {
    const { title, description, salary, location, jobType, position, companyId, requirements, experienceLevel } = req.body;
    const userId = req.user.userId;

    if (!title || !description || !salary || !location || !jobType || !position || !companyId || !requirements || !experienceLevel) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory"
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

const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    }

    const jobs = await Job.find(query).populate("company");
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
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: job,
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
    const allAdminJobs = await Job.find({ created_by: userId })
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


export { postJob, getAllJobs, getJobById, getAdminJobs }