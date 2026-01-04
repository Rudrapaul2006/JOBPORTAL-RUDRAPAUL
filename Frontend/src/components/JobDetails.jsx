import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { api_end_point, applicant_end_point, job_end_point } from "./utils/Constant";
import { setSingleJob } from "./Redux/jobSlice";
import { toast } from "sonner";
import NavBar from "./shared/NavBar";

let JobDetails = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let params = useParams();
  let jobId = params.id

  let { singleJob } = useSelector((state) => state.job);
  let { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    let fetchJobAndApplicants = async () => {
      try {
        let jobRes = await axios.get(
          `${job_end_point}/get/${jobId}`,
          { withCredentials: true }
        );

        let appRes = await axios.get(
          `${applicant_end_point}/applicants/${jobId}`,
          { withCredentials: true }
        );

        if (jobRes.data.success && appRes.data.success) {
          dispatch(
            setSingleJob({
              ...jobRes.data.job,
              application: appRes.data.applicants,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (jobId) fetchJobAndApplicants();
  }, [jobId, dispatch]);

  let applied =
    user &&
    singleJob?.application?.some(
      (app) => app?.applicant?._id === user?._id
    );

  let handleApply = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to apply");
      return;
    }

    if (applied) return;

    try {
      let res = await axios.post(
        `${applicant_end_point}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Applied successfully");
        dispatch(
          setSingleJob({
            ...singleJob,
            application: [
              ...(singleJob.application || []),
              { applicant: user, status: "Pending" },
            ],
          })
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Something went wrong while applying"
      );
    }
  }

  let handleApplyCancel = async () => {
    try {
      let res = await axios.delete(
        `${applicant_end_point}/delete/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        // optional UI update here
        
      }
    } catch (error) {
      console.error(error);
      toast.error("Not deleted");
    }
  };



  if (!singleJob) {
    return (
      <div className="text-center py-12 text-gray-500">
        Loading job details...
      </div>
    );
  }

  return (
    <>
      <NavBar />

      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6 h-100">

        <div className="lg:col-span-2 bg-white border  rounded-lg p-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-600 mb-4"
          >
            <div className="p-1 border border-gray-200 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 duration-300 "><IoChevronBackOutline size={22} /></div>
          </button>

          <h1 className="text-2xl font-semibold text-gray-900">
            {singleJob.title}
          </h1>
          <p className="text-gray-600 text-3xl font-semibold mt-1">
            {singleJob.companyName}
          </p>
          <p className="text-gray-500 text-sm font-md mt-1">
            {singleJob.description}
          </p>

          {/* INFO ROW */}
          <div className="flex flex-wrap  gap-3 mt-4 text-sm h-fit text-blue-500">
            <span className="px-3 py-1 bg-gray-100 rounded">
              {singleJob.jobType}
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded">
              {singleJob.location}
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded">
              {singleJob.salary} ₹
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded">
              {singleJob.experience} yr of experience
            </span>
          </div>

          <hr className="my-6" />

          {/* DETAILS */}
          <div className="space-y-4 text-sm leading-relaxed">
            <div>
              <p className="font-medium text-md text-gray-800">Role</p>
              <p className="text-gray-600">{singleJob.role || "N/A"}</p>
            </div>

            <div>
              <p className="font-medium text-gray-800">Requirements</p>
              <p className="text-gray-600">
                {singleJob.requirements?.join(", ") || "N/A"}
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-800">Location</p>
              <p className="text-gray-600">
                {singleJob.location || "N/A"}
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-800">Salary</p>
              <p className="text-gray-600">
                {singleJob.salary + " ₹" || "N/A"}
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-800">Experience</p>
              <p className="text-gray-600">
                {singleJob.experience + " yr" || "N/A"}
              </p>
            </div>

            <div className="flex gap-10">
              <p>
                <span className="font-medium">Applicants:</span>{" "}
                {singleJob.application?.length || 0}
              </p>
              <p>
                <span className="font-medium">Positions:</span>{" "}
                {singleJob.position || 0}
              </p>
              <p>
                <span className="font-medium">Posted:</span>{" "}
                {singleJob.createdAt?.split("T")[0]}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-5 h-fit">
          {applied ? (
            <>
              <Button disabled className="w-full">
                Applied
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">
                You have already applied for this job
              </p>
            </>
          ) : (
            <Button onClick={handleApply} className="w-full cursor-pointer">
              Apply Now
            </Button>
          )}


        </div>
      </div>
    </>
  );
};

export default JobDetails;
