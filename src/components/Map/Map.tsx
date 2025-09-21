"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";

const center = [9.0579, 8.6753]; // Abuja, Nigeria as neutral center for multilingual

interface MapComponentProps {
  searchQuery?: string;
}

const MapComponent = ({ searchQuery }: MapComponentProps) => {
  const [mapImports, setMapImports] = useState<any>(null);
  const mapKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || "";

  useEffect(() => {
    if (searchQuery) {
      console.log("Searching for:", searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    // Dynamically import leaflet and fix icons
    Promise.all([
      import("leaflet"),
      import("react-leaflet")
    ]).then(([LModule, RLModule]) => {
      const L = (LModule as any).default || (LModule as any); // handle ESM/CJS default interop
      // Fix default markers in Leaflet
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
      setMapImports({
        ...RLModule,
        L
      });
    }).catch((error) => {
      console.error("Failed to load map:", error);
    });
  }, []);

  if (!mapImports) {
    return (
      <motion.div
        className="h-screen w-full flex items-center justify-center bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-lg">Loading map...</div>
      </motion.div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = mapImports;

  return (
    <motion.div
      className="h-screen w-full bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MapContainer
        center={center}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}@2x.png?key=${mapKey}`}
        />
        <Marker position={center}>
          <Popup>Your location</Popup>
        </Marker>
      </MapContainer>
    </motion.div>
  );
};

export default MapComponent;