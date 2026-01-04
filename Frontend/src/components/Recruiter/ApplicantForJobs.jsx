import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { applicant_end_point } from "../utils/Constant";
import NavBar from "../shared/NavBar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { FaArrowLeft } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";

let ApplicantForJobs = () => {
    let navigate = useNavigate();
    let params = useParams();
    let jobId = params.id;
    let [applicants, setApplicants] = useState([]);

    useEffect(() => {
        let fetchApplicants = async () => {
            try {
                let res = await axios.get(
                    `${applicant_end_point}/applicants/${jobId}`,
                    { withCredentials: true }
                );

                if (res.data.success) {
                    setApplicants(res.data.applicants);
                    // console.log(res.data);

                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchApplicants();
    }, [jobId]);


    let updateHandler = async (applicationId, status) => {
        // if (!applicationId || !status) return;
        try {
            let res = await axios.put(`${applicant_end_point}/status/update/${applicationId}`,
                { status },
                { withCredentials: true }
            )
            // console.log(res.data)

            setApplicants((prev) =>
                prev.map((app) =>
                    app._id === applicationId
                        ? { ...app, status }
                        : app
                )
            )

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <NavBar />

            <div className="lg:mx-25 mt-9">
                {/* <FaArrowLeft onClick={() => navigate("/admin/jobs")} size={37} className='border border-gray-300 p-2 shadow-md rounded-2xl cursor-pointer hover:text-[red]/80 duration-300 hover:shadow-[red]/30' /> */}
                <button
                    onClick={() => navigate(-1)}
                    className="p-2  w-fit rounded-full bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                >
                    <IoChevronBackOutline size={22} className="text-gray-600" />
                </button>
                <Table className="mt-7">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Applicant Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Resume</TableHead>
                            <TableHead>Current status</TableHead>
                            <TableHead>Status</TableHead>

                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {applicants.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    No applicants found yet
                                </TableCell>
                            </TableRow>
                        ) : (
                            applicants.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.applicant.fullname}</TableCell>

                                    <TableCell>
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </TableCell>

                                    <TableCell>{user.applicant.email}</TableCell>

                                    <TableCell>{user.applicant.phone}</TableCell>

                                    <TableCell>
                                        {user.applicant.resume ? (
                                            <a
                                                href={user.applicant.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline"
                                            >
                                                View Resume
                                            </a>
                                        ) : (
                                            "N/A"
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {user.status}
                                    </TableCell>

                                    <TableCell>
                                        <Select onValueChange={(value) => {
                                            const ok = window.confirm(`Are you sure you want to change status to "${value}"?`);
                                            if (ok) {
                                                updateHandler(user._id, value);
                                            }
                                        }}>

                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                                <SelectItem value="Accepted">Accepted</SelectItem>
                                                <SelectItem value="Rejected">Rejected</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>

                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default ApplicantForJobs;
