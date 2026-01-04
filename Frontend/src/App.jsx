import {Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './components/Home';
import Jobs from './components/pages/Jobs';
// import Browse from './components/pages/Browse';
import Profile from './components/Profile';
import JobDetails from './components/JobDetails';
import Companies from './components/Recruiter/Companies';
import CompaniesCreate from './components/Recruiter/CompaniesCreate';
import CompanySetup from './components/Recruiter/CompanySetup';
import AdminJobs from './components/Recruiter/AdminJobs';
import AdminPostJobs from './components/Recruiter/AdminPostJobs';
import UpdateAdminsJob from './components/Recruiter/UpdateAdminsJob';
import ApplicantForJobs from './components/Recruiter/ApplicantForJobs';
import UpdateProfile from './components/UpdateProfile';
import AdminJobDetails from './components/Recruiter/AdminJobDetails';
import CompaniesDetails from './components/Recruiter/CompaniesDetails';


function App() {
  return (
    <>
      <Routes>

        {/* // Public and student Routes : */}
        <Route path='/' element={<Home />} > 

        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/Jobs' element={<Jobs />} />
        <Route path='/details/:id' element={<JobDetails/>} />
        {/* <Route path='/browse' element={<Browse />} /> */}
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/update' element={<UpdateProfile />} />
      
      {/* // Recruiter Routes : */}
        <Route path='/admin/companies' element={<Companies />} />   
        <Route path='/admin/companies/details/:id' element={<CompaniesDetails/>} />   
        <Route path='/admin/companies/:id' element={<CompanySetup />} /> 
        <Route path='/admin/create/company' element={<CompaniesCreate />} />
        <Route path='/admin/jobs' element={<AdminJobs />} />
        <Route path='/admin/postNewjob' element={<AdminPostJobs />} />
        <Route path='/admin/job/details/:id' element={<AdminJobDetails />} />
        <Route path='/admin/updateJob/:id' element={<UpdateAdminsJob />} />
        <Route path='/admin/jobApplicant/:id' element={<ApplicantForJobs />} />
      </Routes>
    </>
  );
}

export default App;
