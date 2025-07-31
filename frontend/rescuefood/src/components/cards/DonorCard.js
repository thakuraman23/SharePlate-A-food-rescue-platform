import React from 'react';
import profilepic from "../images/profilepic.png";

const DonorCard = () => {
  return (
    <div className='border-2 border-gray-300 rounded-lg shadow-lg bg-white p-4 mx-4 my-3 max-w-xs w-full'>
      <img className="w-40 h-40 object-cover rounded-full mx-auto" src={profilepic} alt='profile' />
      <h1 className="mt-4 text-xl font-semibold text-gray-800">Name</h1>
      <h2 className="mt-2 text-lg text-gray-600">KG / Amount</h2>
      <div className="mt-4">
        <span className='bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 text-white text-sm font-semibold px-4 py-2 rounded-full'>
          KG / Amount
        </span>
      </div>
    </div>
  );
};

export default DonorCard;
