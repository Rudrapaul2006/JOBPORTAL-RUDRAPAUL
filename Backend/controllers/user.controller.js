import bcrypt from 'bcrypt';
import { User } from '../models/User.model.js';
import jwt from 'jsonwebtoken';
import datauri from '../utils/dataUri.js';
import cloudinary from '../utils/Cloudinary.js';
import { profile } from 'console';

//User Register : 
export const register = async (req, res) => {
    try {
        let { fullname, email, password, phone, role, skills, bio } = req.body;

        if (!fullname || !email || !password || !phone || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists ",
                success: false,
            });
        }

        // Handle profile image upload (optional)
        let profilePic = "";
        if (req.file) {
            const fileUri = datauri(req.file);
            const cloud = await cloudinary.uploader.upload(fileUri.content);
            profilePic = cloud.secure_url;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            phone,
            role,
            profile: {
                bio: bio || "",
                skills: Array.isArray(skills) ? skills : [],
                profilePic: profilePic,
            },
        });

        // Remove password before sending response
        // const { password: userPassword, ...safeUser } = newUser._doc;

        return res.status(201).json({
            message: "User registered successfully",
            user,
            success: true,
        });

    } catch (error) {
        console.error("Register Error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

// User Login :
export let login = async (req, res) => {
    try {
        let { email, password, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email or Password must be provided .. ",
                success: false
            })
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User Not Found",
                success: false
            })
        }

        let isMatchPass = await bcrypt.compare(password, user.password);
        if (!isMatchPass) {
            return res.status(400).json({
                message: "Invalid Password",
                success: false
            })
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: `Your current role is invalid ..`,
                success: false
            })
        }

        let tokenData = {
            userId: user._id,
        }

        // let token = await jwt.sign({ id: user._id }, process.env.JWT_secret, {expiresIn : "7d"});
        let token = await jwt.sign(tokenData, process.env.JWT_secret, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        return res.status(200).json({
            message: `Welcome Back ${user.fullname} , You logged in sucessfully ..`,
            // token : token,
            user: {
                id: user._id,
                name: user.fullname,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

// User Logout :
export let logout = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({
                message: "Token not found or token got expired .. Please log in again ..",
                success: false
            });
        }

        let decoded = await jwt.verify(token, process.env.JWT_secret);
        let user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(400).json({
                massage: "User Not Found ..",
                success: false
            })
        }

        res.clearCookie("token");

        return res.status(200).json({
            message: `${user.fullname} logged out successfully`,
            // email : `${user.email}`,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

//User Update :
export let userUpdate = async (req, res) => {
    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_secret);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const { fullname, email, phone, bio, skills, resume, instagram } = req.body;

        if (!user.profile) user.profile = {};

        // ✅ IMAGE UPLOAD (SAME AS REGISTER)
        if (req.file) {
            const fileUri = datauri(req.file);
            const cloud = await cloudinary.uploader.upload(fileUri.content, {
                folder: "profilePic",
            });
            user.profile.profilePic = cloud.secure_url;
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (bio) user.profile.bio = bio;
        if (resume) user.profile.resume = resume;
        if (instagram) user.profile.instagram = instagram;
        if (skills) user.profile.skills = skills.split(",").map(s => s.trim());

        await user.save();

        res.json({
            success: true,
            message: "User updated successfully",
            user,
        });
    } catch (err) {
        res.status(500).json({ success: false });
    }
};


// User Profile :
export let userProfile = async (req, res) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(200).json({
                message: "Token expired or not provided",
                success: false
            });
        }

        let decoded = await jwt.verify(token, process.env.JWT_secret);
        let user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(200).json({
                message: "User not found",
                success: false
            });
        }

        return res.json({
            success: true,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phone: user.phone,
                bio: user.profile.bio,
                role: user.role,
                resume: user.profile.resume,
                profilePic: user?.profile?.profilePic,
                instagram: user?.profile?.instagram,
                skills: user.profile.skills,
            },
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
