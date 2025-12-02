import { useState, useEffect, useRef, useCallback } from 'react';
import { Navigation, AlertTriangle, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Site data with coordinates
const sites = [
  { id: 1, name: "Site Alpha", status: "alert", value: "45.2%", lat: -33.8688, lng: 151.2093, production: "4.2k t/day", efficiency: "94%" },
  { id: 2, name: "Site Beta",  status: "online", value: "78.5%", lat: -37.8136, lng: 144.9631, production: "3.8k t/day", efficiency: "95%" },
  { id: 3, name: "Site Gamma", status: "alert", value: "23.1%", lat: -34.9287, lng: 138.6007, production: "2.1k t/day", efficiency: "60%" },
  { id: 4, name: "Site Delta", status: "online", value: "91.3%", lat: -31.9505, lng: 115.8605, production: "5.3k t/day", efficiency: "107%" },
];

export function StableMiningMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const initializeMap = useCallback(async () => {
    try {
      let attempts = 0;
      const maxAttempts = 10;

      while (attempts < maxAttempts && (!mapRef.current || !mapRef.current.offsetWidth || !mapRef.current.offsetHeight)) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }

      if (!mapRef.current || !mapRef.current.offsetWidth || !mapRef.current.offsetHeight) {
        throw new Error("Map container is still not available after waiting");
      }

      const { Loader } = await import('@googlemaps/js-api-loader');

      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyClTxih2WLTW8D15Z3X5fdoPncQZJA_p8o",
        version: "weekly",
      });

      await (loader as any).load();

      const avgLat = sites.reduce((sum, site) => sum + site.lat, 0) / sites.length;
      const avgLng = sites.reduce((sum, site) => sum + site.lng, 0) / sites.length;

      const map = new google.maps.Map(mapRef.current!, {
        center: { lat: avgLat, lng: avgLng },
        zoom: 4,
        mapTypeId: "satellite",
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        gestureHandling: "auto",
        styles: [
          {
            featureType: "all",
            elementType: "labels",
            stylers: [{ visibility: "on" }]
          },
          {
            featureType: "landscape",
            elementType: "geometry.fill",
            stylers: [{ color: "#e0e0e0" }]
          }
        ]
      });

      mapInstanceRef.current = map;

      sites.forEach(site => {
        const marker = new google.maps.Marker({
          map: map,
          position: { lat: site.lat, lng: site.lng },
          title: site.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: site.status === 'alert' ? '#ef4444' : '#3b82f6',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          }
        });

        marker.addListener('click', () => {
          console.log(`Clicked on ${site.name}`);
          map.panTo({ lat: site.lat, lng: site.lng });
          map.setZoom(8);
        });
      });

      setMapLoaded(true);
      setIsLoading(false);
    } catch (err) {
      console.error("Error initializing map:", err);
      setError("Failed to load Google Maps. Please check your API key or internet connection.");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initTimer = setTimeout(() => {
      if (isMounted && !mapLoaded && !error) {
        initializeMap();
      }
    }, 100);

    return () => {
      clearTimeout(initTimer);
      isMounted = false;
    };
  }, [mapLoaded, error, initializeMap]);

  useEffect(() => {
    if (mapLoaded && mapInstanceRef.current && mapRef.current) {
      const handleResize = () => {
        if (mapInstanceRef.current) {
          setTimeout(() => {
            google.maps.event.trigger(mapInstanceRef.current!, 'resize');
            const avgLat = sites.reduce((sum, site) => sum + site.lat, 0) / sites.length;
            const avgLng = sites.reduce((sum, site) => sum + site.lng, 0) / sites.length;
            mapInstanceRef.current?.setCenter({ lat: avgLat, lng: avgLng });
          }, 100);
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [mapLoaded]);

  if (error) {
    return (
      <div className="relative h-full min-h-[400px] bg-gradient-to-br from-red-100 to-red-200 rounded-lg overflow-hidden border-2 border-red-300 flex items-center justify-center">
        <div className="text-center p-6">
          <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-red-800 mb-2">Map Loading Error</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <p className="text-sm text-red-600 mb-4">Please make sure you have a valid Google Maps API key in your .env file</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="relative h-full min-h-[400px] bg-gradient-to-br from-blue-300/30 via-green-200/30 to-yellow-100/30 rounded-lg overflow-hidden border-2 border-panel-border/50 shadow-elevated flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground font-medium">Loading interactive map...</p>
          <p className="text-muted-foreground text-sm mt-2">Preparing mining sites overview</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[400px]">
      <div
        ref={mapRef}
        className="w-full h-full rounded-lg overflow-hidden border-2 border-panel-border/50 shadow-elevated"
        style={{ height: '100%', width: '100%' }}
      />

      <div className="absolute top-4 left-4 bg-secondary/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-panel-border shadow-card">
        <p className="text-xs text-muted-foreground mb-1">Active Sites</p>
        <p className="text-2xl font-bold text-primary">{sites.filter(s => s.status === 'online').length} / {sites.length}</p>
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Badge className="bg-accent/90 text-accent-foreground shadow-card backdrop-blur-sm">
          <Navigation className="w-3 h-3 mr-1" />
          Satellite View
        </Badge>
        <Badge className="bg-primary/90 text-primary-foreground shadow-card backdrop-blur-sm">
          <Target className="w-3 h-3 mr-1" />
          Mining Sites
        </Badge>
      </div>

      <div className="absolute bottom-4 right-4 bg-secondary/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-panel-border shadow-card">
        <p className="text-xs text-muted-foreground mb-1">Total Production</p>
        <p className="text-lg font-bold text-foreground">15.4k t/day</p>
      </div>

      <div className="absolute bottom-4 left-4 bg-destructive/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-destructive shadow-card">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-destructive-foreground" />
          <p className="text-sm text-destructive-foreground font-semibold">2 Alerts Active</p>
        </div>
      </div>
    </div>
  );
}
