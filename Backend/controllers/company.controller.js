// import { get } from "mongoose";
import { Company } from "../models/Company.model.js";
import cloudinary from '../utils/Cloudinary.js';
import datauri from "../utils/dataUri.js";

//Company Register :
export let companyRegister = async (req, res) => {
  try {
    let { companyName, description, website, location, logo } = req.body;
    let userId = req.id; // 🧠 comes from authentication middleware

    if (!companyName || companyName.trim() === "") {
      return res.status(400).json({
        message: "Company name is required ..",
        success: false,
      });
    }

    let existingCompany = await Company.findOne({ companyName });
    if (existingCompany) {
      return res.status(400).json({
        message: "Company already exists ..",
        success: false,
      });
    }

    let newCompany = await Company.create({
      companyName,
      description,
      website,
      location,
      logo,
      userId, // ✅ Required field from model
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company: newCompany,
      success: true,
    });

  } catch (error) {
    console.error("Error in companyRegister:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

// Get Company for logged in user : 
export let getCompany = async (req , res) => {
    try {

        let userId = req.id || req.user.id;

        let company = await Company.find({ userId });
        if(!company){
            return res.status(404).json({
                message : "Company not found ..",
                success : false
            })
        }

        return res.status(200).json({
            message : "Company found successfully ..",
            company, 
            success : true
        }) 

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Internal Server Error",
            success : false
        })
    }
}

//Get Company By Id :
export let getCompanyById = async (req , res) => {
    try {
        let companyId = req.params.id;

        let company = await Company.findById(companyId);   
        if(!company){
            return res.status(404).json({
                message : "No company found ..",
                success : false
            })
        }

        return res.status(200).json({
            message : "Company fetched successfully ..",
            company, 
            success : true
        })  

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message : "Internal Server Error",
            success : false
        })
    }
}

// Update Company :
export let companyUpdate = async (req, res) => {
  try {
    let companyId = req.params.id;
    let { companyName, description, website, location } = req.body;

    let company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    // Logo upload (same pattern as userUpdate)
    if (req.file) {
      let fileUri = datauri(req.file);
      let cloudRes = await cloudinary.uploader.upload(
        fileUri.content,
        { folder: "company_logos" }
      );
      company.logo = cloudRes.secure_url;
    }

    // Update only provided fields
    if (companyName) company.companyName = companyName;
    if (description) company.description = description;
    if (website) company.website = website;
    if (location) company.location = location;

    await company.save();

    return res.status(200).json({
      message: "Company Updated Successfully",
      updatedCompany: company,
      success: true,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

//Delete Company :
export let companyDelete = async (req , res) => {
  try {
    let companyId = req.params.id;

    let company = await Company.findByIdAndDelete(companyId);
    if(!company){
      return res.status(404).json({
        message : "Company not found ..",
        success : false
      })
    }

    return res.status(200).json({
      message : "Company deleted successfully ..",
      success : true
    })
      
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      message : "Internal Server Error",
      success : false
    })
  }
}


