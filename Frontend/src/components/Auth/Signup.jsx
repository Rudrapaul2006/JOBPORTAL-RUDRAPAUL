import React, { useState } from 'react'
import NavBar from '../shared/NavBar'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { api_end_point } from '@/components/utils/Constant.js'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../Redux/authSlice'
import { Loader2 } from 'lucide-react'
// import store from '../Redux/store'


const Signup = () => {
  let [input, setInput] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    file: ""
  })

  let navigate = useNavigate();
  let {loading} = useSelector(store => store.auth)
  let dispatch = useDispatch();

  let onchangeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  let fileEventHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  // Form submit
  let submithandler = async (e) => {
    e.preventDefault();

    // Validation: check required fields
    if (!input.fullname || !input.email || !input.password || !input.role) {
      toast.error("Please fill all required fields ..");
      return;
    }

    let formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phone", input.phone);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${api_end_point}/user/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      // console.log(error);
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };



  return (
    <>
      <NavBar />

      <div className="mx-auto mt-5 max-w-xl ">

        <form onSubmit={submithandler} className="w-full flex flex-col border border-gray-300 rounded-xl p-6 shadow-sm bg-white">

          <div className='mb-3 font-bold text-2xl'><h1>Sign Up</h1></div>

            <label className="text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              value={input.fullname}
              name='fullname'
              onChange={onchangeEventHandler}
              placeholder="Enter your name"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            />

          <label className="mt-1 text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            value={input.email}
            name='email'
            onChange={onchangeEventHandler}
            placeholder="Enter your email"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
          />

          <label className="mt-1 text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            value={input.password}
            name='password'
            onChange={onchangeEventHandler}
            placeholder="Enter your password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
          />

          <label className="mt-1 text-gray-700 font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            value={input.phone}
            name='phone'
            onChange={onchangeEventHandler}
            placeholder="Enter your phone no"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
          />

          <div className="flex items-center gap-6 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="student"
                onChange={onchangeEventHandler}
                checked={input.role === "student"}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
              <span className="text-gray-700 font-medium">Student</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="recruiter"
                onChange={onchangeEventHandler}
                checked={input.role === "recruiter"}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
              <span className="text-gray-700 font-medium">Recruiter</span>
            </label>

            <div className="flex flex-col gap-2 mt-4 ml-8">
              <label className="text-gray-700 font-medium">Profile</label>
              <input
                type="file"
                accept="image/*"
                onChange={fileEventHandler}
                className="w-[100%] border rounded-md py-2 text-sm 
             file:mr-3 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-slate-700  transition-colors 
             duration-300 cursor-pointer" />
            </div>
          </div>

          {
            loading ? <Button className='w-full'> <Loader2 className='mr-2 mt-2 animate-spin' /> Please wait </Button> :
            
              <Button
                type='submit'
                className="w-full mt-8 bg-blue-600 text-white font-bold  rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                Sign Up
              </Button> 

          }

          <div className='flex gap-1 mt-3'>
            <h1 className='text-slate-600'>Already have an account ?</h1>
            <Link to="/login"><span className='text-blue-700'>Login</span></Link>
          </div>
        </form>

      </div>
    </>
  )
}

export default Signup

