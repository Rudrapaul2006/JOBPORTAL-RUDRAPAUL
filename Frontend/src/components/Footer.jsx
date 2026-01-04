import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">

      <div className="lg:mx-10 flex flex-col lg:flex-row lg:justify-between gap-8 px-4 sm:px-8 lg:px-16">
        <div>
          <h1 className="text-2xl font-bold text-emerald-500 mb-4">
            <span className="text-red-700">Job</span>Portal
          </h1>
          <p className="text-gray-400 text-sm">
            Connecting talent with top companies. Find your dream job or the perfect candidate today.
          </p>
        </div>

        <div className="flex flex-col justify-between lg:flex-row md:flex-row sm:flex-col gap-15">
          <div>
          <h2 className="font-semibold mb-4">Links</h2>
          <ul className="text-gray-400 text-sm space-y-2">
            <Link to="/"><li className="hover:text-white cursor-pointer mt-2">Home</li></Link>
            <Link to="/jobs"><li className="hover:text-white cursor-pointer mt-2">Jobs</li></Link>
            <li className="hover:text-white cursor-pointer mt-2">Blog</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-4">Resources</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">Career Tips</li>
            <li className="hover:text-white cursor-pointer">Resume Help</li>
            <li className="hover:text-white cursor-pointer">Interview Prep</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        <div className="lg:mx-10">
          <h2 className="font-semibold mb-4">Newsletter</h2>
          <p className="text-gray-400 text-sm">
            Welcome in job portal website ..
          </p>
        </div>
        </div>
      </div>

      <div className="border-t lg:mx-22 md:mx-22 border-gray-700 mt-8 pt-6 px-4 sm:px-8 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-4">

        <p className="text-gray-500 text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
        </p>

        <div className="flex gap-4 text-gray-400 text-lg">
          <FaFacebookF className="hover:text-white cursor-pointer" />
          <FaTwitter className="hover:text-white cursor-pointer" />
          <FaLinkedinIn className="hover:text-white cursor-pointer" />
          <FaInstagram className="hover:text-white cursor-pointer" />
        </div>

      </div>
    </footer>

  );
};

export default Footer;
