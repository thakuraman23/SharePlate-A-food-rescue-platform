import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_PATH } from "../configs/routesconfig";

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const email = localStorage.getItem("email");
        if (!email) {
          setError("User email not found!");
          return;
        }

        const response = await axios.post(
          `${BACKEND_PATH}/rescuefood/api/v1/volunteer/history`,
          { email }
        );

        setHistoryData(response.data.history || []);
      } catch (error) {
        console.error("Error fetching history:", error);
  
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">History</h2>

      {/* Error Message */}
      {error && <p className="text-center text-red-500 font-semibold">{error}</p>}

      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
        {historyData.length === 0 ? (
          <p className="text-center text-gray-500">No history available.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {historyData.map((item, index) => (
              <li
                key={item._id}
                className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-gray-700 hover:bg-gray-50 transition-all rounded-lg px-4"
              >
                <span className="text-lg font-semibold text-blue-600">#{index + 1}</span>
                <span className="text-lg">{item.restaurantName}</span>
                <span className="text-sm text-gray-500">{new Date(item.updatedAt).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default History;
