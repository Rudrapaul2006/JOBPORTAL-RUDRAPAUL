import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import NavBar from '../shared/NavBar';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { companies_end_point } from '../utils/Constant';
import { FaArrowLeft } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import useGetAllCompanies from '../Hooks/useGetAllCompanies';

let AdminsJobSetup = () => {
  let [input, setInput] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",
    logo: ""
  });

  let params = useParams();
  useGetAllCompanies(params.id);

  
  let [loading, setLoading] = useState(false);
  

  let navigate = useNavigate();
  

  // Text input handler
  let formSubmitHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // File input handler
  let fileHandler = (e) => {
    setInput({ ...input, logo: e.target.files?.[0] });
  };

  // Submit handler
  let submithandler = async (e) => {
    e.preventDefault();

    // Validation
    // if (
    //   !input.description &&
    //   !input.website &&
    //   !input.location
    // ) {
    //   toast.error("Please fill all required fields ..");
    //   return;
    // }

    let formdata = new FormData();
    formdata.append("companyName", input.companyName);
    formdata.append("description", input.description);
    formdata.append("website", input.website);
    formdata.append("location", input.location);
    formdata.append("file", input.logo);

    try {
      setLoading(true);

      let res = await axios.put(
        `${companies_end_point}/update/${params.id}`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Company update failed ..");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />

      <div className='lg:mx-25 mt-10'>
        <FaArrowLeft onClick={() => navigate("/admin/companies")} size={37} className='border border-gray-300 p-2 shadow-md rounded-2xl cursor-pointer hover:text-[red]/80 duration-300 hover:shadow-[red]/30' />
      </div>

      {/* <Button>Back</Button> */}

      <div className="mx-auto w-180 mt-10">
        <form onSubmit={submithandler}>
          <div className="grid grid-cols-2 gap-8">

            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={input.companyName}
                onChange={formSubmitHandler}
                placeholder="Enter company name"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium">Description</label>
              <input
                type="text"
                name="description"
                value={input.description}
                onChange={formSubmitHandler}
                placeholder="Enter company description"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium">Website</label>
              <input
                type="text"
                name="website"
                value={input.website}
                onChange={formSubmitHandler}
                placeholder="Enter company website"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={input.location}
                onChange={formSubmitHandler}
                placeholder="Enter company location"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium">Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={fileHandler}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

          </div>

          {loading ? (
            <Button className="w-180 mt-8">
              <Loader2 className="mr-2 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-180 mt-8 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </>
  );
};

export default AdminsJobSetup;
