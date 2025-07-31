import React from "react";

const MonthlyRank = () => {
  const menus = [
    { rank: 1, name: "Yo Yo Res", orders: 89, kg :"100 kg" },
    { rank: 2, name: "MT4 Chef", orders: 67, kg :"99 kg" },
    { rank: 3, name: "PIZza Hut", orders: 59, kg :"97 kg" },
  ];

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-bold mb-4">Your Monthly Rank</h2>
      <ul>
        {menus.map((menu) => (
          <li key={menu.rank} className="flex justify-between items-center py-2 border-b">
            <span>#{menu.rank} {menu.name}</span>
            <span>{menu.kg}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthlyRank;
