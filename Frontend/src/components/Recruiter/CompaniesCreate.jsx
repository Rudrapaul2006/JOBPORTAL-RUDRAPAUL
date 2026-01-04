import React, { useState } from 'react'
import NavBar from '../shared/NavBar'
import { Button } from '../ui/button'
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { companies_end_point } from '../utils/Constant';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../Redux/companySlice';

const CompaniesCreate = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let [companyName, setCompanyName] = useState();

    let newRegisterCompanies = async () => {
       
        try {
            let res = await axios.post(
                `${companies_end_point}/register`,
                { companyName }, 
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true, // ✅ send cookies
                }
            );

            if (res.data.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message || "Company registered successfully");

                const companyId = res.data.company._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            // console.log(error);
            toast.error(error.response?.data?.message || "Company registration failed");
        }
    }

    return (
        <>
            <NavBar />

            <div>
                <div className='mx-25 mt-10'>
                    <FaArrowLeft onClick={() => navigate("/admin/companies")} size={37} className='border border-gray-300 p-2 shadow-md rounded-2xl cursor-pointer hover:text-[red]/80 duration-300 hover:shadow-[red]/30' />
                </div>

                <div className="mx-35 mt-12 flex flex-col">
                    <div className='text-[25px] mx-25 font-semibold'><div className='flex flex-col'><h2>New Companies Name </h2> <div className='text-[black]/40 text-[15px]'>What
                        would you like to give your company name ? you can change this latter .</div></div></div>

                    <div className='mt-7 mx-25 font-medium flex flex-col'> Company name -
                        <div className='mt-3'><input onChange={(e) => setCompanyName(e.target.value)} type="text" placeholder="Enter company name .." className="border border-gray-300 rounded px-4 py-2 w-full" /></div>
                        <div className='mt-5 flex gap-5'>
                            <Button className="cursor-pointer" onClick={() => navigate("/admin/companies")} >Cancle</Button>
                            <Button onClick={newRegisterCompanies} className="cursor-pointer">Continue</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompaniesCreate
