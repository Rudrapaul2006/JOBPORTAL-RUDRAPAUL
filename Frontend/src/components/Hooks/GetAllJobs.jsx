import axios from 'axios'
import React, { useEffect } from 'react'
import { api_end_point, job_end_point } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { setalljobs } from '../Redux/jobSlice'

const GetAllJobs = () => {
    let dispatch = useDispatch();
    useEffect(() => {
        let getAllJobs = async () => {
            try {
                let res = await axios.get(`${job_end_point}/get`, {
                    withCredentials: true,
                })

                if (res.data.success) {
                    dispatch(setalljobs(res.data.jobs))
                }
            } catch (error) {
                console.log("Error while fetching all jobs:", error);
            }
        }
        getAllJobs()
    }, [])
    
}

export default GetAllJobs
