import { Job } from "../models/Job.model.js";
import { Company } from "../models/Company.model.js";


export let registerJob = async (req, res) => {
  try {
    let userId = req.id; // from auth middleware

    let {
      role,
      description,
      requirements,
      salary,
      experience,
      location,
      jobType,
      position,
      companyId,
    } = req.body;

    // 🔴 Validation
    if (
      !role ||
      !description ||
      !requirements ||
      !salary ||
      !experience ||
      !location ||
      !jobType ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // ✅ Get company from DB
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    // ✅ Create Job
    const job = await Job.create({
      role,
      description,
      requirements,
      salary,
      experience,
      location,
      jobType,
      position,
      company: company._id,
      companyName: company.companyName,
      created_by: userId,
    });

    return res.status(201).json({
      message: "Job created successfully",
      job,
      success: true,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//Get all the jobs (for student) :
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate("company", "companyName logo")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      jobs,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get All job's by id :
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId)
      .populate({
        path: "applicant",
        populate: {
          path: "applicant",
          select: "name email _id", // only these fields from User
        },
      })
      .populate("company");

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job fetched successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

//Update Jobs by id : 
export let updateJob = async (req ,res) => {
  try {
    let jobId = req.params.id;
  let { role, description, requirements, salary, experience, location, jobType, position } = req.body;

  let job = await Job.findById(jobId);
  if (!job) {
    return res.status(404).json({
      success: false,
      meassage: "Job not founded .."
    })
  }

  if (role) job.role = role;
  if (description) job.description = description;
  if (requirements) job.requirements = requirements;
  if (salary) job.salary = salary;
  if (experience) job.experience = experience;
  if (location) job.location = location;
  if (jobType) job.jobType = jobType;
  if (position) job.position = position;

  await job.save();

  return res.status(200).json({
    message: "Company Updated Successfully",
    job,
    success: true,
  });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
}

// Delete Job By Id :
export let deleteJob = async (req , res) => {
  try {
    let jobId = req.params.id;

    let job = await Job.findByIdAndDelete(jobId);
    if(!job){
      return res.status(404).json({
        success : false,
        meassage : "Job not founded .."
      })
    }

    return res.status(200).json({
      success : true,
      meassage : "Job Deleted .."
    })
  } catch (error) {
    console.error(error);
    return res.statu(400).json({
      meassage: "Internal server error ..",
      success: false
    })
  }
}

// Get Job by recruiter created :
export let getJobByAdmin = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: 'company',
      createdAt: -1
    });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false
      })
    };
    return res.status(200).json({
      jobs,
      success: true
    })

  } catch (error) {
    console.error(error);
    return res.statu(400).json({
      meassage: "Internal server error ..",
      success: false
    })
  }
}

