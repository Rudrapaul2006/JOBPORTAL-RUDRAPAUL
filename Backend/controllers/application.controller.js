import { Application } from "../models/Application.model.js";
import { Job } from "../models/Job.model.js";

//Aplly job : 
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required.",
                success: false,
            });
        }

        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId,
        });

        if (existingApplication) {
            return res.status(409).json({
                message: "You have already applied for this job",
                success: false,
            });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        if (!job.applications) job.applications = [];
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully",
            success: true,
            application: newApplication,
        });
    } catch (error) {
        console.error("Error in applyJob:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

//Get all applied jobs (for student) :
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;

        const applications = await Application.find({ applicant: userId })
            .populate({
                path: "job",
                populate: {
                    path: "company"
                }
            })
            .sort({ createdAt: -1 });

        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: "No applied jobs found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Applied jobs fetched successfully",
            applications,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

//Admin can show how many applicant apply for the job :
export let getApplicants = async (req, res) => {
    try {
        let jobId = req.params.id;

        let applicants = await Application.find({ job: jobId })
            .sort({ createdAt: -1 })
            .populate({
                path: "applicant",
                select: "fullname email phone role profile createdAt",
            });

        if (!applicants) {
            return res.status(404).json({
                message: "No applicants found for this job.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Applicants fetched successfully.",
            applicants,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

//Update applicants status :
export let updateApplicant = async (req, res) => {
    try {
        let applicantId = req.params.id;

        let { status } = req.body;
        if (!status) {
            return res.status(400).json({
                meassage: "Status is required ..",
                success: false,
            })
        }


        let validStatuses = ["Pending", "Accepted", "Rejected"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status value.",
                success: false
            });
        }

        let updatedApplicant = await Application.findByIdAndUpdate(
            applicantId,
            { status: status },
            { new: true }
        );

        if (!updatedApplicant) {
            return res.status(404).json({
                message: "Applicant not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Applicant status updated successfully.",
            applicant: updatedApplicant,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

//Delete user id by (application id) -
export let DeleteApplication = async (req, res) => {
    try {
        let jobId = req.params.id;
        let deleteUserApplication = await Application.findByIdAndDelete({job : jobId});
        if(!deleteUserApplication){
            return res.status(404).json({
                message: "Applicant not found.",
                success: false
            });
        }
        return res.status(200).json({
            message: "Applicantion deleted successfully.",
            applicant: deleteUserApplication,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}