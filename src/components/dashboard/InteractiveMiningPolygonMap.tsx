import { useState, useEffect, useRef } from 'react';
import { Navigation, AlertTriangle, Target, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Loader } from '@googlemaps/js-api-loader';

// Données des zones avec des coordonnées pour les polygones
const zones = [
  {
    id: 1,
    name: "Zone A",
    status: "active",
    equipment: 12,
    area: "45 ha",
    coordinates: [
      { lat: -33.8700, lng: 151.2000 },
      { lat: -33.8705, lng: 151.2050 },
      { lat: -33.8650, lng: 151.2060 },
      { lat: -33.8645, lng: 151.2010 },
    ]
  },
  {
    id: 2,
    name: "Zone B",
    status: "active",
    equipment: 8,
    area: "32 ha",
    coordinates: [
      { lat: -33.8720, lng: 151.2100 },
      { lat: -33.8725, lng: 151.2150 },
      { lat: -33.8670, lng: 151.2160 },
      { lat: -33.8665, lng: 151.2110 },
    ]
  },
  {
    id: 3,
    name: "Zone C",
    status: "maintenance",
    equipment: 15,
    area: "67 ha",
    coordinates: [
      { lat: -33.8750, lng: 151.2200 },
      { lat: -33.8755, lng: 151.2250 },
      { lat: -33.8700, lng: 151.2260 },
      { lat: -33.8695, lng: 151.2210 },
    ]
  }
];

interface InteractiveMiningPolygonMapProps {
  selectedZone?: string | null;
}

