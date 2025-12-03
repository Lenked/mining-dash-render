import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface VehicleMarker {
  id: string;
  lat: number;
  lng: number;
  status: "moving" | "offline" | "stopped";
  name: string;
}

const mockMarkers: VehicleMarker[] = [
  { id: "1", lat: 6.5244, lng: 3.3792, status: "moving", name: "LTMT001" },
  { id: "2", lat: 9.0765, lng: 7.3986, status: "offline", name: "LTMT002" },
  { id: "3", lat: 4.8156, lng: 7.0498, status: "stopped", name: "P43782" },
  { id: "4", lat: 3.8480, lng: 11.5021, status: "moving", name: "LTMT003" },
  { id: "5", lat: 5.9631, lng: 10.1591, status: "moving", name: "CH001" },
  { id: "6", lat: 6.1319, lng: 1.2225, status: "stopped", name: "LTMT004" },
  { id: "7", lat: 7.3697, lng: 12.3547, status: "moving", name: "LTMT005" },
  { id: "8", lat: 5.5557, lng: 9.2767, status: "offline", name: "P43783" },
];

export const FleetMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on Central Africa
    const map = L.map(mapRef.current).setView([6.0, 9.0], 6);
    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add markers
    mockMarkers.forEach((vehicle) => {
      const markerColor = 
        vehicle.status === "moving" ? "#22c55e" :
        vehicle.status === "offline" ? "#94a3b8" :
        "#ef4444";

      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            background-color: ${markerColor};
            width: 24px;
            height: 24px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          ">
            <div style="
              background-color: white;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            "></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 24],
      });

      const marker = L.marker([vehicle.lat, vehicle.lng], { icon: customIcon }).addTo(map);
      
      marker.bindPopup(`
        <div class="p-2">
          <strong class="text-base">${vehicle.name}</strong><br/>
          <span class="text-sm">Statut: ${
            vehicle.status === "moving" ? "En marche" :
            vehicle.status === "offline" ? "Hors ligne" :
            "Arrêté"
          }</span>
        </div>
      `);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border text-sm">
        <div className="font-medium mb-1">Rafraîchissement dans 1s</div>
        <button className="text-primary hover:underline text-xs">Rafraîchir</button>
      </div>
    </div>
  );
};
