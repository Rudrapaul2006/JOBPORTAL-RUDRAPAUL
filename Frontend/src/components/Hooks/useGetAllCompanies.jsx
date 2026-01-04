import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { companies_end_point } from '../utils/Constant';
import { setCompanies } from '../Redux/companySlice';
import { useParams } from 'react-router-dom';

const useGetAllCompanies = () => {
    let dispatch = useDispatch();
    useEffect(() => {
        let fetchCompanies = async () => {
            let res = await axios.get(`${companies_end_point}/get` , {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            
            if(res.data.success){
                dispatch(setCompanies(res.data.company));     
            }   

            // console.log(res.data.company);
            
        };


        fetchCompanies();
    } , [dispatch]);
}

export default useGetAllCompanies
