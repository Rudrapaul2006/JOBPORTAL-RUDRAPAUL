import React, { useState } from 'react'
import NavBar from './shared/NavBar'
import axios from 'axios'
import { api_end_point } from './utils/Constant'
import { useDispatch } from 'react-redux'
import { setUser } from './Redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { FaArrowLeft } from 'react-icons/fa'
import { IoChevronBackOutline } from 'react-icons/io5'

const UpdateProfile = () => {
    // fullname, email, phone, bio, skills, resume, instagram
    let [input, setInput] = useState({
        fullname: "",
        email: "",
        phone: "",
        bio: "",
        skills: "",
        resume: "",
        instagram: "",
        profilePic: ""
    })

    let [loading, setLoading] = useState("")

    let dispatch = useDispatch();
    let navigate = useNavigate()

    let formHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    let fileHandler = (e) => {
        setInput({ ...input, profilePic: e.target.files[0] })
    }

    let submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);

        let formdata = new FormData();
        formdata.append("fullname", input.fullname);
        formdata.append("email", input.email);
        formdata.append("phone", input.phone);
        formdata.append("bio", input.bio);
        formdata.append("skills", input.skills);
        formdata.append("resume", input.resume);
        formdata.append("instagram", input.instagram);
        formdata.append("file", input.profilePic);


        let updatedProfile = async () => {
            try {
                let res = await axios.put(`${api_end_point}/user/update`, formdata, { withCredentials: true })

                if (res.data.success) {
                    // console.log(res.data);
                    toast.success("Update Successfull")
                    dispatch(setUser(res.data.user))
                    navigate("/profile");
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        updatedProfile();
    }


    return (
        <>
            <NavBar />

            <div className="lg:mx-25">
                {/* <FaArrowLeft onClick={() => navigate("/")} size={39} className=" mt-7 border border-gray-300 p-2 shadow-md rounded-2xl cursor-pointer hover:text-[green]/90 duration-300 hover:shadow-[green]/40" /> */}
            </div>

            <div className='lg:mx-25 mt-5'>

                <div className="mx-auto max-w-3xl py-4 px-7 pb-7 bg-white rounded-2xl shadow-md border border-gray-200">

                    <div className='flex flex-col'>
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 mt-7 w-fit rounded-full bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                        >
                            <IoChevronBackOutline size={22} className="text-gray-600" />
                        </button>

                        <div className="mb-6 text-center">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Edit Your Profile
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Update your personal information
                        </p>
                    </div>
                    </div>

                    <form onSubmit={submitHandler} className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-semibold text-gray-700">Name</label>
                            <input
                                type="text"
                                name="fullname"
                                value={input.fullname}
                                onChange={formHandler}
                                placeholder="Enter your full name"
                                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2
                   focus:outline-none "
                            />
                        </div>


                        <div>
                            <label className="text-sm font-semibold text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={formHandler}
                                placeholder="example@email.com"
                                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2
                   focus:outline-none "
                            />
                        </div>


                        <div>
                            <label className="text-sm font-semibold text-gray-700">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={input.phone}
                                onChange={formHandler}
                                placeholder="+91 98765 43210"
                                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2
                   focus:outline-none "
                            />
                        </div>


                        <div>
                            <label className="text-sm font-semibold text-gray-700">Instagram</label>
                            <input
                                type="url"
                                name="instagram"
                                value={input.instagram}
                                onChange={formHandler}
                                placeholder="https://instagram.com/username"
                                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2
                   focus:outline-none "
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700">Bio</label>
                            <input
                                type="text"
                                name="bio"
                                value={input.bio}
                                onChange={formHandler}
                                placeholder="Tell something about yourself..."
                                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2
                   focus:outline-none "
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700">Skills</label>
                            <input
                                type="text"
                                name="skills"
                                value={input.skills}
                                onChange={formHandler}
                                placeholder="React, Node, MongoDB"
                                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2
                   focus:outline-none "
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700">Resume</label>
                            <input
                                type="url"
                                name="resume"
                                value={input.resume}
                                onChange={formHandler}
                                placeholder="https://drive.google.com/your-resume"
                                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none "
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700">Profile pic</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={fileHandler}
                                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none "
                            />
                        </div>

                        <div className="col-span-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-2 bg-emerald-600 text-white rounded-lg py-2.5
                                           font-semibold hover:bg-emerald-700 active:scale-95
                                           transition-all duration-300
                                           flex items-center justify-center gap-2 cursor-pointer">
                                {loading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span>Updating...</span>
                                    </>
                                ) : (
                                    "Update"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProfile
