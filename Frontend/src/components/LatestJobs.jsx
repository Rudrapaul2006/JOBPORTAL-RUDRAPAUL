import React from "react";
import JobCards from "./JobCards";
import Job from "./Job";
import { useSelector } from "react-redux";

// Job in home -
const LatestJobs = () => {
let { alljobs } = useSelector((state) => state.job);
  return (
    <div className="lg:mx-17 mt-20 py-4 px-4">
      <h1 className="text-3xl ml-4  font-bold mb-8">
        <span className="text-emerald-700">Latest and </span> top job openings
      </h1>
      {
        alljobs.length === 0 ? <span>No Jobs Available</span> : <JobCards jobs={alljobs} />
      }
    </div>
  );
};

export default LatestJobs;
