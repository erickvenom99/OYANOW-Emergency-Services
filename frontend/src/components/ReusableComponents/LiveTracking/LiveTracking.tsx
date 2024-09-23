import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Map from "../../Map/Map";
import { useLocation, useParams } from "react-router-dom";

interface LocationUpdateData {
  orderId: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const LiveTracking: React.FC = () => {
  const location = useLocation();
  const { orderId } = useParams();
  
  // Initial coordinates from location state or defaults
  const userCoordinates =
    location.state?.userCoordinates || location.state?.coordinates || { lat: 0, lng: 0 };
  
  const providerCoordinates =
    location.state?.providerCoordinates || { lat: -1, lng: 35 };

  const socketRef = useRef<any>(null);
  const [coordinates, setCoordinates] = React.useState<{
    user: { lat: number; lng: number };
    provider: { lat: number; lng: number };
  }>({
    user: userCoordinates,
    provider: providerCoordinates,
  });

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");

    socketRef.current.on("locationUpdate", (data: LocationUpdateData) => {
      if (data.orderId === orderId) {
        setCoordinates((prev) => {
          // Only update if provider coordinates have changed
          if (prev.provider.lat !== data.coordinates.lat || prev.provider.lng !== data.coordinates.lng) {
            return { ...prev, provider: data.coordinates };
          }
          return prev;
        });
      }
    });

    // Handle socket connection errors
    socketRef.current.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [orderId]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates((prev) => ({
            ...prev,
            user: { lat: latitude, lng: longitude }
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Log coordinates for debugging
  console.log("User Coordinates:", coordinates.user);
  console.log("Provider Coordinates:", coordinates.provider);

  return (
    <div>
      <h2>Live Tracking for Order: {orderId}</h2>
      <Map
        apikey="YOUR_API_KEY" // Replace with your actual API key
        userCoordinates={coordinates.user}
        providerCoordinates={coordinates.provider}
      />
    </div>
  );
};

export default LiveTracking;