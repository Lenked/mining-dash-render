import { useState, useEffect, useRef } from 'react';
import { Navigation, AlertTriangle, Target, MapPin, Zap, Layers, Crosshair } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Données des sites miniers
const sites = [
  { id: 1, name: "Site Alpha", status: "alert", value: "45.2%", lat: -33.8688, lng: 151.2093, production: "4.2k t/day", efficiency: "94%" },
  { id: 2, name: "Site Beta",  status: "online", value: "78.5%", lat: -37.8136, lng: 144.9631, production: "3.8k t/day", efficiency: "95%" },
  { id: 3, name: "Site Gamma", status: "alert", value: "23.1%", lat: -34.9287, lng: 138.6007, production: "2.1k t/day", efficiency: "60%" },
  { id: 4, name: "Site Delta", status: "online", value: "91.3%", lat: -31.9505, lng: 115.8605, production: "5.3k t/day", efficiency: "107%" },
];

// Coordonnées pour le polygone Google Maps
const miningPolygonCoords = [
  { lat: -28.0, lng: 118.0 },
  { lat: -32.0, lng: 130.0 },
  { lat: -36.0, lng: 128.0 },
  { lat: -34.0, lng: 116.0 },
  { lat: -28.0, lng: 118.0 },
];

// Calcul du centre de la zone minière
const calculatePolygonCenter = (coords: typeof miningPolygonCoords) => {
  const bounds = coords.reduce((acc, coord) => {
    return {
      minLat: Math.min(acc.minLat, coord.lat),
      maxLat: Math.max(acc.maxLat, coord.lat),
      minLng: Math.min(acc.minLng, coord.lng),
      maxLng: Math.max(acc.maxLng, coord.lng),
    };
  }, {
    minLat: coords[0].lat,
    maxLat: coords[0].lat,
    minLng: coords[0].lng,
    maxLng: coords[0].lng
  });

  return {
    lat: (bounds.minLat + bounds.maxLat) / 2,
    lng: (bounds.minLng + bounds.maxLng) / 2
  };
};

// Centre de la zone minière
const polygonCenter = calculatePolygonCenter(miningPolygonCoords);

// Déclaration TypeScript pour Google Maps
declare global {
  interface Window {
    google: any;
  }
}

export function InteractiveMiningPolygonMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [polygon, setPolygon] = useState<google.maps.Polygon | null>(null);
  const [centerMarker, setCenterMarker] = useState<google.maps.Marker | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [selectedSite, setSelectedSite] = useState<number | null>(null);
  const [showPolygon, setShowPolygon] = useState(true);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const [isCenteredOnZone, setIsCenteredOnZone] = useState(true);

  // Statistiques
  const onlineCount = sites.filter(s => s.status === 'online').length;
  const alertCount = sites.filter(s => s.status === 'alert').length;
  const totalProduction = sites.reduce((sum, site) => {
    const value = parseFloat(site.production.split('k')[0]);
    return sum + value;
  }, 0);

  // Charger l'API Google Maps
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setIsGoogleMapsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyClTxih2WLTW8D15Z3X5fdoPncQZJA_p8o";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsGoogleMapsLoaded(true);
      script.onerror = () => console.error('Erreur de chargement Google Maps');
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  // Initialiser la carte en centrant sur le centre de la zone
  useEffect(() => {
    if (!isGoogleMapsLoaded || !mapRef.current || !window.google) return;

    const mapInstance = new google.maps.Map(mapRef.current, {
      center: polygonCenter, // Centre sur la zone minière
      zoom: 6, // Zoom plus proche pour voir la zone
      mapTypeId: 'satellite',
      mapTypeControl: true,
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT,
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
      },
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      streetViewControl: false,
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      }
    });

    setMap(mapInstance);
    setIsCenteredOnZone(true);
  }, [isGoogleMapsLoaded]);

  // Créer ou supprimer le polygone Google Maps et le marqueur central
  useEffect(() => {
    if (!map || !window.google) return;

    // Supprimer l'ancien polygone
    if (polygon) {
      polygon.setMap(null);
    }

    // Supprimer l'ancien marqueur central
    if (centerMarker) {
      centerMarker.setMap(null);
    }

    if (showPolygon) {
      // Créer le polygone Google Maps
      const newPolygon = new google.maps.Polygon({
        paths: miningPolygonCoords,
        strokeColor: '#22c55e',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#22c55e',
        fillOpacity: 0.2,
        geodesic: true,
        draggable: false,
        editable: false
      });

      newPolygon.setMap(map);
      setPolygon(newPolygon);

      // Créer un marqueur au centre de la zone
      const newCenterMarker = new google.maps.Marker({
        position: polygonCenter,
        map: map,
        title: 'Centre de la Zone Minière',
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#22c55e" fill-opacity="0.9" stroke="white" stroke-width="3"/>
              <circle cx="12" cy="12" r="4" fill="white"/>
              <path d="M12 4V20" stroke="white" stroke-width="2" stroke-linecap="round"/>
              <path d="M4 12H20" stroke="white" stroke-width="2" stroke-linecap="round"/>
              <circle cx="12" cy="12" r="8" fill="none" stroke="white" stroke-width="1" stroke-dasharray="2,2"/>
            </svg>
          `)}`,
          scaledSize: new google.maps.Size(50, 50),
          anchor: new google.maps.Point(25, 25)
        },
        animation: google.maps.Animation.DROP,
        zIndex: 1000
      });

      setCenterMarker(newCenterMarker);

      // InfoWindow pour le centre de la zone
      const centerInfoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; min-width: 250px; font-family: Arial, sans-serif;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <div style="width: 24px; height: 24px; border-radius: 50%; background: #22c55e; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-weight: bold; font-size: 14px;">⛏️</span>
              </div>
              <h3 style="margin: 0; font-size: 16px; font-weight: bold; color: #1f2937;">Centre de la Zone Minière</h3>
            </div>
            <div style="background: #d1fae5; padding: 8px 12px; border-radius: 6px; margin-bottom: 10px;">
              <p style="margin: 0; font-size: 14px; color: #065f46; font-weight: bold;">
                🌍 Point Central de la Concession
              </p>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px;">
              <div>
                <p style="margin: 0; font-size: 11px; color: #6b7280;">Coordonnées</p>
                <p style="margin: 0; font-size: 13px; font-weight: bold; color: #1f2937;">
                  ${polygonCenter.lat.toFixed(4)}°, ${polygonCenter.lng.toFixed(4)}°
                </p>
              </div>
              <div>
                <p style="margin: 0; font-size: 11px; color: #6b7280;">Altitude</p>
                <p style="margin: 0; font-size: 13px; font-weight: bold; color: #1f2937;">~450m</p>
              </div>
            </div>
            <div style="background: #f3f4f6; padding: 8px; border-radius: 4px;">
              <p style="margin: 0; font-size: 12px; color: #4b5563;">
                <strong>Rôle :</strong> Point de référence principal pour toutes les opérations minières dans la zone.
              </p>
            </div>
          </div>
        `
      });

      // Ouvrir automatiquement l'infoWindow au démarrage
      setTimeout(() => {
        centerInfoWindow.open(map, newCenterMarker);
      }, 1000);

      newCenterMarker.addListener('click', () => {
        centerInfoWindow.open(map, newCenterMarker);
        // Recentrer et zoomer sur le point central
        map.setCenter(polygonCenter);
        map.setZoom(8);
        setIsCenteredOnZone(true);
      });

      // InfoWindow pour le polygone
      const polygonInfoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; min-width: 220px;">
            <h3 style="margin: 0 0 8px 0; color: #059669; font-size: 14px; font-weight: bold;">
              🏭 Zone Minière Principale
            </h3>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #4b5563;">
              <strong>Superficie:</strong> 125,000 km²
            </p>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #4b5563;">
              <strong>Réserves:</strong> 850M tonnes
            </p>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #4b5563;">
              <strong>Périmètre:</strong> ~1,200 km
            </p>
            <p style="margin: 0; font-size: 12px; color: #4b5563;">
              <strong>Durée:</strong> 25+ ans
            </p>
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 11px; color: #9ca3af;">
                <strong>📌 Centre :</strong> ${polygonCenter.lat.toFixed(4)}°, ${polygonCenter.lng.toFixed(4)}°
              </p>
            </div>
          </div>
        `
      });

      newPolygon.addListener('click', (event: google.maps.PolyMouseEvent) => {
        polygonInfoWindow.setPosition(event.latLng);
        polygonInfoWindow.open(map);
      });
    } else {
      setPolygon(null);
      if (centerMarker) {
        centerMarker.setMap(null);
        setCenterMarker(null);
      }
    }

    return () => {
      if (polygon) polygon.setMap(null);
      if (centerMarker) centerMarker.setMap(null);
    };
  }, [map, showPolygon]);

  // Ajouter les marqueurs Google Maps
  useEffect(() => {
    if (!map || !window.google) return;

    // Supprimer les anciens marqueurs
    markers.forEach(marker => marker.setMap(null));

    const newMarkers: google.maps.Marker[] = [];

    sites.forEach(site => {
      const marker = new google.maps.Marker({
        position: { lat: site.lat, lng: site.lng },
        map: map,
        title: site.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: site.status === 'alert' ? '#ef4444' : '#3b82f6',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: 10
        },
        label: {
          text: site.name.charAt(0),
          color: 'white',
          fontSize: '10px',
          fontWeight: 'bold'
        }
      });

      const infoContent = `
        <div style="padding: 12px; min-width: 200px;">
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: ${site.status === 'alert' ? '#ef4444' : '#3b82f6'}; display: flex; align-items: center; justify-content: center; margin-right: 8px;">
              <span style="color: white; font-weight: bold; font-size: 12px;">${site.name.charAt(0)}</span>
            </div>
            <h3 style="margin: 0; font-size: 14px; font-weight: bold; color: #1f2937;">${site.name}</h3>
          </div>
          <div style="background: ${site.status === 'alert' ? '#fee2e2' : '#dbeafe'}; padding: 6px 8px; border-radius: 4px; margin-bottom: 8px;">
            <span style="color: ${site.status === 'alert' ? '#dc2626' : '#2563eb'}; font-size: 11px; font-weight: bold;">
              ${site.status === 'alert' ? '⚠️ EN ALERTE' : '✅ EN LIGNE'}
            </span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
            <div>
              <p style="margin: 0; font-size: 10px; color: #6b7280;">Production</p>
              <p style="margin: 0; font-size: 12px; font-weight: bold; color: #1f2937;">${site.production}</p>
            </div>
            <div>
              <p style="margin: 0; font-size: 10px; color: #6b7280;">Efficacité</p>
              <p style="margin: 0; font-size: 12px; font-weight: bold; color: ${parseFloat(site.efficiency) > 90 ? '#059669' : '#d97706'};">${site.efficiency}</p>
            </div>
          </div>
          ${site.id === 4 ? '<div style="background: #d1fae5; padding: 4px 8px; border-radius: 4px; border: 1px solid #a7f3d0; text-align: center; font-size: 11px; color: #065f46;">📍 Dans la zone minière</div>' : ''}
        </div>
      `;

      const infoWindow = new google.maps.InfoWindow({
        content: infoContent
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
        setSelectedSite(site.id);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  }, [map]);

  // Fonction pour centrer sur la zone minière
  const centerOnZone = () => {
    if (map) {
      map.panTo(polygonCenter);
      map.setZoom(7);
      setIsCenteredOnZone(true);
      
      // Ouvrir l'infoWindow du marqueur central si présent
      if (centerMarker) {
        setTimeout(() => {
          const infoWindow = new google.maps.InfoWindow({
            content: `<div style="padding: 8px; font-size: 14px; font-weight: bold; color: #065f46;">🎯 Centré sur la zone minière</div>`
          });
          infoWindow.setPosition(polygonCenter);
          infoWindow.open(map);
          setTimeout(() => infoWindow.close(), 2000);
        }, 500);
      }
    }
  };

  const handleResetView = () => {
    if (map) {
      map.setCenter(polygonCenter);
      map.setZoom(6);
      setIsCenteredOnZone(true);
    }
  };

  const handleZoomIn = () => {
    if (map) {
      map.setZoom(map.getZoom()! + 1);
    }
  };

  const handleZoomOut = () => {
    if (map) {
      map.setZoom(map.getZoom()! - 1);
    }
  };

  return (
    <div className="relative h-full w-full min-h-[500px] rounded-xl overflow-hidden border border-gray-300 shadow-xl">
      {/* Conteneur Google Maps */}
      <div 
        ref={mapRef} 
        className="absolute inset-0"
        style={{ minHeight: '500px' }}
      />

      {/* Overlay de chargement */}
      {!isGoogleMapsLoaded && (
        <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center rounded-xl z-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-white text-lg font-semibold">Chargement de Google Maps...</p>
          </div>
        </div>
      )}

      {/* Panneau de contrôle amélioré */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-xl p-4 z-10">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Navigation</h3>
            <div className="flex flex-col gap-2">
              <Button
                size="sm"
                variant={isCenteredOnZone ? "default" : "outline"}
                onClick={centerOnZone}
                className={`w-full justify-start ${isCenteredOnZone ? 'bg-green-600 hover:bg-green-700' : ''}`}
              >
                <Crosshair className="w-3 h-3 mr-2" />
                {isCenteredOnZone ? '✅ Sur la zone' : 'Centrer sur zone'}
              </Button>
              
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleZoomIn}
                  className="flex-1"
                >
                  <Navigation className="w-3 h-3 rotate-45" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleZoomOut}
                  className="flex-1"
                >
                  <Navigation className="w-3 h-3 rotate-[225deg]" />
                </Button>
              </div>
              
              <Button
                size="sm"
                variant="outline"
                onClick={handleResetView}
                className="w-full justify-start"
              >
                <Navigation className="w-3 h-3 mr-2" />
                Vue initiale
              </Button>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Zone minière</span>
              <button
                onClick={() => setShowPolygon(!showPolygon)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showPolygon ? 'bg-green-600' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showPolygon ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <p className="text-xs text-gray-500">
              {showPolygon ? 'Zone et centre visibles' : 'Zone masquée'}
            </p>
          </div>

          {/* Coordonnées du centre */}
          {showPolygon && (
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-1">Centre de la zone</p>
              <div className="bg-gray-50 p-2 rounded text-xs">
                <p className="text-gray-600 truncate">
                  {polygonCenter.lat.toFixed(4)}°, {polygonCenter.lng.toFixed(4)}°
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Statistiques */}
      <div className="absolute top-4 right-4 flex flex-col gap-3 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-xl p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Statistiques</h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600">Sites actifs</span>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  {onlineCount}/{sites.length}
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-green-600 h-1.5 rounded-full" 
                  style={{ width: `${(onlineCount/sites.length)*100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600">Production</span>
                <span className="text-sm font-semibold">{totalProduction.toFixed(1)}k t/j</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-blue-600 h-1.5 rounded-full" 
                  style={{ width: '85%' }}
                ></div>
              </div>
            </div>

            {alertCount > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="text-xs font-medium text-red-700">{alertCount} alerte(s)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Indicateur de centre de zone */}
        {showPolygon && (
          <div className="bg-green-600/90 backdrop-blur-sm rounded-xl border border-green-700 shadow-xl p-3">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-green-500/20 rounded-lg">
                <Crosshair className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Centre de Zone</p>
                <p className="text-[10px] text-green-100">Point de référence</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Légende en bas */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-xl p-3 z-10 max-w-xs">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs text-gray-600">Site normal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 opacity-70"></div>
              <span className="text-xs text-gray-600">Centre zone</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs text-gray-600">Site alerte</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-green-500"></div>
              <span className="text-xs text-gray-600">Zone minière</span>
            </div>
          </div>
        </div>
      </div>

      {/* Panneau de détail du site */}
      {selectedSite && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-2xl max-w-sm w-full z-20">
          <div className="relative">
            <Button
              size="sm"
              variant="ghost"
              className="absolute -top-2 -right-2"
              onClick={() => setSelectedSite(null)}
            >
              ✕
            </Button>
            
            {sites.filter(s => s.id === selectedSite).map(site => (
              <div key={site.id} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${site.status === 'alert' ? 'bg-red-100' : 'bg-green-100'}`}>
                    <MapPin className={`w-6 h-6 ${site.status === 'alert' ? 'text-red-600' : 'text-green-600'}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{site.name}</h3>
                    <p className="text-sm text-gray-600">Coordonnées: {site.lat.toFixed(4)}, {site.lng.toFixed(4)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 rounded-lg ${site.status === 'alert' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'} border`}>
                    <p className="text-xs text-gray-500">Statut</p>
                    <p className={`text-lg font-semibold ${site.status === 'alert' ? 'text-red-700' : 'text-green-700'}`}>
                      {site.status === 'alert' ? '⚠️ Alerte' : '✅ En ligne'}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-xs text-gray-500">Efficacité</p>
                    <p className="text-lg font-semibold text-blue-700">{site.efficiency}</p>
                  </div>
                  <div className="col-span-2 p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <p className="text-xs text-gray-500">Production journalière</p>
                    <p className="text-lg font-semibold text-gray-800">{site.production}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Button
                    onClick={centerOnZone}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Crosshair className="w-4 h-4 mr-2" />
                    Recentrer sur la zone
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}