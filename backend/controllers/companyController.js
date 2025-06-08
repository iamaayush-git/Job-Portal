import { Company } from "../models/companyModel.js";
import { cloudinary } from "../utils/cloudinary.js";
import fs from "fs"

const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        success: false,
        message: "Company name should be required"
      })
    }

    const company = await Company.findOne({ name: companyName });

    if (company) {
      return res.status(400).json({
        success: false,
        message: "Company name already exists"
      })
    }

    const newCompany = await Company.create({
      name: companyName,
      userId: req.user.userId
    })

    res.status(200).json({
      success: true,
      newCompany,
      message: "Company registered successfully"
    })

  } catch (error) {
    console.log(error),
      res.status(500).json({
        success: false,
        message: "Internal server error"
      })
  }
}

const getAllCompany = async (req, res) => {
  try {
    const userId = req.user.userId;
    const allCompanies = await Company.find({ userId });
    if (!allCompanies) {
      return res.status(404).json({
        success: false,
        message: "Companies not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "All companies",
      allCompanies
    })


  } catch (error) {
    console.log(error),
      res.status(500).json({
        success: false,
        message: "Internal server error"
      })
  }
}

const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "No company found"
      })
    }

    res.status(200).json({
      success: true,
      message: "Company",
      company
    })


  } catch (error) {
    console.log(error),
      res.status(500).json({
        success: false,
        message: "Internal server error"
      })
  }
}
const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const logo = req.file;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name can not be empty"
      })
    }

    // cloudinary
    let logoUrl = null;
    if (logo) {
      const result = await cloudinary.uploader.upload(logo.path, {
        folder: "company-logo"
      })
      logoUrl = result.secure_url
      // delete files from local storage
      fs.unlinkSync(logo.path)
    }

    const upDateData = {
      name,
      name,
      description,
      website,
      location
    }
    if (logoUrl) {
      upDateData.logo = logoUrl
    }


    const company = await Company.findByIdAndUpdate(req.params.id, upDateData, { new: true })

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Company information updated",
      company
    })

  } catch (error) {
    console.log(error),
      res.status(500).json({
        success: false,
        message: "Internal server error"
      })
  }
}

const deleteCompany = async (req, res) => {
  const companyId = req.params.id
  if (!companyId) {
    return res.status(400).json({
      success: false,
      message: "Company id doesn't found"
    })
  }

  const company = await Company.findByIdAndDelete(companyId);

  return res.status(200).json({
    success: true,
    message: "Company deleted successfully"
  })
}



export { registerCompany, getAllCompany, getCompanyById, updateCompany, deleteCompany }