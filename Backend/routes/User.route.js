import express from 'express';
import { register , login , logout , userUpdate, userProfile } from '../controllers/user.controller.js';
import isAuthentication from '../Middlewere/isAuth.js';
import { singleUpload } from '../Middlewere/multer.js';

let userRoute = express.Router();

//User Routes :
userRoute.post("/register" , singleUpload , register);
userRoute.post("/login" , login);

//Curd operation : 
userRoute.get("/logout" , logout);
userRoute.get("/profile",isAuthentication,singleUpload, userProfile)
userRoute.put("/update" , isAuthentication , singleUpload , userUpdate); 

export default userRoute;
 