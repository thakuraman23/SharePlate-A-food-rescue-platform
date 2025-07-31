import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_PATH } from "../configs/routesconfig";

const RecentOrders = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    const email = localStorage.getItem("email");
    const token=localStorage.getItem("token");
    if (email) {
      const fetchOrderHistory = async () => {
        try {
          const response = await axios.post(
            `${BACKEND_PATH}/rescuefood/api/v1/restaurant/history`,
            { email },
            {
              headers: {
                "Content-Type": "application/json",
                "x-access-token": token, // Ensure this is included
              },
              withCredentials: true, // Required if backend needs authentication
            }
          );
    
          setOrderHistory(response.data.donations || []);
        } catch (err) {
          console.error("❌ Error fetching order history:", err);
        }
      };
      fetchOrderHistory();
    }
  }, []);

  // Sort orders by date (newest first)
  const sortedOrders = orderHistory.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  // Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orderHistory.length / ordersPerPage);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
    
      {currentOrders.length === 0 ? (
        <p className="text-gray-600 text-center">No recent donations available.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {currentOrders.map((order) => (
            <li key={order._id} className="py-4 px-4 bg-gray-50 rounded-lg shadow-md mb-3">
              <div className="flex justify-between items-center">
                <div className="text-gray-700">
                  <p className="font-semibold">Items: <span className="font-normal">{order.donationList.map((item) => item.itemName).join(", ")}</span></p>
                  <p className="text-sm text-gray-500">Updated: {new Date(order.updatedAt).toLocaleString()}</p>
                </div>

                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-lg ${
                    order.status === "requested"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
