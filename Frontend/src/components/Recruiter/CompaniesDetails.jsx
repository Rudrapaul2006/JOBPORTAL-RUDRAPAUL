import React, { useEffect, useState } from 'react'
import NavBar from '../shared/NavBar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { Edit2 } from 'lucide-react';
import { IoChevronBackOutline } from 'react-icons/io5';
import { companies_end_point } from '../utils/Constant';

const CompaniesDetails = () => {
  let navigate = useNavigate();
  let params = useParams();
  let companyId = params.id;

  let [compDetails, setCompDetails] = useState([]);

  useEffect(() => {
    let fetchCompany = async () => {
      try {
        let res = await axios.get(`${companies_end_point}/get/${companyId}`, { withCredentials: true });
        if (res.data.success) {
          console.log(res.data.company);
          setCompDetails(res.data.company);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchCompany();
  }, [companyId])

  return (
    <>
      <NavBar />
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-md border border-gray-200">
        <div className="flex flex-col gap-3 px-4 pt-5 ">

          <div className='flex justify-between mb-3'>
            <button
              onClick={() => navigate("/admin/companies")}
              className="p-2 w-fit rounded-full bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
            >
              <IoChevronBackOutline size={22} className="text-gray-600" />
            </button>

            <div onClick={() =>
              navigate(`/admin/companies/${companyId}`)
            } className="flex px-4 items-center gap-4 rounded-md cursor-pointer border bg-gray-200 hover:bg-gray-300 duration-300 transition">
              <Edit2 size={16} className="mt-1" />
              <div className="font-semibold">Update Details</div>
            </div>
          </div>

          <h2 className="text-2xl ml-2 font-bold text-gray-800">
            {compDetails.companyName}
          </h2>
        </div>

        <div className="px-6 pb-6 mt-2">
          <p className="text-gray-500 text-lg mb-8">
            {compDetails.location}
          </p>

          <div className="mt-8">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Job Description
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {compDetails.description}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Website (Just Imaginary)
            </h3>
            <p className="text-gray-700 leading-relaxed">
              <span className='text-green-600 font-semibold '>{compDetails.website}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CompaniesDetails
