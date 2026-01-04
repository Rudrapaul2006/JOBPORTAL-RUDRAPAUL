import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllAdminsJob } from "../Redux/jobSlice";
import { job_end_point } from "../utils/Constant";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminsJob = async () => {
      try {
        const res = await axios.get(`${job_end_point}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllAdminsJob(res.data.jobs)); 
        }

        // console.log("Jobs" , res.data.jobs);
        
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllAdminsJob();
  }, [dispatch]);
};

export default useGetAllAdminJobs;
