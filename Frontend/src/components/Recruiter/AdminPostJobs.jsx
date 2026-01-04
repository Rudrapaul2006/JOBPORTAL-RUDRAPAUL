import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setLoading } from '../Redux/authSlice';
import axios from 'axios';
import { companies_end_point, job_end_point } from '../utils/Constant';
import { toast } from 'sonner';
import { setCompanies } from '../Redux/companySlice';
import NavBar from '../shared/NavBar';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FaArrowLeft } from 'react-icons/fa';
import { IoChevronBackOutline } from 'react-icons/io5';

const AdminPostJobs = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let [loading, setLoading] = useState("");
    let { companies } = useSelector((state) => state.company);

    let [input, setInput] = useState({
        role: "",
        description: "",
        requirements: "",
        salary: "",
        experience: "",
        location: "",
        jobType: "",
        position: "",
        companyId: ""
    })

    let handleForm = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    let submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let res = await axios.post(`${job_end_point}/register`, input, {
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res?.response?.data?.meassage || "Job post successfully")
                navigate("/admin/jobs");
            }
        } catch (err) {
            // console.log("Company fetch failed", err);
            toast.error(err.response?.data?.message || "Job posting failed"
            )
        } finally {
            setLoading(false);
        }
    }



    useEffect(() => {
        let fetchCompany = async () => {
            try {
                let res = await axios.get(`${companies_end_point}/get`, {
                    withCredentials: true,
                })
                if (res.data.success) {
                    // toast.success(res.data.meassage || "Company fetched successfully")
                    dispatch(setCompanies(res.data.company))
                }

            } catch (err) {
                // toast.error(res.data.meassage);
                console.log("Company fetch failed", err);
            }
        }

        fetchCompany();
    }, [])

    return (
        <>
            <NavBar />
            <div className='lg:mx-25 mt-3'>
                {/* <FaArrowLeft onClick={() => navigate("/admin/jobs")} size={37} className='border border-gray-300 p-2 shadow-md rounded-2xl cursor-pointer hover:text-[red]/80 duration-300 hover:shadow-[red]/30' /> */}
                <div className='mx-auto w-94 lg:w-180 rounded-md shadow-md border'>

                    <div className='flex flex-col'>
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 ml-5 mt-3 w-fit rounded-full bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                        >
                            <IoChevronBackOutline size={22} className="text-gray-600" />
                        </button>
                        <div className='text-2xl font-bold ml-5 mt-2'>Posting new Job</div>
                    </div>

                    <form onSubmit={submitHandler} className="max-w-4xl mx-auto bg-white p-5 rounded-md shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Role
                                </label>
                                <input
                                    type="text"
                                    name="role"
                                    value={input.role}
                                    onChange={handleForm}
                                    placeholder="Enter role"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={handleForm}
                                    placeholder="Enter description"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Requirements
                                </label>
                                <input
                                    type="text"
                                    name="requirements"
                                    value={input.requirements}
                                    onChange={handleForm}
                                    placeholder="Enter requirements"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Experience
                                </label>
                                <input
                                    type="number"
                                    name="experience"
                                    value={input.experience}
                                    onChange={handleForm}
                                    placeholder="Enter experience"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Salary
                                </label>
                                <input
                                    type="number"
                                    name="salary"
                                    value={input.salary}
                                    onChange={handleForm}
                                    placeholder="Enter salary"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={handleForm}
                                    placeholder="Enter location"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Job Type
                                </label>
                                <input
                                    type="text"
                                    name="jobType"
                                    value={input.jobType}
                                    onChange={handleForm}
                                    placeholder="Full-time / Part-time"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Position
                                </label>
                                <input
                                    type="number"
                                    name="position"
                                    value={input.position}
                                    onChange={handleForm}
                                    placeholder="Number of positions"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                        </div>

                        <div className="md:col-span-2 mt-8">
                            <Select
                                value={input.companyId}
                                onValueChange={(value) =>
                                    setInput({ ...input, companyId: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select company" />
                                </SelectTrigger>

                                <SelectContent>
                                    {companies.length > 0 ? (
                                        companies.map((company) => (
                                            <SelectItem key={company._id} value={company._id}>
                                                {company.companyName}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <div className="px-4 py-2 text-sm text-gray-500">
                                            No companies found
                                        </div>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="mt-9 lg:mt-4 text-center">
                            <button
                                type="submit"
                                className=" px-8 py-3 bg-blue-600 text-white font-semibold
                 rounded-lg shadow-md hover:bg-blue-700
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 transition cursor-pointer"
                            >
                                Post Job
                            </button>
                        </div>
                    </form>



                </div>
            </div>
        </>
    )
}

export default AdminPostJobs

