import React, { useEffect, useState } from 'react'
import NavBar from '../shared/NavBar'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';
import { Edit2 } from 'lucide-react';
import { job_end_point } from '../utils/Constant';

const AdminJobDetails = () => {
    let params = useParams();
    let jobId = params.id;
    // console.log(jobId);
    let navigate = useNavigate()

    let [jobDetails, setJobDetails] = useState([]);

    useEffect(() => {
        let fetchDetails = async () => {
            try {
                let res = await axios.get(`${job_end_point}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    // console.log(res.data.job);
                    setJobDetails(res.data.job)
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchDetails();
    }, [jobId])

    return (
        <>
            <NavBar />

            <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-md border border-gray-200">
                <div className="flex flex-col gap-3 px-4 pt-5 ">

                    <div className='flex justify-between mb-3'>
                        <button
                        onClick={() => navigate("/admin/jobs")}
                        className="p-2 w-fit rounded-full bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                    >
                        <IoChevronBackOutline size={22} className="text-gray-600" />
                    </button>

                    <div onClick={() =>
                        navigate(`/admin/updateJob/${jobId}`)
                    } className="flex px-4 items-center gap-4 rounded-md cursor-pointer border bg-gray-200 hover:bg-gray-300 duration-300 transition">
                        <Edit2 size={16} className="mt-1" />
                        <div className="font-semibold">Update Details</div>
                    </div>
                    </div>

                    <h2 className="text-2xl ml-2 font-bold text-gray-800">
                        {jobDetails.companyName}
                    </h2>
                </div>

                <div className="px-6 pb-6 mt-2">
                    <p className="text-gray-500 text-lg mb-8">
                        {/* {jobDetails.location} */}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                        <div><span className="font-semibold">Location :</span> {jobDetails.location}</div>
                        <div><span className="font-semibold">Role :</span> {jobDetails.role}</div>
                        <div><span className="font-semibold">Experience :</span> {jobDetails.experience} yr</div>
                        <div><span className="font-semibold">Job Type :</span> {jobDetails.jobType}</div>
                        <div><span className="font-semibold">Positions :</span> {jobDetails.position}</div>
                        <div>
                            <span className="font-semibold">Salary :</span>{" "}
                            <span className="text-green-600 font-medium">
                                {jobDetails.salary}
                            </span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="font-semibold text-lg text-gray-800 mb-2">
                            Job Description
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            {jobDetails.description}
                        </p>
                    </div>

                    <div className="mt-6">
                        <h3 className="font-semibold text-lg text-gray-800 mb-2">
                            Requirements
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            {jobDetails.requirements}
                        </p>
                    </div>
                </div>
            </div>


        </>
    )
}

export default AdminJobDetails
