import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_PATH } from "../configs/routesconfig";

const RecentOrders = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [otpModal, setOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (!email || !token) {
      console.error("❌ Missing email or token in localStorage!");
      return;
    }
  
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
  }, []);
  

  // Filter and prioritize "pending" first, then "requested"
  const filteredOrders = orderHistory
    .filter((order) => order.status === "pending" || order.status === "requested")
    .sort((a, b) => (a.status === "pending" && b.status === "requested" ? -1 : 1));

  // Get the latest 3 relevant orders
  const latestThreeOrders = filteredOrders.slice(0, 3);

  // Function to handle OTP verification
  const handleVerifyOtp = async () => {
    if (!selectedOrder || !otp) return;

    const token = localStorage.getItem("token"); // Retrieve token for verification

    try {
      const response = await axios.post(
        `${BACKEND_PATH}/rescuefood/api/v1/restaurant/verify-otp`,
        {
          orderId: selectedOrder._id,
          otp,
        },
        {
          headers: {
            "x-access-token": token, // Include token in headers
          },
        }
      );

      if (response.data.success) {
        alert("OTP Verified! Order marked as completed.");
        setOrderHistory((prevOrders) =>
          prevOrders.map((order) =>
            order._id === selectedOrder._id ? { ...order, status: "completed" } : order
          )
        );
        setOtpModal(false);
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-4">Recent Donations</h2>
      {latestThreeOrders.length === 0 ? (
        <p>No pending or requested donations available.</p>
      ) : (
        <ul>
          {latestThreeOrders.map((order) => (
            <li key={order._id} className="flex justify-between py-2 border-b">
              <div className="text-gray-700">
                <strong>Items:</strong> {order.donationList.map((item) => item.itemName).join(", ")}
              </div>

              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 rounded ${
                    order.status === "pending" ? "bg-yellow-200" : "bg-red-200"
                  }`}
                >
                  {order.status}
                </span>

                {order.status === "pending" && (
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setOtpModal(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Enter OTP
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* OTP Modal */}
      {otpModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Enter OTP</h3>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 w-full rounded mb-4"
              placeholder="Enter OTP"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setOtpModal(false)} className="bg-gray-300 px-3 py-1 rounded">
                Cancel
              </button>
              <button onClick={handleVerifyOtp} className="bg-green-500 text-white px-3 py-1 rounded">
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
