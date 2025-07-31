import React, { useState } from "react";
import { BACKEND_PATH } from "../configs/routesconfig";
import { useNavigate } from "react-router";

const RestaurantSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: {
      type: "Point",
      coordinates: [],
    },
    address: "",
    proofId: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const backendRoute = `${BACKEND_PATH}/rescuefood/api/v1/restaurant/signup`;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "latitude" || name === "longitude") {
      const coordinates = [...formData.location.coordinates];
      if (name === "longitude") coordinates[1] = parseFloat(value);
      if (name === "latitude") coordinates[0] = parseFloat(value);
      setFormData({
        ...formData,
        location: { ...formData.location, coordinates },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsFetchingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData({
          ...formData,
          location: {
            ...formData.location,
            coordinates: [longitude, latitude],
          },
        });
        setIsFetchingLocation(false);
        alert(
          `Location detected: Latitude ${latitude}, Longitude ${longitude}`
        );
      },
      (error) => {
        alert("Failed to fetch location. Please try again.");
        setIsFetchingLocation(false);
      }
    );
  };

  const handleClick = () => {
    navigate("/restaurant/login");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(backendRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Restaurant Signup successful!");
        navigate("/restaurant/login");
      } else {
        alert(`Signup failed: ${data.message}`);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#ECE852]">
      <div className="w-full max-w-md bg-[#ECE852] p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold text-center text-black mb-6">
          Restaurant Signup
        </h1>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Restaurant Name"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              name="latitude"
              placeholder="Latitude"
              value={formData.location.coordinates[1] || ""}
              onChange={handleChange}
              className="flex-1 min-w-0 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="longitude"
              placeholder="Longitude"
              value={formData.location.coordinates[0] || ""}
              onChange={handleChange}
              className="flex-1 min-w-0 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="button"
            onClick={handleGetLocation}
            className={`w-full py-2 rounded-lg text-white ${
              isFetchingLocation
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 transition duration-300"
            }`}
            disabled={isFetchingLocation}
          >
            {isFetchingLocation
              ? "Detecting Location..."
              : "Get Current Location"}
          </button>
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="proofId"
            placeholder="Proof ID"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg text-white ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 transition duration-300"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
          <div className="mt-2">
            <p className="text-sm text-black text-center">
              Already a member?{" "}
              <span
                className="text-green-500 cursor-pointer hover:underline"
                onClick={handleClick}
              >
                Sign In Now
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestaurantSignup;
