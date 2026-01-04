import React, { use, useEffect } from 'react'
import NavBar from './shared/NavBar'
import HeroSection from './HeroSection'
import CategoryCarousal from './CategoryCarousal'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import GetAllJobs from './Hooks/GetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const Home = () => {
  GetAllJobs();
  let {user} = useSelector((store) => store.auth);
  let navigate = useNavigate();
  useEffect(() => {
    if(user && user.role === "recruiter"){
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
        <NavBar/>
        <HeroSection />
        <CategoryCarousal />
        <LatestJobs/>
        <Footer/>
    </div>
  )
}

export default Home
