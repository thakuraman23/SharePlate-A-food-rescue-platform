import React from "react";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import {  CiLogout } from "react-icons/ci";
import { FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuItems = [
    { icon: <MdDashboard />, label: "Dashboard", path: "/volunteer/dashboard/home" },
    { icon: <CgProfile />, label: "Profile", path: "/volunteer/dashboard/profile" },
    { icon: <FaHistory />, label: "History", path: "/volunteer/dashboard/history" },
  ];

  return (
    <div className="w-20 2xl:w-64 bg-[#ECE852] text-black flex flex-col">
      <nav className="flex-grow">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="p-4 hover:bg-[#FFC145] flex items-center justify-center lg:justify-start group cursor-pointer"
              onClick={() => navigate(item.path)}
            >
              <span className="text-5xl 2xl:text-xl">{item.icon}</span>
              <span className="hidden 2xl:inline ml-3 absolute bg-black px-2 py-1 rounded shadow-md 2xl:static 2xl:bg-transparent 2xl:shadow-none">
                {item.label}
              </span>
            </li>
          ))}
          {/* Logout Button */}
          <li
            className="p-4 hover:bg-[#FFC145] flex items-center justify-center lg:justify-start group cursor-pointer"
            onClick={handleLogout}
          >
            <CiLogout className="text-6xl 2xl:text-xl" />
            <span className="hidden 2xl:inline ml-3 absolute bg-black px-2 py-1 rounded shadow-md 2xl:static 2xl:bg-transparent 2xl:shadow-none">
              Logout
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;