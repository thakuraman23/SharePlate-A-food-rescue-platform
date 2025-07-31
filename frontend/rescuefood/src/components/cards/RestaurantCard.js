import React from "react";

const RestaurantCard = () => {
  return (
    <div
      className="border-2 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg overflow-hidden text-center"
      aria-label="Restaurant Donation Card"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white py-3">
        <h1 className="text-xl font-semibold">Today's Donation</h1>
      </div>

      {/* Donation Info */}
      <div className="py-6">
        <p className="text-4xl font-bold text-gray-800">77 kg</p>
        <p className="text-gray-500 mt-2 text-sm">Total weight donated today</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
