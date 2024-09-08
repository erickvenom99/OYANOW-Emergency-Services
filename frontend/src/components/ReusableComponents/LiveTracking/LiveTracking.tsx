import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Map from "../../Map/Map";

interface LiveTrackingProps {
  orderId: string;
  initialCoordinates: {
    lat: number;
    lng: number;
  };
}

interface LocationUpdateData {
  orderId: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const LiveTracking: React.FC<LiveTrackingProps> = ({ orderId, initialCoordinates }) => {
  const socketRef = useRef<any>(null);
  const [coordinates, setCoordinates] = React.useState<{
    lat: number;
    lng: number;
  }>(initialCoordinates);

  useEffect(() => {
    // Connect to the Webserver server
    socketRef.current = io("http://localhost:5000");

    // Listen for location updates
    socketRef.current.on("locationUpdate", (data: LocationUpdateData) => {
      if (data.orderId === orderId) {
        setCoordinates(data.coordinates);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [orderId]);

  useEffect(() => {
    // Request location access
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
          // Optionally, start watching position for updates
          navigator.geolocation.watchPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setCoordinates({ lat: latitude, lng: longitude });
            },
            (error) => console.error("Error watching position:", error),
            { enableHighAccuracy: true }
          );
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <h2>Live Tracking</h2>
      <Map
        apikey="8l_Oc_6LxfO8c8pPomyMBL-5Tap9jrt_ZFKH_os6gO4"
        coordinates={coordinates}
      />
    </div>
  );
};

export default LiveTracking;
