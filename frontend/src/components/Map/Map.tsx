import { useEffect, useRef } from "react";
import H from "@here/maps-api-for-javascript";

interface MapProps {
apikey: string;
coordinates: { lat: number; lng: number };
}

const Map: React.FC<MapProps> = ({ apikey, coordinates }) => {
const mapRef = useRef<HTMLDivElement | null>(null);
const map = useRef<H.Map | null>(null);
const platform = useRef<H.service.Platform | null>(null);
const marker = useRef<H.map.Marker | null>(null);

useEffect(() => {
if (mapRef.current) {
platform.current = new H.service.Platform({
apikey,
});

  const defaultLayers =
    platform.current.createDefaultLayers() as H.service.DefaultLayers;
  
  // Initialize the map centered at the provided coordinates
  map.current = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
    zoom: 10,
    center: { lat: coordinates.lat, lng: coordinates.lng }, // Center the map on the initial coordinates
  });

  const mapEvents = new H.mapevents.MapEvents(map.current);
  const behavior = new H.mapevents.Behavior(mapEvents);
  const ui = H.ui.UI.createDefault(map.current, defaultLayers);

  // Create a marker for the service provider
  let currentLocation = new H.map.Marker({ lat: coordinates.lat, lng: coordinates.lng });
  map.current.addObject(currentLocation);

  window.addEventListener("resize", () =>
    map.current?.getViewPort().resize()
  );

  return () => {
    map.current?.dispose();
  };
}
}, [apikey, coordinates]);

useEffect(() => {
if (marker.current) {
// Update the marker position if coordinates change
marker.current.setGeometry(new H.geo.Point(coordinates.lng, coordinates.lat));
// Also update the map center if the coordinates change
map.current?.setCenter({ lat: coordinates.lat, lng: coordinates.lng });
}
}, [coordinates]);

return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default Map;