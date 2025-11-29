import { MapPin, Navigation, Radio, AlertTriangle, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function MiningMap() {
  const markers = [
    { id: 1, top: "20%", left: "15%", status: "alert", label: "Site Alpha", value: "45.2%" },
    { id: 2, top: "35%", left: "25%", status: "online", label: "Site Beta", value: "78.5%" },
    { id: 3, top: "45%", right: "30%", status: "alert", label: "Site Gamma", value: "23.1%" },
    { id: 4, bottom: "25%", left: "40%", status: "online", label: "Site Delta", value: "91.3%" },
  ];

  return (
    <div className="relative h-full min-h-[400px] bg-gradient-to-br from-blue-300/30 via-green-200/30 to-yellow-100/30 rounded-lg overflow-hidden border-2 border-panel-border/50 shadow-elevated">
      {/* Grid overlay for realistic map feel */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Map markers with enhanced styling */}
      {markers.map((marker) => (
        <div
          key={marker.id}
          className="absolute group cursor-pointer"
          style={{ 
            top: marker.top, 
            left: marker.left, 
            right: marker.right, 
            bottom: marker.bottom 
          }}
        >
          <div className="relative">
            <MapPin 
              className={`w-8 h-8 ${
                marker.status === "alert" 
                  ? "text-destructive fill-destructive" 
                  : "text-success fill-success"
              } animate-pulse drop-shadow-lg transition-transform group-hover:scale-125`}
            />
            <Radio className={`absolute top-0 left-0 w-8 h-8 ${
              marker.status === "alert" ? "text-destructive" : "text-success"
            } animate-ping`} />
          </div>
          {/* Marker info tooltip */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-panel-bg/95 backdrop-blur-sm px-3 py-2 rounded-lg border border-panel-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-elevated">
            <p className="text-xs font-bold text-foreground">{marker.label}</p>
            <p className="text-xs text-muted-foreground">Efficiency: {marker.value}</p>
          </div>
        </div>
      ))}

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
