import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllAdminJobs from "../Hooks/useGetAllAdminJobs";
import { Button } from "../ui/button";
import axios from "axios";
import { job_end_point } from "../utils/Constant";
import { toast } from "sonner";
import { LuView } from "react-icons/lu";

const AdminsJobTable = () => {
  const { searchJobsByText, allAdminsJob } = useSelector(
    (state) => state.job
  );

  const [filteredJobs, setFilteredJobs] = useState([]);
  const navigate = useNavigate();

  // Fetch all admin jobs
  useGetAllAdminJobs();

  // Filter jobs by Role + Company Name
  useEffect(() => {
    const searchText = searchJobsByText?.toLowerCase() || "";

    const filtered = allAdminsJob.filter((job) =>
      job.role?.toLowerCase().includes(searchText) ||
      job.companyName?.toLowerCase().includes(searchText)
    );

    setFilteredJobs(filtered);
  }, [allAdminsJob, searchJobsByText]);

  // Delete job
  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `${job_end_point}/delete/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.meassage);

        setFilteredJobs((prev) =>
          prev.filter((job) => job._id !== jobId)
        );
      }
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  return (
    <div className="lg:mx-25 mt-9">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="" >Company <span>Name</span></TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>View Details</TableHead>
            <TableHead>Remove</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No jobs registered yet ..
              </TableCell>
            </TableRow>
          ) : (
            filteredJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell className="ml-2 lg:ml-0 ">{job.companyName}</TableCell>
                <TableCell>{job.role}</TableCell>
                <TableCell>
                  {job.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell>
                  <Popover>
                    <PopoverTrigger className="cursor-pointer ml-3 lg:ml-0 ">
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="flex flex-col w-40 gap-2">
                      <div
                        onClick={() =>
                          navigate(`/admin/jobApplicant/${job._id}`)
                        }
                        className="flex gap-3 items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer transition"
                      >
                        <LuView />
                        <span className="font-semibold">Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>

                <TableCell>
                  <span
                    onClick={() =>
                      navigate(`/admin/job/details/${job._id}`)
                    }
                    className="ml-5 lg:ml-0 text-blue-600 hover:underline cursor-pointer"
                  >
                    View
                  </span>
                </TableCell>

                <TableCell>
                  <Button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminsJobTable;
