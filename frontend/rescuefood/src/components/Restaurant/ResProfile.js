import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_PATH } from "../configs/routesconfig";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaBuilding } from "react-icons/fa";

const ResProfile = () => {
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantProfile = async () => {
      try {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token"); // Retrieve the token
  
        if (!email || !token) {
          throw new Error("User not logged in.");
        }
  
        const response = await axios.post(
          `${BACKEND_PATH}/rescuefood/api/v1/restaurant/profile`,
          { email },
          {
            headers: {
              "x-access-token": token, // Send the token in headers
            },
          }
        );
  
        setRestaurantDetails(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch restaurant profile.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchRestaurantProfile();
  }, []);
  

  if (loading) {
    return <div className="text-center mt-4 text-lg font-semibold text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 mt-4 font-semibold">Error: {error}</div>;
  }

  const { name, phone, email, location, address } = restaurantDetails;
  const coordinates = location?.coordinates || [];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-5xl mx-auto mt-10 border border-gray-200">
      
      {/* Flex container for responsive layout */}
      <div className="flex flex-wrap justify-between gap-4 md:gap-6">
        
        {/* Name */}
        <div className="flex flex-col bg-gray-50 p-4 rounded-md w-full sm:w-[48%]">
          <div className="flex items-center space-x-2">
            <FaBuilding className="text-gray-700 text-xl" />
            <h2 className="text-lg font-semibold text-gray-600">Name</h2>
          </div>
          <p className="text-gray-800 font-medium ml-7 mt-1">{name}</p>
        </div>

        {/* Phone */}
        <div className="flex flex-col bg-gray-50 p-4 rounded-md w-full sm:w-[48%]">
          <div className="flex items-center space-x-2">
            <FaPhone className="text-blue-600 text-xl" />
            <h2 className="text-lg font-semibold text-gray-600">Phone</h2>
          </div>
          <p className="text-gray-800 font-medium ml-7 mt-1">{phone}</p>
        </div>

        {/* Email */}
        <div className="flex flex-col bg-gray-50 p-4 rounded-md w-full sm:w-[48%]">
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-red-600 text-xl" />
            <h2 className="text-lg font-semibold text-gray-600">Email</h2>
          </div>
          <p className="text-gray-800 font-medium ml-7 mt-1">{email}</p>
        </div>

        {/* Location */}
        <div className="flex flex-col bg-gray-50 p-4 rounded-md w-full sm:w-[48%]">
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-green-600 text-xl" />
            <h2 className="text-lg font-semibold text-gray-600">Location</h2>
          </div>
          {coordinates.length === 2 ? (
            <p className="text-gray-800 font-medium ml-7 mt-1">
              Latitude: {coordinates[1]}, Longitude: {coordinates[0]}
            </p>
          ) : (
            <p className="text-gray-800 mt-1">Location data not available</p>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col bg-gray-50 p-4 rounded-md w-full sm:w-[48%]">
          <div className="flex items-center space-x-2">
            <FaBuilding className="text-purple-600 text-xl" />
            <h2 className="text-lg font-semibold text-gray-600">Address</h2>
          </div>
          <p className="text-gray-800 font-medium ml-7 mt-1">{address}</p>
        </div>

      </div>
    </div>
  );
};

export default ResProfile;
