import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_PATH } from '../configs/routesconfig';

const ResDonate = () => {
  const [foods, setFoods] = useState('');
  const [weight, setWeight] = useState('');


  const handleRequestOrder = async () => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token"); // Retrieve the token
  
    if (!email || !token) {
      alert("Please log in to create a donation request.");
      return;
    }
  
    try {
      const storedLocation = JSON.parse(localStorage.getItem("location")) || [];
      const location = [parseFloat(storedLocation[0]), parseFloat(storedLocation[1])];
  
      const response = await axios.post(
        `${BACKEND_PATH}/rescuefood/api/v1/restaurant/donate`,
        {
          email,
          donationList: foods.split(",").map((food) => food.trim()),
          weight: parseFloat(weight),
          location: location,
          name: localStorage.getItem("name"),
        },
        {
          headers: {
            "x-access-token": token, // Send the token in headers
          },
        }
      );
  
      setFoods('');
      setWeight('');
      alert(response.data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to create donation request.");
    }
  };
  

  return (
    <>
      {/* Donation Request Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg my-8">
        <h2 className="text-2xl font-semibold mb-4">Request Donation</h2>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500"
            placeholder="Enter foods separated by commas"
            value={foods}
            onChange={(e) => setFoods(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500"
            placeholder="Amount in Kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <button
            onClick={handleRequestOrder}
            className="w-full p-3 bg-[#5CB338] text-white rounded-lg hover:bg-[#FFC145] transition-colors"
          >
            Request Order
          </button>
        </div>
      </div>
    </>
  );
};

export default ResDonate;
