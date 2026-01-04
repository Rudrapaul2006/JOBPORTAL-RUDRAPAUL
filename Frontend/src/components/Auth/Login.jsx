import React, { useState } from 'react'
import NavBar from '../shared/NavBar'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { api_end_point } from '@/components/utils/Constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../Redux/authSlice'
import { Loader2 } from 'lucide-react'


const Login = () => {
  let [input, setInput] = useState({
    email: "",
    password: ""
  })

  let {loading} = useSelector(store => store.auth)
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let changeEventhandler = (e) => {
    setInput({ ...input, [e.target.name] : e.target.value })
  }

  let submithandler = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password) {
      toast.error("Please enter email and password ..");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${api_end_point}/user/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login Failed");
    } finally {
      dispatch(setLoading(false))
    }
  };


  return (
    <>
      <NavBar />


      <div className="mx-auto mt-27 max-w-xl ">

        <form onSubmit={submithandler} className="w-full flex flex-col border border-gray-300 rounded-xl p-6 shadow-sm bg-white">

          <div className='mb-5 font-bold text-2xl'><h1>Login</h1></div>

          <label className="mt-3 text-gray-700 font-medium mb-2">Email</label>
          <input
            type="text"
            value={input.email}
            name='email'
            onChange={changeEventhandler}
            placeholder="Enter your email"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
          />

          <label className="mt-3 text-gray-700 font-medium mb-2">Password</label>
          <input
            type="text"
            value={input.password}
            name='password'
            onChange={changeEventhandler}
            placeholder="Enter your password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
          />

          <div className="flex items-center gap-6 mt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role" 
                value="student"
                onChange={changeEventhandler}
                checked={input.role === "student"}
                className="w-4 h-4 accent-blue-600 cursor-pointer" />
              <span className="text-gray-700 font-medium">Student</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="recruiter"
                onChange={changeEventhandler}
                checked={input.role === "recruiter"}
                className="w-4 h-4 accent-blue-600 cursor-pointer" />
              <span className="text-gray-700 font-medium">Recruiter</span>
            </label>
          </div>

          {loading ? <Button className='w-full'> <Loader2 className='mr-2 h-4 animate-spin'/> Please Wait </Button> : <Button type='submit' className="w-full mt-7 bg-blue-600 text-white font-bold  rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 cursor-pointer"> Login </Button> }
          

          <div className='flex gap-1 mt-3'>
            <h1 className='text-slate-600'>Don't have an account ?</h1> <Link to="/signup"><span className='text-blue-700'>SignUp</span></Link>
          </div>

        </form>

      </div>
    </>
  )
}

export default Login
