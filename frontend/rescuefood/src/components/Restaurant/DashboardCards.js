import React from "react";

const DashboardCards = () => {
  const cards = [
    {
      title: "Menus",
      value: 56,
      imageurl: "https://img.freepik.com/free-vector/statistical-analysis-graphs_53876-81514.jpg?semt=ais_hybrid",
    },
    {
      title: "Donated",
      value: 785,
      imageurl: "https://img.freepik.com/free-vector/statistical-analysis-graphs_53876-81514.jpg?semt=ais_hybrid",
    },
    {
      title: "Kgs",
      value: 56,
      imageurl: "https://img.freepik.com/free-vector/statistical-analysis-graphs_53876-81514.jpg?semt=ais_hybrid",
    },
    {
      title: "Helped",
      value: "400",
      imageurl: "https://img.freepik.com/free-vector/statistical-analysis-graphs_53876-81514.jpg?semt=ais_hybrid",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
      {cards.map((card, index) => (
        <div
          key={index}
          className="p-4  rounded-lg flex flex-col items-center shadow-lg"
        >
          {/* Image */}
          {card.imageurl && (
            <img
              src={card.imageurl}
              alt={`${card.title} illustration`}
              className="w-full h-24 object-cover rounded mb-4"
            />
          )}

          {/* Title and Value */}
          <div className="flex justify-between items-center w-full">
            <p className="text-gray-500 text-lg">{card.title}</p>
            <h2 className="text-xl font-bold">{card.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
