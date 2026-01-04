import React, { useEffect, useState } from 'react'
import NavBar from '../shared/NavBar'
import Job from '../Job'
import { useDispatch, useSelector } from 'react-redux'
import { CiSearch } from 'react-icons/ci'
import axios from 'axios'
import { api_end_point, job_end_point } from '../utils/Constant'
import { setalljobs } from '../Redux/jobSlice'


let Jobs = () => {
    let dispatch = useDispatch();
    let { alljobs } = useSelector((state) => state.job);

    let [input, setInput] = useState("");
    let [filteredJobs, setFilteredJobs] = useState([]);

   //All Job fetching :
    useEffect(() => {
        let getAllJobs = async () => {
            try {
                let res = await axios.get(`${job_end_point}/get`, {
                    withCredentials: true,
                });

                if (res.data.success) {
                    dispatch(setalljobs(res.data.jobs));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        getAllJobs();
    }, [dispatch]);


    useEffect(() => {
        let searchText = input.toLowerCase();

        if (!searchText) {
            setFilteredJobs(alljobs);
            return;
        }

        let filtered = alljobs.filter((job) =>
            job?.role?.toLowerCase().includes(searchText) ||
            job?.companyName?.toLowerCase().includes(searchText) ||
            job?.location?.toLowerCase().includes(searchText)
        );

        setFilteredJobs(filtered);
    }, [alljobs, input]);

    return (
        <>
            <NavBar />

            <div className="sticky top-16 z-10 mb-5 lg:w-[90%] mx-auto bg-white border-b">
                <div className="h-[13vh] flex items-center px-6">
                    <div className="max-w-2xl mx-auto w-full flex rounded-full border shadow-md overflow-hidden">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Find your dream job..."
                            className="w-full px-6 py-3 outline-none"
                        />
                        <button className="px-6 bg-emerald-500 text-white">
                            <CiSearch size={26} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="lg:mx-22">
                {filteredJobs.length === 0 ? (
                    <p className="text-gray-500">Job not found</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Jobs
