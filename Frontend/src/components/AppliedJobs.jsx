import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell
} from './ui/table';
import axios from 'axios';
import { applicant_end_point } from './utils/Constant';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { GrHide } from "react-icons/gr";
import { LuScanEye } from 'react-icons/lu';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

let AppliedJobs = () => {

    let [applicant, setApplicant] = useState([]);

    let [hide, setHide] = useState(() => {
        let stored = localStorage.getItem('hiddenJobs');
        return stored ? JSON.parse(stored) : [];
    });
    let [show, setShow] = useState(false);

    useEffect(() => {
        localStorage.setItem('hiddenJobs', JSON.stringify(hide));
    }, [hide]);

    // Hide job
    let hideJob = (id) => {
        setHide((prev) => [...new Set([...prev, id])]);
    };

    // Unhide job
    let unHideJob = (id) => {
        setHide((prev) => prev.filter((jobId) => jobId !== id));
    };

    // Filters
    let visibleApplicants = applicant.filter(
        (appli) => !hide.includes(appli._id)
    );

    let hiddenApplicants = applicant.filter(
        (appli) => hide.includes(appli._id)
    );

    // Fetch applications
    useEffect(() => {
        let fetchJob = async () => {
            try {
                let res = await axios.get(
                    `${applicant_end_point}/get`,
                    { withCredentials: true }
                );
                if (res.data.success) {
                    setApplicant(res.data.applications);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchJob();
    }, []);

    let JobDetails = ({ appli }) => (
        <Popover>
            <PopoverTrigger className="cursor-pointer hover:text-red-500 hover:underline">
                View Job Details
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
                <div className="space-y-3">
                    <h1 className="text-lg font-semibold">
                        {appli?.job?.company?.companyName}
                    </h1>

                    <p><b>Role:</b> {appli?.job?.role}</p>
                    <p><b>Location:</b> {appli?.job?.location}</p>
                    <p><b>Job Type:</b> {appli?.job?.jobType}</p>
                    <p><b>Experience:</b> {appli?.job?.experience} years</p>
                    <p><b>Open Positions:</b> {appli?.job?.position}</p>
                    <p><b>Salary:</b> ₹{appli?.job?.salary}</p>

                    <div>
                        <p className="font-medium">Requirements:</p>
                        <ul className="list-disc list-inside text-sm">
                            {appli?.job?.requirements?.map((req, i) => (
                                <li key={i}>{req}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );

    let StatusBadge = ({ status }) => (
        <span className={`px-2 py-1 rounded-full text-sm font-medium
            ${status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
              status === 'Rejected' ? 'bg-red-100 text-red-800' :
              'bg-green-100 text-green-800'}`}>
            {status}
        </span>
    );

    return (
        <>
            <div className="overflow-x-auto mt-5 mx-5">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead className="border px-8">Date</TableHead>
                            <TableHead className="border px-9">Company</TableHead>
                            <TableHead className="border px-10">Role</TableHead>
                            <TableHead className="border px-13">Location</TableHead>
                            <TableHead className="border px-8">Status</TableHead>
                            <TableHead className="border px-8">Details</TableHead>
                            <TableHead className="border px-8">Hide</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {visibleApplicants.map((appli) => (
                            <TableRow key={appli._id}>
                                <TableCell className="border px-8">{new Date(appli.createdAt).toLocaleString()}</TableCell>
                                <TableCell className="border px-9">{appli?.job?.company?.companyName}</TableCell>
                                <TableCell className="border px-10">{appli?.job?.role}</TableCell>
                                <TableCell className="border px-13">{appli?.job?.location}</TableCell>
                                <TableCell className="border px-8"><StatusBadge status={appli.status} /></TableCell>
                                <TableCell className="border px-10"><JobDetails appli={appli} /> </TableCell>
                                <TableCell className="border px-8">
                                    <GrHide
                                        size={22}
                                        className="cursor-pointer hover:text-red-500"
                                        onClick={() => hideJob(appli._id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="mx-5 mt-6 mb-10">
                <button
                    onClick={() => setShow(!show)}
                    className="flex items-center gap-2 px-3 py-1 rounded-md font-semibold
                        bg-gray-200 hover:bg-gray-300 cursor-pointer"
                >
                    {show ? 'Hide Hidden Jobs' : 'Show Hidden Jobs'}
                    {show ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>

                {show && (
                    <Table className="mt-4">
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead className="border">Date</TableHead>
                                <TableHead className="border">Company</TableHead>
                                <TableHead className="border">Role</TableHead>
                                <TableHead className="border">Location</TableHead>
                                <TableHead className="border">Status</TableHead>
                                <TableHead className="border">Details</TableHead>
                                <TableHead className="border">Unhide</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {hiddenApplicants.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-4">
                                        No hidden jobs
                                    </TableCell>
                                </TableRow>
                            )}

                            {hiddenApplicants.map((appli) => (
                                <TableRow key={appli._id}>
                                    <TableCell className="border">{new Date(appli.createdAt).toLocaleString()}</TableCell>
                                    <TableCell className="border">{appli?.job?.company?.companyName}</TableCell>
                                    <TableCell className="border">{appli?.job?.role}</TableCell>
                                    <TableCell className="border">{appli?.job?.location}</TableCell>
                                    <TableCell className="border"><StatusBadge status={appli.status} /></TableCell>
                                    <TableCell className="border"><JobDetails appli={appli} /></TableCell>
                                    <TableCell className="border">
                                        <LuScanEye
                                            size={22}
                                            className="cursor-pointer text-green-600"
                                            onClick={() => unHideJob(appli._id)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </>
    );
};

export default AppliedJobs;
