import React from "react";
import { FaBuilding, FaEnvelope, FaPhone } from "react-icons/fa";

const Profile = () => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg max-w-5xl mx-auto mt-6 border border-gray-200">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
        🍽️ Volunteer Profile
      </h1>

      {/* Grid container for responsive layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="flex flex-col bg-gray-50 p-4 rounded-md">
          <div className="flex items-center space-x-2">
            <FaBuilding className="text-gray-700 text-xl" />
            <h2 className="text-lg font-semibold text-gray-600">Name</h2>
          </div>
          <p className="text-gray-800 font-medium ml-7 mt-1">
            {localStorage.getItem("name") || "N/A"}
          </p>
        </div>

        {/* Phone */}
        <div className="flex flex-col bg-gray-50 p-4 rounded-md">
          <div className="flex items-center space-x-2">
            <FaPhone className="text-blue-600 text-xl" />
            <h2 className="text-lg font-semibold text-gray-600">Phone</h2>
          </div>
          <p className="text-gray-800 font-medium ml-7 mt-1">
            {localStorage.getItem("phone") || "N/A"}
          </p>
        </div>

        {/* Email */}
        <div className="flex flex-col bg-gray-50 p-4 rounded-md">
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-red-600 text-xl" />
            <h2 className="text-lg font-semibold text-gray-600">Email</h2>
          </div>
          <p className="text-gray-800 font-medium ml-7 mt-1">
            {localStorage.getItem("email") || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
