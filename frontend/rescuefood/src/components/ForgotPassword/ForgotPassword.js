import React, { useState } from "react";
import axios from "axios";
import { BACKEND_PATH } from "../configs/routesconfig";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("volunteer"); // Default role
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${BACKEND_PATH}/rescuefood/api/v1/${role}/resetpasswordlink`,
        { email }
      );
      setMessage(response.data.message);
      setStep(2); // Move to OTP input step
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${BACKEND_PATH}/rescuefood/api/v1/${role}/resetverifyotp`,
        { email, otp }
      );
      setMessage(response.data.message);
      setStep(3); // Move to reset password step
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP!");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_PATH}/rescuefood/api/v1/${role}/resetpasswordrequest`,
        { email, password }
      );
      setMessage(response.data.message);
      setStep(4); // Success message
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#ECE852]">
      <div className="w-full max-w-md bg-[#ECE852] p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center mb-4">
          {step === 1
            ? "Forgot Password"
            : step === 2
            ? "Enter OTP"
            : step === 3
            ? "Reset Password"
            : "Password Reset Successfully"}
        </h2>

        {message && <p className="text-green-500 text-sm text-center">{message}</p>}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {step === 1 && (
          <form onSubmit={handleRequestOTP} className="space-y-4">
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="volunteer">Volunteer</option>
              <option value="restaurant">Restaurant</option>
            </select>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-400">
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-400">
              Verify OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-400">
              Reset Password
            </button>
          </form>
        )}

        {step === 4 && (
          <div className="text-center">
            <p className="text-green-600">Your password has been reset successfully!</p>
            <a href="/login" className="text-blue-500 hover:underline">
              Go to Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
