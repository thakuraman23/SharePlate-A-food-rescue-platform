
import React, { useState, useEffect } from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import io from "socket.io-client";
import axios from "axios";
import { BACKEND_PATH } from "../configs/routesconfig";

const GMap = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [distance, setDistance] = useState(null);
  const [data, setData] = useState([]);
  const [otp, setOtp] = useState(null);
  const [acceptedPoint, setAcceptedPoint] = useState(null);
  const [socket, setSocket] = useState(null);

  const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;


  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      withCredentials:true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket");
      newSocket.emit("registerVolunteer", { email: localStorage.getItem("email") });
    });

    newSocket.on("requestedDonations", (donations) => {
      console.log("Raw Data Received:", donations);

      const formattedData = donations.map((point) => {
        if (!point.location || !point.location.coordinates) {
          console.warn("Invalid donation point:", point);
          return null;
        }
        return {
          ...point,
          longitude: Number(point.location.coordinates[0]), // Latitude (index 1)
          latitude: Number(point.location.coordinates[1]), // Longitude (index 0)
        };
      }).filter(Boolean); // Remove any null values

      console.log("Formatted Data for Map:", formattedData);
      setData(formattedData);
    });

    newSocket.on("disconnect", () => {
      console.warn("Socket disconnected.");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setCurrentLocation({
  //           lat: Number(position.coords.latitude),
  //           lng: Number(position.coords.longitude),
  //         });
  //             app.post("/rescuefood/api/v1/volunteer/updatelocation");
          
  //       },
  //       (error) => {
  //         console.error("Error getting location: ", error);
  //         alert("Unable to fetch location. Please enable location access.");
  //         setCurrentLocation({ lat: 17.984, lng: 79.531 });
  //       }
  //     );
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //     setCurrentLocation({ lat: 17.984, lng: 79.531 });
  //   }
  // }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = Number(position.coords.latitude);
          const lng = Number(position.coords.longitude);
          setCurrentLocation({ lat, lng });
  
          // Send location to backend
          axios.post(`${BACKEND_PATH}/rescuefood/api/v1/volunteer/updatelocation`, {
            email: localStorage.getItem("email"),
            coordinates: [lng, lat], // GeoJSON format: [longitude, latitude]
          })
          .then(() => {
            console.log("Location updated successfully");
          })
          .catch((err) => {
            console.error("Error updating location:", err);
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
          alert("Unable to fetch location. Please enable location access.");
          setCurrentLocation({ lat: 17.984, lng: 79.531 });
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setCurrentLocation({ lat: 17.984, lng: 79.531 });
    }
  }, []);
  


  const handleMarkerClick = (point) => {
    setSelectedPoint(point);
    setDistance(null);

    if (currentLocation) {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [{ lat: currentLocation.lat, lng: currentLocation.lng }],
          destinations: [{ lat: point.latitude, lng: point.longitude }],
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (
            status === window.google.maps.DistanceMatrixStatus.OK &&
            response.rows.length > 0 &&
            response.rows[0].elements.length > 0
          ) {
            const element = response.rows[0].elements[0];
            if (element.status === "OK" && element.distance) {
              setDistance(element.distance.text);
            } else {
              setDistance("Distance data not available");
            }
          } else {
            setDistance("Unable to fetch distance");
          }
        }
      );
    }
  };

  const handleAccept = async (donation) => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000);
    setOtp(generatedOtp);
    setAcceptedPoint(donation);

    try {
      await axios.post(`${BACKEND_PATH}/rescuefood/api/v1/volunteer/otpsave`, {
        otp: generatedOtp,
        donationId: donation._id,
        assignedVolunteer: localStorage.getItem("email"),
      });

      console.log("OTP successfully sent to backend");
    } catch (error) {
      console.error("Error sending OTP to backend:", error);
    }

    const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.lat},${currentLocation.lng}&destination=${donation.latitude},${donation.longitude}&travelmode=driving`;
    window.open(url, "_blank");
  };

  return (
    <APIProvider apiKey={process.env.REACT_APP_MAP_API}>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Map Section */}
        <div className="w-full md:w-3/5 h-[50vh] md:h-full">
          {currentLocation ? (
            <Map
              style={{ width: "100%", height: "80%" }}
              defaultCenter={currentLocation}
              defaultZoom={13}
              mapId={"6d24858ab309337a"}
            >
              <AdvancedMarker position={currentLocation} title="Your Location">
                <p className="text-2xl">📍</p>
              </AdvancedMarker>

              {data.map((point, index) => {
                if (isNaN(point.latitude) || isNaN(point.longitude)) {
                  console.warn("Skipping invalid location:", point);
                  return null;
                }
                return (
                  <AdvancedMarker
                    key={index}
                    position={{ lat: point.latitude, lng: point.longitude }}
                    title={point.restaurantEmail || "Unnamed"}
                    onClick={() => handleMarkerClick(point)}
                  />
                );
              })}

              {selectedPoint && (
                <InfoWindow
                  position={{
                    lat: selectedPoint.latitude,
                    lng: selectedPoint.longitude,
                  }}
                  onCloseClick={() => setSelectedPoint(null)}
                >
                  <div>
                    <h3>{selectedPoint.restaurantName}</h3>
                    {distance && <p>Distance: {distance}</p>}
                    <button
                      className="bg-[#5CB338] text-white px-4 py-2 mt-2 rounded"
                      onClick={() => handleAccept(selectedPoint)}
                    >
                      Accept
                    </button>
                  </div>
                </InfoWindow>
              )}
            </Map>
          ) : (
            <div className="flex items-center justify-center h-full">
              Loading your location...
            </div>
          )}
        </div>

        {/* OTP Section */}
        <div className="w-full md:w-2/5 bg-gray-100 overflow-auto h-full p-4">
          {otp ? (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-2xl font-bold">Your OTP</h2>
              <p className="text-4xl font-semibold bg-white p-4 rounded shadow mt-4">
                {otp}
              </p>
              <p className="mt-4 text-gray-600">
                Please share this OTP upon arrival.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">Available Restaurants</h2>
              <ul className="space-y-3">
                {data.length > 0 ? (
                  data.map((restaurant, index) => (
                    <li key={index} className="p-4 bg-white rounded shadow flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">{restaurant.restaurantName}</h3>
                      </div>
                      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleMarkerClick(restaurant)}>
                        View
                      </button>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No restaurants available.</p>
                )}
              </ul>
            </>
          )}
        </div>
      </div>
    </APIProvider>
  );
};

export default GMap;
