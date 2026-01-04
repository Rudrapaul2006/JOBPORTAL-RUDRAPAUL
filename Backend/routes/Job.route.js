import express from 'express';
import { getAllJobs , getJobById , getJobByAdmin, registerJob, updateJob, deleteJob } from '../controllers/job.controller.js';
import isAuthentication from '../Middlewere/isAuth.js';

let jobRoute = express.Router();

jobRoute.post('/register' ,isAuthentication, registerJob);
jobRoute.get('/get' , isAuthentication , getAllJobs);
jobRoute.get('/get/:id' , isAuthentication , getJobById);
jobRoute.put('/update/:id' , isAuthentication , updateJob);
jobRoute.delete('/delete/:id' , isAuthentication , deleteJob);
jobRoute.get('/getadminsjob' , isAuthentication , getJobByAdmin);


export default jobRoute; 