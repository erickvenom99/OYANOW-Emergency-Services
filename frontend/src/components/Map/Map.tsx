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
      map.current = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
        zoom: 10,
        center: { lat: 52.5309, lng: 13.3847 },
      });

      const mapEvents = new H.mapevents.MapEvents(map.current);
      const behavior = new H.mapevents.Behavior(mapEvents);
      const ui = H.ui.UI.createDefault(map.current, defaultLayers);

      //Create a marker for the service provider
      marker.current = new H.map.Marker(coordinates);
      map.current.addObject(marker.current);

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
      marker.current.setGeometry(
        new H.geo.Point(coordinates.lng, coordinates.lat)
      );
    }
  }, [coordinates]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default Map;
