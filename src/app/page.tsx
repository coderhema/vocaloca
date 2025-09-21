"use client";

import VoiceButton from "@/components/VoiceButton";
import SearchBar from "@/components/SearchBar";
import SuggestionsDrawer from "@/components/SuggestionsDrawer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import MapComponent to disable SSR for Leaflet
const MapComponent = dynamic(
  () => import("@/components/Map/Map"),
  { ssr: false }
);

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Lagos");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentLocation(query || "Lagos");
    setShowDrawer(true);
  };

  return (
    <main className="relative min-h-screen bg-white">
      <MapComponent searchQuery={searchQuery} />
      <div className="pointer-events-none fixed inset-0 z-[1100]">
        <SearchBar onSearch={handleSearch} />
        <VoiceButton onText={(text) => setSearchQuery(text)} />
        <LanguageSwitcher />
      </div>
      <SuggestionsDrawer 
        isOpen={showDrawer} 
        onClose={() => setShowDrawer(false)} 
        location={searchQuery || currentLocation} 
      />
    </main>
  );
}