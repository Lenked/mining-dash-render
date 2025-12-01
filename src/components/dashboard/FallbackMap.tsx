import { useState, useEffect } from 'react';
import { Navigation, AlertTriangle, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Site data with coordinates
const sites = [
  { id: 1, name: "Site Alpha", status: "alert", value: "45.2%", lat: 0.6, lng: 0.2, production: "4.2k t/day", efficiency: "94%" }, // Positioned in SVG coordinates
  { id: 2, name: "Site Beta",  status: "online", value: "78.5%", lat: 0.3, lng: 0.5, production: "3.8k t/day", efficiency: "95%" }, // Melbourne equivalent
  { id: 3, name: "Site Gamma", status: "alert", value: "23.1%", lat: 0.5, lng: 0.3, production: "2.1k t/day", efficiency: "60%" }, // Adelaide equivalent
  { id: 4, name: "Site Delta", status: "online", value: "91.3%", lat: 0.7, lng: 0.1, production: "5.3k t/day", efficiency: "107%" }, // Perth equivalent
];

interface FallbackMapProps {
  sites?: typeof sites;
}

export function FallbackMap({ sites: customSites }: FallbackMapProps = {}) {
  const [selectedSite, setSelectedSite] = useState<number | null>(null);
  const displaySites = customSites || sites;
  
  // Calculate stats
  const onlineCount = displaySites.filter(s => s.status === 'online').length;
  const alertCount = displaySites.filter(s => s.status === 'alert').length;
  const totalProduction = displaySites.reduce((sum, site) => {
    const value = parseFloat(site.production.split('k')[0]);
    return sum + value;
  }, 0);

  return (
    <div className="relative h-full min-h-[400px] bg-gradient-to-br from-blue-300/20 via-green-200/20 to-amber-100/30 rounded-lg overflow-hidden border-2 border-panel-border/50 shadow-elevated">
      {/* SVG Map Background */}
      <div className="w-full h-full relative overflow-hidden">
        <svg 
          viewBox="0 0 800 600" 
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background pattern */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(100,100,100,0.1)" strokeWidth="1"/>
            </pattern>
            <radialGradient id="siteGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
              <stop offset="100%" stopColor="rgba(200, 200, 200, 0.2)" />
            </radialGradient>
          </defs>
          
          {/* Map background */}
          <rect width="800" height="600" fill="url(#grid)" />
          
          {/* Terrain features - Mining areas */}
          <circle cx="200" cy="250" r="80" fill="rgba(139, 69, 19, 0.2)" stroke="rgba(139, 69, 19, 0.3)" strokeWidth="2" />
          <circle cx="400" cy="350" r="100" fill="rgba(139, 69, 19, 0.2)" stroke="rgba(139, 69, 19, 0.3)" strokeWidth="2" />
          <circle cx="600" cy="150" r="70" fill="rgba(139, 69, 19, 0.2)" stroke="rgba(139, 69, 19, 0.3)" strokeWidth="2" />
          
          {/* Roads/paths between sites */}
          <path 
            d="M 160 360 Q 250 300 320 340 Q 400 360 520 280 Q 620 220 680 180" 
            fill="none" 
            stroke="rgba(100, 100, 100, 0.3)" 
            strokeWidth="2" 
            strokeDasharray="5,5" 
          />
          
          {/* Site markers */}
          {displaySites.map((site, index) => {
            const x = site.lng * 800; // Convert lat/lng to SVG coordinates
            const y = (1 - site.lat) * 600; // Invert lat for SVG coordinate system
            
            return (
              <g 
                key={site.id}
                onClick={() => setSelectedSite(selectedSite === site.id ? null : site.id)}
                className="cursor-pointer hover:scale-125 transition-transform duration-200"
              >
                {/* Site glow effect */}
                <circle
                  cx={x}
                  cy={y}
                  r={selectedSite === site.id ? 25 : 20}
                  fill={site.status === "alert" ? "rgba(239, 68, 68, 0.3)" : "rgba(59, 130, 246, 0.3)"}
                  className="transition-all duration-300"
                />
                
                {/* Site marker */}
                <circle
                  cx={x}
                  cy={y}
                  r="12"
                  fill={site.status === "alert" ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
                  stroke="white"
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
                
                {/* Site label */}
                <text
                  x={x}
                  y={y - 20}
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                  className="drop-shadow-sm"
                >
                  {site.name}
                </text>
                
                {/* Site abbreviation */}
                <text
                  x={x}
                  y={y + 4}
                  textAnchor="middle"
                  fill="white"
                  fontSize="8"
                  fontWeight="bold"
                  className="drop-shadow-sm"
                >
                  {site.name.charAt(0)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Overlay information panels */}
      <div className="absolute top-4 left-4 bg-secondary/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-panel-border shadow-card">
        <p className="text-xs text-muted-foreground mb-1">Active Sites</p>
        <p className="text-2xl font-bold text-primary">{onlineCount} / {displaySites.length}</p>
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Badge className="bg-accent/90 text-accent-foreground shadow-card backdrop-blur-sm">
          <Navigation className="w-3 h-3 mr-1" />
          Mining Map
        </Badge>
        <Badge className="bg-primary/90 text-primary-foreground shadow-card backdrop-blur-sm">
          <Target className="w-3 h-3 mr-1" />
          Interactive
        </Badge>
      </div>

      <div className="absolute bottom-4 right-4 bg-secondary/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-panel-border shadow-card">
        <p className="text-xs text-muted-foreground mb-1">Total Production</p>
        <p className="text-lg font-bold text-foreground">{totalProduction.toFixed(1)}k t/day</p>
      </div>

      <div className="absolute bottom-4 left-4 bg-destructive/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-destructive shadow-card">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-destructive-foreground" />
          <p className="text-sm text-destructive-foreground font-semibold">{alertCount} Alerts Active</p>
        </div>
      </div>

      {/* Site info panel when selected */}
      {selectedSite && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-panel-bg/95 backdrop-blur-sm p-4 rounded-lg border border-panel-border shadow-elevated max-w-xs w-full">
          {displaySites.filter(s => s.id === selectedSite).map(site => (
            <div key={site.id} className="text-center">
              <h3 className="text-lg font-bold text-foreground mb-2">{site.name}</h3>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-secondary p-2 rounded">
                  <p className="text-xs text-muted-foreground">Production</p>
                  <p className="font-semibold">{site.production}</p>
                </div>
                <div className="bg-secondary p-2 rounded">
                  <p className="text-xs text-muted-foreground">Efficiency</p>
                  <p className="font-semibold">{site.efficiency}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedSite(null)}
                className="text-sm text-primary hover:underline"
              >
                Close
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}