import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa6";
import NavBar from "./shared/NavBar";
import { MdEmail, MdContactPhone } from "react-icons/md";
import { CiInstagram } from "react-icons/ci";
import { Button } from "./ui/button";
import AppliedJobs from "./AppliedJobs";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "./Redux/authSlice";
import { api_end_point } from "./utils/Constant";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { IoChevronBackOutline } from "react-icons/io5";

let Profile = () => {

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { user } = useSelector((store) => store.auth);

  useEffect(() => {
    let fetchUserProfile = async () => {
      try {
        let res = await axios.get(`${api_end_point}/user/profile`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setUser(res.data.user));
        } else {
          toast.error(res.data.message || "Failed to load user profile");
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch only if no user data is present
    if (!user || !user.fullname) {
      fetchUserProfile();
    }
  }, [dispatch, user]);

  return (
    <>
      <NavBar />

      <div className="lg:mx-25">
        {/* <FaArrowLeft onClick={() => navigate("/")} size={39} className=" mt-7 mb-12 border border-gray-300 p-2 shadow-md rounded-2xl cursor-pointer hover:text-[green]/90 duration-300 hover:shadow-[green]/40" /> */}
        <button
          onClick={() => navigate("/")}
          className=" p-2 mt-7 w-fit rounded-full bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
        >
          <IoChevronBackOutline size={22} className="text-gray-600" />
        </button>
      </div>

      <div className="flex flex-col border border-gray-200 rounded-2xl shadow-sm mt-7 lg:mx-25">

        <div className="flex justify-between items-center p-2">

          <div className="flex p-2">
            <div className="ml-3 mt-2 flex items-center">
              <Popover>
                <PopoverTrigger >
                  <img
                    src={user?.profilePic || "https://github.com/shadcn.png"}
                    alt="Profile"
                    className="rounded-full w-20 h-20 object-cover cursor-pointer"
                  />
                </PopoverTrigger>

                <PopoverContent
                  side="right"
                  align="center"
                  sideOffset={25}
                  className="w-60 p-3 flex justify-center"
                >
                  <div className="flex flex-col"><div>
                    <img
                      src={user?.profilePic || "https://github.com/shadcn.png"}
                      alt="Profile Large"
                      className="rounded-xl w-64 h-55 object-cover"
                    />
                  </div>

                    <div className="flex flex-col">
                      <div className="ml-1 mb-1 font-semibold mt-1">{user?.fullname}</div> <div className="flex items-center gap-[5px]">
                        <CiInstagram size={25} className="pt-1" />
                        <div className="flex flex-col gap-3 w-full max-w-md">
                          {user?.instagram ? (
                            <a
                              onClick={() => window.open(user?.instagram, "_blank")}
                              className=""
                            >
                              <span className="text-emerald-600 hover:text-emerald-700 pb-2 hover:underline cursor-pointer">Instagram</span>
                            </a>
                          ) : (
                            <div className="text-gray-400 italic mt-1">

                              <span className="text-gray-400 ">Instagram link not available</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>

                </PopoverContent>
              </Popover>
            </div>
          </div>


          <div
            onClick={() => navigate("/profile/update")}
            className="px-5 py-2 mr-2 border border-gray-200 shadow-md rounded-lg hover:scale-105 hover:shadow-xl duration-300 transition-all cursor-pointer"
          >
            <FaPen size={22} />
          </div>

        </div>

        <div className="mt-2">
          <div className="flex flex-col  ml-6 mb-5">

            <div className="text-[22px] mt-2 font-bold">
              {user?.fullname || "Loading..."}
            </div>
            <div className="text-[black]/80 text-md w-full">
              {user?.bio || "No bio provided yet."}
            </div>

          </div>

          <div className="flex flex-col px-4 sm:px-6">
            <div className="font-semibold underline mb-3">
              About :
            </div>

            {/* Email */}
            <div className="flex items-start sm:items-center gap-3 mb-2">
              <MdEmail size={22} className="mt-1 sm:mt-0" />
              <h1 className="text-black/70 break-all">
                {user?.email || (
                  <span className="text-gray-400">Email not available</span>
                )}
              </h1>
            </div>

            {/* Phone */}
            <div className="flex items-start sm:items-center gap-3 mb-2">
              <MdContactPhone size={20} className="mt-1 sm:mt-0" />
              <h1 className="text-black/70">
                {user?.phone || (
                  <span className="text-gray-400">Phone number not available</span>
                )}
              </h1>
            </div>

            {/* Instagram */}
            <div className="flex items-start sm:items-center gap-3">
              <CiInstagram size={24} className="mt-1 sm:mt-0" />
              <div className="flex flex-col gap-2 w-full max-w-md">
                {user?.instagram ? (
                  <span
                    onClick={() => window.open(user?.instagram, "_blank")}
                    className="text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer"
                  >
                    Your Instagram account
                  </span>
                ) : (
                  <span className="text-gray-400 italic">
                    Instagram link not available
                  </span>
                )}
              </div>
            </div>

          </div>

        </div>


        <div className="flex flex-col mt-5 ml-6">
          <h1 className="text-[18px] font-semibold">Skills</h1>

          <div className="flex flex-col">
            {user?.skills && user.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {user.skills.map((item, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-emerald-200 to-emerald-100 text-black px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic mt-2">No skills added yet.</p>
            )}
          </div>

          <div className="mt-5 pb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Resume</h2>

            <div className="flex flex-col gap-3 w-full max-w-md">
              {user?.resume ? (
                <Button
                  onClick={() => window.open(user?.resume, "_blank")}
                  className="px-5 py-2 w-30 bg-emerald-600
                 rounded-lg shadow-md hover:bg-emerald-700 hover:scale-103
                 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  🔗 View Resume
                </Button>
              ) : (
                <div className="text-gray-400 italic mt-1">
                  Resume not uploaded yet (update your resume)
                </div>
              )}
            </div>

          </div>
        </div>
      </div>


      {/* Applied Jobs */}
      <div className="flex flex-col w-full lg:w-[82.5rem] lg:mx-4 lg:ml-[6rem] mb-8 border border-gray-200 rounded-2xl shadow-sm mt-9">
        <h1 className="p-2 ml-2 mt-5 font-semibold text-xl lg:text-2xl">
          Applied Jobs -
        </h1>

        <div className="">
          <AppliedJobs />
        </div>
      </div>


    </>
  );
};

export default Profile;
