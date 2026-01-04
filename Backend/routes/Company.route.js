import express from 'express';
import { companyRegister , getCompany , getCompanyById , companyUpdate, companyDelete } from '../controllers/company.controller.js';
import isAuthentication from '../Middlewere/isAuth.js';
import { singleUpload } from '../Middlewere/multer.js';

let companyRoute = express.Router();

//User Routes :
companyRoute.post("/register" , isAuthentication, companyRegister);
companyRoute.get("/get" , isAuthentication , getCompany);

//Curd operation : 
companyRoute.get("/get/:id" , isAuthentication , getCompanyById);
companyRoute.put("/update/:id" , isAuthentication , singleUpload , companyUpdate);
companyRoute.delete("/delete/:id" , isAuthentication , companyDelete);

export default companyRoute;
 