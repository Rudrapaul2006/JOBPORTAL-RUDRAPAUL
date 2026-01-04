import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import JobDetails from './JobDetails'
import { useSelector } from 'react-redux'

// Job card for jobs page - [link with jobs]
const Job = ({ job }) => {
    let naviget = useNavigate();

    return (
        <>
            <div className='flex flex-col relative w-[92%] mb-3 ml-3 sm:ml-3 border border-gray-100 rounded-md shadow-lg px-4 py-1  cursor-pointer hover:shadow-xl hover:scale-102 duration-400  hover:text-[black]/80 hover:border-gray-200'>

                <div>
                    <div className="flex lg:flex-row">
                        <div className="text-gray-600 text-sm mt-2.5 lg:mt-2">
                            Posted - {job.createdAt.split("T")[0]}
                        </div>

                    </div>

                </div>

                <div className="border absolute right-4 top-2 border-gray-100 rounded-full bg-gray-200 p-1 sm:h-fit  hover:bg-gray-300 transition">
                    <Bookmark size={22} className="cursor-pointer rounded-full text-black/80" />
                </div>


                <div className='flex items-center gap-6 mt-5'>
                    <div className='flex items-center'>
                        <img src={job?.company?.logo} alt="" className=" w-16 h-16 object-contain
                                                                        rounded-xl bg-white border shadow-sm p-2
                                                                        duration-300"/>
                    </div>
                    <div>
                        <span className='text-lg font-semibold'>{job?.companyName}</span> <br />
                        <span className='text-[16px] text-[black]/70'>{job.location}</span>
                    </div>
                </div>

                <div className='flex flex-col mt-2 mb-3'>
                    <div><h1 className='font-bold text-lg'>{job.title}</h1></div>
                    <div className='text-gray-700 text-sm'>
                    </div>
                </div>

                <div className="flex flex-col gap-1 md:gap-2 lg:flex-row lg:gap-5 w-fit">
                    <div className="border border-gray-200 bg-gray-100 px-2 py-1 rounded-md text-slate-600">
                        <p className="text-[10px] md:text-[12px] font-bold">
                            {job.role}
                        </p>
                    </div>
                    <div className="border border-gray-200 bg-gray-100 px-2 py-1 rounded-md text-slate-600">
                        <p className="text-[10px] md:text-[12px] font-bold">
                            {job.jobType}
                        </p>
                    </div>
                    <div className="border border-gray-200 bg-gray-100 px-2 py-1 rounded-md text-slate-600">
                        <p className="text-[10px] md:text-[12px] font-bold">
                            {job.salary}_rupees
                        </p>
                    </div>
                </div>


                <div className='flex flex-col  mt-6 gap-2 mb-3 lg:flex-row lg:gap-5'>
                    <div>
                        <Button onClick={() => naviget(`/details/${job._id}`)} variant="outline" className="border border-blue-300 hover:scale-96 cursor-pointer duration-400 font-bold ">Details</Button>
                    </div>

                    <div>
                        <Button className="border border-purple-300 bg-purple-600 hover:bg-purple-700 hover:scale-96 cursor-pointer duration-400 font-bold " >Save for later</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Job
