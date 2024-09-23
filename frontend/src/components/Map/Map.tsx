import { useEffect, useRef } from "react";
import H from "@here/maps-api-for-javascript";

interface MapProps {
  apikey: string;
  userCoordinates: { lat: number; lng: number };
  providerCoordinates?: { lat: number; lng: number } | null; // Allow null
}

const Map: React.FC<MapProps> = ({ apikey, userCoordinates, providerCoordinates }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useRef<H.Map | null>(null);
  const userMarker = useRef<H.map.Marker | null>(null);
  const providerMarker = useRef<H.map.Marker | null>(null);
  const platform = useRef<H.service.Platform | null>(null);
  const routeLine = useRef<H.map.Polyline | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      if (!map.current) {
        try {
          platform.current = new H.service.Platform({ apikey });
          const defaultLayers = platform.current.createDefaultLayers();

          // Initialize the map with valid coordinates
          if (!isNaN(userCoordinates.lat) && !isNaN(userCoordinates.lng)) {
            map.current = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
              zoom: 14,
              center: { lat: userCoordinates.lat, lng: userCoordinates.lng },
            });

            // Map events and UI
            const mapEvents = new H.mapevents.MapEvents(map.current);
            const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map.current));
            const ui = H.ui.UI.createDefault(map.current, defaultLayers);

            // Create user marker
            let userMarker = new H.map.Marker({ lat: userCoordinates.lat, lng: userCoordinates.lng });
            map.current.addObject(userMarker);

            // Create provider marker and route line if available
            if (providerCoordinates && !isNaN(providerCoordinates.lat) && !isNaN(providerCoordinates.lng)) {
              let providerMarker = new H.map.Marker({ lat: providerCoordinates.lat, lng: providerCoordinates.lng });
              map.current.addObject(providerMarker);

              const points = [
                userCoordinates.lng, userCoordinates.lat,
                providerCoordinates.lng, providerCoordinates.lat
              ];
              const lineString = new H.geo.LineString(points);
              routeLine.current = new H.map.Polyline(lineString, {
                style: { strokeColor: 'blue', lineWidth: 5 },
                data: lineString,
              });
              map.current.addObject(routeLine.current);
            }

            window.addEventListener("resize", () => map.current?.getViewPort().resize());
          } else {
            console.error("Invalid user coordinates:", userCoordinates);
          }
        } catch (error) {
          console.error("Error initializing map:", error);
        }
      } else {
        // Update the center and markers on subsequent renders
        if (!isNaN(userCoordinates.lat) && !isNaN(userCoordinates.lng)) {
          map.current.setCenter({ lat: userCoordinates.lat, lng: userCoordinates.lng });
          userMarker.current?.setGeometry({ lat: userCoordinates.lat, lng: userCoordinates.lng });

          if (providerCoordinates && !isNaN(providerCoordinates.lat) && !isNaN(providerCoordinates.lng)) {
            if (providerMarker.current) {
              providerMarker.current.setGeometry({ lat: providerCoordinates.lat, lng: providerCoordinates.lng });
            } else {
              providerMarker.current = new H.map.Marker({ lat: providerCoordinates.lat, lng: providerCoordinates.lng });
              map.current.addObject(providerMarker.current);
            }

            const points = [
              userCoordinates.lng, userCoordinates.lat,
              providerCoordinates.lng, providerCoordinates.lat
            ];

            if (routeLine.current) {
              routeLine.current.setGeometry(new H.geo.LineString(points));
            } else {
              const lineString = new H.geo.LineString(points);
              routeLine.current = new H.map.Polyline(lineString, {
                style: { strokeColor: 'blue', lineWidth: 5 },
                data: lineString,
              });
              map.current.addObject(routeLine.current);
            }
          }
        }
      }
    }
  }, [apikey, userCoordinates, providerCoordinates]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px", position: "relative" }} />;
};

export default Map;