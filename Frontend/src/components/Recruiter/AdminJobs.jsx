import React, { useEffect, useState } from 'react'
import NavBar from '../shared/NavBar'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import AdminsJobTable from './AdminsJobTable';
import useGetAllAdminJobs from '../Hooks/useGetAllAdminJobs';
import { setSearchJobsByText } from '../Redux/jobSlice';

const AdminJobs = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let [input , setInput] = useState("");

    useGetAllAdminJobs();

    useEffect(() => {
      dispatch(setSearchJobsByText(input));
    },[input])

  return (
    <>
      <NavBar />

      <div className="flex mt-9 lg:mx-25 justify-between">
        <input onChange={(e)=> setInput(e.target.value)} type="text" className='w-fit border border-gray-300 rounded-md px-4 py-1' placeholder='Filter By Name ' />
        <Button className="cursor-pointer" onClick={() => navigate('/admin/postNewjob')}> Post new job </Button>
      </div>

      <AdminsJobTable />
    </>
  )
}

export default AdminJobs
