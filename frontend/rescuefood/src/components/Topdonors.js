import React from 'react';
import DonorCard from './cards/DonorCard';

const Topdonors = () => {
  return (
    <div className='max-w-screen-lg mx-auto p-4 '>
      <h1 className='text-3xl mt-4 text-center font-semibold text-gray-800'>
        Top Restaurant Donors
      </h1>
      <div className='flex justify-around flex-wrap py-4 gap-6'>
        {Array(10).fill().map((_, idx) => (
          <div key={idx} className='w-full sm:w-1/2 lg:w-1/4 xl:w-1/5'>
            <DonorCard />
          </div>
        ))}
      </div>
      <div className='text-right'>
        <button className='mr-16 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300'>
          More
        </button>
      </div>

      <h1 className='text-3xl mt-8 text-center font-semibold text-gray-800'>
        Top Individual Donors
      </h1>
      <div className='flex justify-around flex-wrap py-4 gap-6'>
        {Array(10).fill().map((_, idx) => (
          <div key={idx} className='w-full sm:w-1/2 lg:w-1/4 xl:w-1/5'>
            <DonorCard />
          </div>
        ))}
      </div>
      <div className='text-right'>
        <button className='mr-16 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300'>
          More
        </button>
      </div>
    </div>
  );
};

export default Topdonors;
