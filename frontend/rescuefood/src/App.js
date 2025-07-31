
import { Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import "./App.css";
import Home from "./components/Home";
import Topdonors from "./components/Topdonors";
import Login from "./components/LoginPage/Login";
import Restauranthome from "./components/Restaurant/Restauranthome";
import DashboardVolunteer from "./components/Volunteer/DashboardVolunteer";
import RestaurantSignUp from "./components/Restaurant/RestaurantSignup";
import VolunteerSignup from "./components/Volunteer/VolunteerSignUp";
import Kycform from "./components/Kycform";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topdonors" element={<Topdonors />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
  
        
        {/* Restaurant Authentication */}
        <Route path="/restaurant/login" element={<Login heading="Restaurant" userType="restaurant" />} />
        <Route path="/restaurant/signup" element={<RestaurantSignUp />} />

        {/* Protected Restaurant Dashboard */}
        <Route
          path="/restaurant/dashboard/*"
          element={
            <ProtectedRoute allowedType="restaurant">
              <Restauranthome />
            </ProtectedRoute>
          }
        />

        <Route path="/kycform" element={<Kycform />} />

        {/* Volunteer Authentication */}
        <Route path="/volunteer/login" element={<Login heading="Volunteer" userType="volunteer" />} />
        <Route path="/volunteer/signup" element={<VolunteerSignup />} />

        {/* Protected Volunteer Dashboard */}
        <Route
          path="/volunteer/dashboard/*"
          element={
            <ProtectedRoute allowedType="volunteer">
              <DashboardVolunteer />
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
