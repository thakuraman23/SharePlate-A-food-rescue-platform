// components/Sidebar.js
import React from "react";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { CiGift, CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router";
import { FaHistory } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate(); // Correctly invoke the useNavigate hook
  const handleLogout=()=>{
    localStorage.clear();
    navigate("/")
  }

  return (
    <div className="w-20 2xl:w-64 bg-[#ECE852] text-black flex flex-col">
      <nav className="flex-grow">
        <ul className="space-y-2">
          {/* Dashboard */}
          <li
            className="p-4 hover:bg-[#FFC145] flex items-center justify-center lg:justify-start group"
            onClick={() => navigate("/restaurant/dashboard/home")} // Correct usage
          >
            <MdDashboard className="text-6xl 2xl:text-xl" />
            <span className="hidden 2xl:inline ml-3 absolute bg-black text-white px-2 py-1 rounded shadow-md 2xl:static 2xl:bg-transparent 2xl:shadow-none">
              Dashboard
            </span>
          </li>
          {/* Profile */}
          <li
            className="p-4 hover:bg-[#FFC145] flex items-center justify-center lg:justify-start group"
            onClick={() => navigate("/restaurant/dashboard/profile")} // Correct usage
          >
            <CgProfile className="text-6xl 2xl:text-xl" />
            <span className="hidden 2xl:inline ml-3 absolute bg-black text-white px-2 py-1 rounded shadow-md 2xl:static 2xl:bg-transparent 2xl:shadow-none">
              Profile
            </span>
          </li>
          {/* Donation */}
          <li
            className="p-4 hover:bg-[#FFC145] flex items-center justify-center lg:justify-start group"
            onClick={() => navigate("/restaurant/dashboard/donate")} // Correct usage
          >
            <CiGift className="text-6xl 2xl:text-xl" />
            <span className="hidden 2xl:inline ml-3 absolute bg-black text-white px-2 py-1 rounded shadow-md 2xl:static 2xl:bg-transparent 2xl:shadow-none">
              Donate
            </span>
          </li>
           {/* Donation */}
           <li
            className="p-4 hover:bg-[#FFC145] flex items-center justify-center lg:justify-start group"
            onClick={() => navigate("/restaurant/dashboard/history")} // Correct usage
          >
            <FaHistory className="text-6xl 2xl:text-xl" />
            <span className="hidden 2xl:inline ml-3 absolute bg-black text-white px-2 py-1 rounded shadow-md 2xl:static 2xl:bg-transparent 2xl:shadow-none">
              Donation History
            </span>
          </li>
          {/* Logout */}
          <li onClick={handleLogout} className="p-4 hover:bg-[#FFC145] flex items-center justify-center lg:justify-start group">
            <CiLogout className="text-6xl 2xl:text-xl" />
            <span className="hidden 2xl:inline ml-3 absolute bg-black text-white px-2 py-1 rounded shadow-md 2xl:static 2xl:bg-transparent 2xl:shadow-none">
              Logout
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
