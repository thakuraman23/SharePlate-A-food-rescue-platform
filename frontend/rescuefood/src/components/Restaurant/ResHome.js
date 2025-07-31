import React from 'react';
import DashboardCards from './DashboardCards';
import RecentOrders from './RecentOrders';
import MonthlyRank from './MonthlyRank';

const ResHome = () => {
  return (
    <div className="overflow-auto h-screen p-4">
      <DashboardCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-3">
        {/* Ensure responsiveness and scrollability */}
        <RecentOrders />
        <MonthlyRank />
      </div>
    </div>
  );
};

export default ResHome;
