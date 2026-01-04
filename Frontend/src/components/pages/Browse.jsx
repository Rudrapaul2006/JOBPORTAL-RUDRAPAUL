import React, { useEffect } from 'react'
import NavBar from '../shared/NavBar'
import Job from '../Job';
import { useDispatch, useSelector } from 'react-redux';
// import GetAllJobs from '../Hooks/GetAllJobs';
import { setSearchQuery } from '../Redux/jobSlice';
import useGetAllAdminJobs from '../Hooks/useGetAllAdminJobs';

// let randomJob = [1, 2, 3, 4];

// Browse Page :
const Browse = () => {
  // GetAllJobs();
  useGetAllAdminJobs();
  let { alljobs } = useSelector((state) => state.job);
  let dispatch = useDispatch();

  useEffect(() => {
  return () => {
    dispatch(setSearchQuery(""));
  };
}, []);


  return (
    <>
      <NavBar />
      <div className='mx-25 mt-7'>
        <h1 className='font-bold text-xl my-10'>
          Search Result ({alljobs.length})
        </h1>

        <div className='grid grid-cols-3 gap-4'>
          {
            alljobs.map((job) => (
              <div className='mt-2' key={job._id} >
                <Job job={job} />
              </div>
            ))
          }
        </div>
      </div>

    </>
  )
}

export default Browse