// Composant de carte interactive avec Google Maps JavaScript API et polygones
export function InteractiveMiningPolygonMap({ selectedZone }: InteractiveMiningPolygonMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const polygonRef = useRef<google.maps.Polygon | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const initMap = async () => {
      try {
        // Charger l'API Google Maps
        const loader = new Loader({
          apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyClTxih2WLTW8D15Z3X5fdoPncQZJA_p8o",
          version: "weekly",
        });

        const google = await loader.load();

        // Créer la carte
        const map = new google.maps.Map(containerRef.current!, {
          center: { lat: -33.8688, lng: 151.2093 }, // Centre sur Sydney par défaut
          zoom: 12,
          mapTypeId: "satellite",
          disableDefaultUI: true,
          styles: [
            {
              featureType: 'all',
              elementType: 'labels',
              stylers: [{ visibility: 'on' }]
            },
            {
              featureType: 'administrative',
              elementType: 'geometry',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'landscape',
              elementType: 'geometry',
              stylers: [{ color: '#f0f0f0' }]
            },
            {
              featureType: 'poi',
              elementType: 'all',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{ color: '#ffffff' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#c5e3f6' }]
            }
          ]
        });

        mapRef.current = map;
        setMapLoaded(true);

        // Ajouter un contrôle de zoom
        const zoomControlDiv = document.createElement('div');
        zoomControlDiv.style.margin = '10px';
        new google.maps.ZoomControl(zoomControlDiv);
        map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv);

        // Si une zone est sélectionnée, dessiner son polygone
        if (selectedZone) {
          drawZonePolygon(map, selectedZone, google);
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la carte:', error);
        setLoadingError('Erreur lors du chargement de la carte');
      }
    };

    initMap();
  }, []);

  // Dessiner le polygone de la zone sélectionnée
  useEffect(() => {
    if (!mapLoaded || !selectedZone) return;

    const drawPolygon = async () => {
      // Charger l'API Google Maps si ce n'est pas déjà fait
      const loader = new Loader({
        apiKey: "AIzaSyClTxih2WLTW8D15Z3X5fdoPncQZJA_p8o",
        version: "weekly",
      });

      const google = await loader.load();
      if (mapRef.current) {
        drawZonePolygon(mapRef.current, selectedZone, google);
      }
    };

    drawPolygon();
  }, [selectedZone, mapLoaded]);

  const drawZonePolygon = (map: google.maps.Map, zoneName: string, google: any) => {
    // Supprimer le polygone précédent s'il existe
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
    }

    // Trouver les coordonnées de la zone
    const zone = zones.find(z => z.name === zoneName);
    if (!zone) return;

    // Créer le polygone
    const polygon = new google.maps.Polygon({
      paths: zone.coordinates,
      strokeColor: "#3b82f6", // blue-500
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#fbbf24", // yellow-400
      fillOpacity: 0.35,
    });

    polygon.setMap(map);
    polygonRef.current = polygon;

    // Ajuster la vue pour inclure le polygone
    const bounds = new google.maps.LatLngBounds();
    zone.coordinates.forEach(coord => {
      bounds.extend(new google.maps.LatLng(coord.lat, coord.lng));
    });
    map.fitBounds(bounds);
  };

  if (loadingError) {
    return (
      <div className="relative h-full w-full min-h-[400px] bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg overflow-hidden border-2 border-panel-border/50 shadow-elevated flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{loadingError}</p>
          <p className="text-sm text-gray-500 mt-2">Veuillez vérifier votre clé API Google Maps</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full min-h-[400px] bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg overflow-hidden border-2 border-panel-border/50 shadow-elevated"
    >
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mb-2"></div>
            <p className="text-muted-foreground">Chargement de la carte...</p>
          </div>
        </div>
      )}

      {/* Panneaux d'information superposés */}
      <div className="absolute top-4 left-4 bg-secondary/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-panel-border shadow-card z-10">
        <p className="text-xs text-muted-foreground mb-1">Zones Actives</p>
        <p className="text-2xl font-bold text-primary">{zones.filter(z => z.status === 'active').length} / {zones.length}</p>
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <Badge className="bg-accent/90 text-accent-foreground shadow-card backdrop-blur-sm">
          <Navigation className="w-3 h-3 mr-1" />
          Vue Satellite
        </Badge>
        <Badge className="bg-primary/90 text-primary-foreground shadow-card backdrop-blur-sm">
          <Target className="w-3 h-3 mr-1" />
          Zones Minieres
        </Badge>
      </div>

      <div className="absolute bottom-4 right-4 bg-secondary/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-panel-border shadow-card z-10">
        <p className="text-xs text-muted-foreground mb-1">Surface Totale</p>
        <p className="text-lg font-bold text-foreground">{zones.reduce((sum, zone) => sum + parseInt(zone.area.replace(' ha', '')), 0)} ha</p>
      </div>

      <div className="absolute bottom-4 left-4 bg-destructive/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-destructive shadow-card z-10">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-destructive-foreground" />
          <p className="text-sm text-destructive-foreground font-semibold">{zones.filter(z => z.status === 'maintenance').length} Maintenance</p>
        </div>
      </div>

      {/* Panneau d'information de la zone sélectionnée */}
      {selectedZone && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-panel-bg/95 backdrop-blur-sm p-4 rounded-lg border border-panel-border shadow-elevated max-w-xs w-full z-20">
          {zones.filter(z => z.name === selectedZone).map(zone => (
            <div key={zone.id} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">{zone.name}</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className={`p-3 rounded-lg ${zone.status === 'maintenance' ? 'bg-destructive/20 border-destructive/50' : 'bg-success/20 border-success/50'} border`}>
                  <p className="text-xs text-muted-foreground">Statut</p>
                  <p className={`font-semibold ${zone.status === 'maintenance' ? 'text-destructive' : 'text-success'}`}>
                    {zone.status === 'maintenance' ? 'Maintenance' : 'Active'}
                  </p>
                </div>
                <div className="bg-secondary p-3 rounded-lg border border-panel-border/50">
                  <p className="text-xs text-muted-foreground">Équipements</p>
                  <p className="font-semibold">{zone.equipment}</p>
                </div>
                <div className="bg-secondary p-3 rounded-lg border border-panel-border/50 col-span-2">
                  <p className="text-xs text-muted-foreground">Surface</p>
                  <p className="font-semibold">{zone.area}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}