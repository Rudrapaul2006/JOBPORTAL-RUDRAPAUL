import express from 'express';
import { applyJob ,DeleteApplication,getApplicants , getAppliedJobs, updateApplicant } from '../controllers/application.controller.js';
import isAuthentication from '../Middlewere/isAuth.js';

let applicationRoute = express.Router();

applicationRoute.post('/apply/:id', isAuthentication , applyJob); //apply for jobs -
applicationRoute.get('/get', isAuthentication , getAppliedJobs);
applicationRoute.get('/applicants/:id', isAuthentication , getApplicants);
applicationRoute.put('/status/update/:id' , isAuthentication , updateApplicant);



//(risky)
applicationRoute.delete('/delete/:id' , isAuthentication , DeleteApplication);


 
export default applicationRoute;    