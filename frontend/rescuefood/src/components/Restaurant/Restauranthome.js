
import React from "react";
import { Route, Routes } from "react-router";
import { useLocation } from "react-router";
import Header from "./Header";
import Sidebar from "../Restaurant/Sidebar";
import ResHome from "./ResHome";
import ResProfile from "./ResProfile";
import ResDonate from "./ResDonate";
import HistoryRes from "./HistoryRes"

const Restauranthome = () => {
  const location = useLocation();

  // Map routes to header titles
  const headerTitles = {
    "/restaurant/dashboard/home": "Dashboard",
    "/restaurant/dashboard/history": "Donation History",
    "/restaurant/dashboard/profile": "Profile",
    "/restaurant/dashboard/donate": "Donation",
  
  };

  // Get the current header title based on the location
  const currentHeaderTitle = headerTitles[location.pathname] || "Volunteer Dashboard";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow">
        {/* Header Component */}
        <Header title={currentHeaderTitle} />

        {/* Main Section */}
        <main className="p-6 space-y-6">
          <Routes>
            {/* Route for Home under /restaurant/dashboard */}
            <Route path="home" element={<ResHome />} />
            {/* Other routes */}
            <Route path="history" element={<HistoryRes/>} />
            <Route path="donate" element={<ResDonate/>} />
            <Route path="profile" element={<ResProfile/>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Restauranthome;
