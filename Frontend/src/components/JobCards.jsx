// JobCards.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const JobCards = ({ jobs }) => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto my-16 px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {jobs?.map((job) => (
        <div
          key={job._id}
          onClick={() => navigate(`/details/${job._id}`)}
          className="flex flex-col justify-between cursor-pointer border border-gray-100 rounded-xl shadow-md p-5 bg-white hover:border-gray-200 hover:shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <h2 className="text-lg mb-1 font-semibold text-gray-800">
            {job.companyName}
          </h2>

          <div className="mt-2">
            <h5 className="text-[15px] font-semibold text-gray-800">
              {job.role}
            </h5>
            <p className="text-gray-500 text-sm mb-2">
              {job.location}
            </p>
          </div>

          <p className="text-gray-600 text-sm mt-1 mb-3 line-clamp-2">
            {job.description}
          </p>

          <div className="w-fit flex flex-col gap-4 sm:flex-col sm:gap-2 sm:mt-1 md:flex-row md:justify-between md:flex-wrap  lg:flex-row lg:justify-between lg:flex-wrap mt-2">

            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
              {job.position} Positions
            </span>
            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
              {job.jobType}
            </span>
            <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
              {job.salary}_rs
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobCards;
