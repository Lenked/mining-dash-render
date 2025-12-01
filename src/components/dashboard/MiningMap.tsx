import { useState, useEffect } from 'react';
import { Navigation, AlertTriangle, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Site data with coordinates
const sites = [
  { id: 1, name: "Site Alpha", status: "alert", value: "45.2%", lat: -33.8688, lng: 151.2093 }, // Sydney
  { id: 2, name: "Site Beta",  status: "online", value: "78.5%", lat: -37.8136, lng: 144.9631 }, // Melbourne
  { id: 3, name: "Site Gamma", status: "alert", value: "23.1%", lat: -34.9287, lng: 138.6007 }, // Adelaide
  { id: 4, name: "Site Delta", status: "online", value: "91.3%", lat: -31.9505, lng: 115.8605 }, // Perth
];

export function MiningMap() {
  const [mapError, setMapError] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Create the Google Static Maps URL with markers for each site
  const createStaticMapUrl = () => {
    const apiKey =  "AIzaSyClTxih2WLTW8D15Z3X5fdoPncQZJA_p8o";
    
    // Calculate center based on average of all sites
    const avgLat = sites.reduce((sum, site) => sum + site.lat, 0) / sites.length;
    const avgLng = sites.reduce((sum, site) => sum + site.lng, 0) / sites.length;
    
    // Create markers for each site with different colors based on status
    const markers = sites.map(site => 
      `markers=color:${site.status === "alert" ? "red" : "green"}|size:mid|${site.lat},${site.lng}|${site.name}`
    ).join('&');
    
    // Create the static map URL
    const size = "600x400"; // Will be scaled to fit container
    const zoom = "4";
    
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${avgLat},${avgLng}&zoom=${zoom}&size=${size}&maptype=roadmap&${markers}&key=${apiKey}`;
    
    return mapUrl;
  };

  const handleImageLoad = () => {
    setMapLoaded(true);
  };

  const handleImageError = () => {
    setMapError(true);
  };

  if (mapError) {
    return (
      <div className="relative h-full min-h-[400px] bg-gradient-to-br from-blue-300/30 via-green-200/30 to-yellow-100/30 rounded-lg overflow-hidden border-2 border-panel-border/50 shadow-elevated flex items-center justify-center">
        <div className="text-center p-6">
          <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-3" />
          <h3 className="text-lg font-bold text-foreground mb-2">Google Maps Failed to Load</h3>
          <p className="text-muted-foreground mb-4">
            There was an issue displaying the interactive map. Please check your API key or network connection.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Retry Loading
          </button>
        </div>

        {/* Enhanced badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Badge className="bg-accent/90 text-accent-foreground shadow-card backdrop-blur-sm">
            <Navigation className="w-3 h-3 mr-1" />
            Auto Center
          </Badge>
          <Badge className="bg-primary/90 text-primary-foreground shadow-card backdrop-blur-sm">
            <Target className="w-3 h-3 mr-1" />
            Selected User
          </Badge>
        </div>

        <div className="absolute bottom-4 right-4 bg-secondary/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-panel-border shadow-card">
          <p className="text-xs text-muted-foreground mb-1">Total Read Columns</p>
          <p className="text-lg font-bold text-foreground">15,410</p>
        </div>

        <div className="absolute bottom-4 left-4 bg-destructive/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-destructive shadow-card">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive-foreground" />
            <p className="text-sm text-destructive-foreground font-semibold">Asia Order Alert</p>
          </div>
        </div>

        {/* Top left info */}
        <div className="absolute top-4 left-4 bg-secondary/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-panel-border shadow-card">
          <p className="text-xs text-muted-foreground mb-1">Active Sites</p>
          <p className="text-2xl font-bold text-primary">4</p>
        </div>
      </div>
    );
  }

  if (!mapLoaded) {
    return (
      <div className="relative h-full min-h-[400px] bg-gradient-to-br from-blue-300/30 via-green-200/30 to-yellow-100/30 rounded-lg overflow-hidden border-2 border-panel-border/50 shadow-elevated flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground font-medium">Loading map...</p>
        </div>

        {/* Enhanced badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Badge className="bg-accent/90 text-accent-foreground shadow-card backdrop-blur-sm">
            <Navigation className="w-3 h-3 mr-1" />
            Auto Center
          </Badge>
          <Badge className="bg-primary/90 text-primary-foreground shadow-card backdrop-blur-sm">
            <Target className="w-3 h-3 mr-1" />
            Selected User
          </Badge>
        </div>

        <div className="absolute bottom-4 right-4 bg-secondary/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-panel-border shadow-card">
          <p className="text-xs text-muted-foreground mb-1">Total Read Columns</p>
          <p className="text-lg font-bold text-foreground">15,410</p>
        </div>

        <div className="absolute bottom-4 left-4 bg-destructive/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-destructive shadow-card">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive-foreground" />
            <p className="text-sm text-destructive-foreground font-semibold">Asia Order Alert</p>
          </div>
        </div>

        {/* Top left info */}
        <div className="absolute top-4 left-4 bg-secondary/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-panel-border shadow-card">
          <p className="text-xs text-muted-foreground mb-1">Active Sites</p>
          <p className="text-2xl font-bold text-primary">4</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[400px] bg-gradient-to-br from-blue-300/30 via-green-200/30 to-yellow-100/30 rounded-lg overflow-hidden border-2 border-panel-border/50 shadow-elevated">
      <div className="w-full h-full rounded-lg overflow-hidden relative">
        <img
          src={createStaticMapUrl()}
          alt="Mining Sites Map"
          className="w-full h-full object-cover"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>

      {/* Enhanced badges */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Badge className="bg-accent/90 text-accent-foreground shadow-card backdrop-blur-sm">
          <Navigation className="w-3 h-3 mr-1" />
          Auto Center
        </Badge>
        <Badge className="bg-primary/90 text-primary-foreground shadow-card backdrop-blur-sm">
          <Target className="w-3 h-3 mr-1" />
          Selected User
        </Badge>
      </div>

      <div className="absolute bottom-4 right-4 bg-secondary/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-panel-border shadow-card">
        <p className="text-xs text-muted-foreground mb-1">Total Read Columns</p>
        <p className="text-lg font-bold text-foreground">15,410</p>
      </div>

      <div className="absolute bottom-4 left-4 bg-destructive/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-destructive shadow-card">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-destructive-foreground" />
          <p className="text-sm text-destructive-foreground font-semibold">Asia Order Alert</p>
        </div>
      </div>

      {/* Top left info */}
      <div className="absolute top-4 left-4 bg-secondary/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-panel-border shadow-card">
        <p className="text-xs text-muted-foreground mb-1">Active Sites</p>
        <p className="text-2xl font-bold text-primary">4</p>
      </div>
    </div>
  );
}