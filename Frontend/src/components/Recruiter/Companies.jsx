import React, { use, useEffect, useState } from 'react'
import NavBar from '../shared/NavBar'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../Hooks/useGetAllCompanies'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchCompanyByText } from '../Redux/companySlice'

const Companies = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let [input , setInput] = useState("");
    useGetAllCompanies();
    
    useEffect(() => {
      dispatch(setSearchCompanyByText(input));
    },[input])

  return (
    <>
      <NavBar />

      <div className="flex mt-9 lg:mx-25 justify-between">
        <input onChange={(e)=> setInput(e.target.value)} type="text" className='w-fit border border-gray-300 rounded-md px-4 py-1' placeholder='Filter By Name ' />
        <Button className="cursor-pointer" onClick={() => navigate('/admin/create/company')}>New Companies</Button>
      </div>

      <CompaniesTable />
    </>
  )
}

export default Companies
