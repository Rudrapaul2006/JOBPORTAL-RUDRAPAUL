import React, { useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api_end_point } from "../utils/Constant";
import axios from "axios";
import { toast } from "sonner";
import { setUser, clearUser } from "../Redux/authSlice";
import { CiLogout } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";




let NavBar = () => {
  let { user, loading } = useSelector((store) => store.auth);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [open, setOpen] = useState(false);


  let logout = async () => {
    try {
      await axios.get(`${api_end_point}/user/logout`, {
        withCredentials: true,
      });

      dispatch(clearUser());
      navigate("/");
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  useEffect(() => {
    let fetchUser = async () => {
      try {
        let res = await axios.get(`${api_end_point}/user/profile`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setUser(res.data.user));
        } else {
          dispatch(clearUser());
        }
      } catch (error) {
        dispatch(clearUser());
      }
    };

    fetchUser();
  }, [dispatch]);

  if (loading) return null;

  return (
    <>
      <div className="border-b sticky top-0 z-999 bg-white h-[4rem] flex justify-between items-center px-4 sm:px-8">

        <div className="text-[22px] sm:mx-4 lg:mx-15 sm:text-[25px] font-bold cursor-pointer">
          <Link to="">
            <span className="">Job</span>
            <span className="text-red-500">Portal</span>
          </Link>
        </div>

        <div className="hidden lg:mx-16 md:flex items-center gap-18 text-[17px]">

          <div className="flex items-center gap-8 font-medium text-gray-700">
            {user && user?.role === "recruiter" ? (
              <>
                <NavLink to="/admin/companies">
                  {({ isActive }) => (
                    <li className={`list-none cursor-pointer ${isActive ? "text-green-600" : "hover:text-green-600"}`}>
                      Companies
                    </li>
                  )}
                </NavLink>

                <NavLink to="/admin/jobs">
                  {({ isActive }) => (
                    <li className={`list-none cursor-pointer ${isActive ? "text-green-600" : "hover:text-green-600"}`}>
                      Jobs
                    </li>
                  )}
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/">
                  {({ isActive }) => (
                    <li className={`list-none cursor-pointer ${isActive ? "text-green-600" : "hover:text-green-600"}`}>
                      <span className="text-[17px] font-bold">Home</span>
                    </li>
                  )}
                </NavLink>

                <NavLink to="/jobs">
                  {({ isActive }) => (
                    <li className={`list-none cursor-pointer ${isActive ? "text-green-600" : "hover:text-green-600"}`}>
                      <span className="text-[17px] font-bold">Jobs</span>
                    </li>
                  )}
                </NavLink>
              </>
            )}
          </div>

          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <button className="px-5 py-1 rounded-md bg-[#0daa4c] text-white font-semibold cursor-pointer">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-1 rounded-md bg-[#6366F1] text-white font-semibold cursor-pointer">
                  Sign up
                </button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage
                    className="cursor-pointer size-13 border rounded-full p-1"
                    src={user?.profilePic || "https://github.com/shadcn.png"}
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                    <div className="flex items-center gap-5 mb-5">
                    <Avatar>
                      <AvatarImage
                        className="size-9 rounded-full"
                        src={user?.profilePic || "https://github.com/shadcn.png"}
                      />
                    </Avatar>

                    <div>
                      <h1>{user?.fullname}</h1>
                      <h4>{user?.bio}</h4>
                    </div>
                  </div>

                  {
                    user && user.role !== "recruiter" ? (
                      <>
                        <div className="flex items-center">
                          <CgProfile size={23} />
                          <Button variant="link">
                            <Link className="cursor-pointer" to="/profile">View Profile</Link>
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>You are a Recruiter you dont have any profile ..</div>
                      </>)
                  }

                  <div className="flex items-center mt-2 cursor-pointer">
                    <CiLogout className="mt-1" size={23} />
                    <Button variant="link" className="cursor-pointer" onClick={logout}>
                      Logout
                    </Button>
                  </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>

        {open && (
          <div className="absolute top-[4rem] left-0 w-full bg-white border-t shadow-md md:hidden">
            <ul className="flex flex-col gap-4 p-5 text-gray-700 font-medium">

              {user && user?.role === "recruiter" ? (
                <>
                  <Link to="/admin/companies" onClick={() => setOpen(false)}>Companies</Link>
                  <Link to="/admin/jobs" onClick={() => setOpen(false)}>Jobs</Link>
                </>
              ) : (
                <>
                  <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                  <Link to="/jobs" onClick={() => setOpen(false)}>Job</Link>
                </>
              )}

              {!user ? (
                <>
                  <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
                  <Link to="/signup" onClick={() => setOpen(false)}>Sign up</Link>
                </>
              ) : (
                <>
                  {user.role !== "recruiter" && (
                    <Link to="/profile" onClick={() => setOpen(false)}>View Profile</Link>
                  )}
                  <button onClick={logout} className="text-left text-red-500">
                    Logout
                  </button>
                </>
              )}

            </ul>
          </div>
        )}
      </div>

      <Outlet />
    </>
  );
};

export default NavBar;
