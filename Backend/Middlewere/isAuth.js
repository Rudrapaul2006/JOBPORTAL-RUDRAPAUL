import jwt from 'jsonwebtoken';
import { User } from '../models/User.model.js';

let isAuthentication = async (req , res , next) => {
    try {
        let token = req.cookies.token;
        if(!token){
            return res.status(400).json({
                massage : "Token got expired pls log in ..",
                success : false
            })

        }

        let decoded = await jwt.verify(token , process.env.JWT_secret);
        let user = await User.findById(decoded.userId);
        if(!user){
            return res.status(400).json({
                massage : "User Not Exist, pls log in ..",
                success : false
            })
        }

        // req.user = user;
        req.id = user.id;
        // req.id = userId
        next();

    } catch (error) {
        console.log(error); 
    }
}
  
export default isAuthentication;