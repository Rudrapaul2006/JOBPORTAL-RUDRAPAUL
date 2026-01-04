import React, { useState } from 'react'
import NavBar from '../shared/NavBar'
import axios from 'axios';
import { job_end_point } from '../utils/Constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { FaArrowLeft } from 'react-icons/fa';
import { IoChevronBackOutline } from 'react-icons/io5';

const UpdateAdminsJob = () => {
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

    let params = useParams();
    let navigate = useNavigate();

    let [loading, setLoading] = useState("");

    let handleForm = async (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    let fileHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (
            !input.role &&
            !input.description &&
            !input.requirements
        ) {
            toast.error("Fill atleast one ..");
            return;
        }

        try {
            let res = await axios.put(`${job_end_point}/update/${params.id}`, input, {
                withCredentials: true
            })

            if (res.data.success) {
                toast.success(res.data.meassage || "Job update successful ..");
                navigate(-1);
            }
        } catch (error) {
            console.log("something error ..", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <NavBar />
            <div className='lg:mx-25 mt-7'>
                {/* <FaArrowLeft onClick={() => navigate(-1)} size={37} className='border border-gray-300 p-2 shadow-md rounded-2xl cursor-pointer hover:text-[red]/80 duration-300 hover:shadow-[red]/30' /> */}
                <div className='mx-auto w-95 lg:w-180  rounded-md shadow-md border'>

                    <div className='flex flex-col'>
                        <button
                            onClick={() => navigate(-1)}
                            className="ml-5 mt-4 h-fit w-fit p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                        >
                            <IoChevronBackOutline size={22} className="text-gray-600" />
                        </button>
                        <div className='text-2xl font-bold mb-5 ml-5 mt-3'>Update Details </div>
                    </div>

                    <form onSubmit={fileHandler} className="max-w-4xl mx-auto bg-white p-5 rounded-md shadow-lg">
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


                        <div className="mt-8 text-center">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-blue-600 text-white font-semibold
                 rounded-lg shadow-md hover:bg-blue-700
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 transition cursor-pointer"
                            >
                                Update
                            </button>
                        </div>


                    </form>

                </div>
            </div>
        </>
    )
}

export default UpdateAdminsJob
