import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Map from "../../Map/Map";

interface LiveTrackingProps {
  orderId: string;
}

interface LocationUpdateData {
  orderId: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const LiveTracking: React.FC<LiveTrackingProps> = ({ orderId }) => {
  const socketRef = useRef<any>(null);
  const [coordinates, setCoordinates] = React.useState<{
    lat: number;
    lng: number;
  }>({
    lat: 0,
    lng: 0,
  });

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

  return (
    <>
      <h2>Live Tracking</h2>
      <Map
        apikey="8l_Oc_6LxfO8c8pPomyMBL-5Tap9jrt_ZFKH_os6gO4"
        coordinates={coordinates}
      />
    </>
  );
};

export default LiveTracking;
