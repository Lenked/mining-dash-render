import { useState, useEffect, useRef } from 'react';
import { Navigation, AlertTriangle, Target, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Données des sites miniers
const sites = [
  { id: 1, name: "Site Alpha", status: "alert", value: "45.2%", lat: -33.8688, lng: 151.2093, production: "4.2k t/day", efficiency: "94%" }, // Sydney
  { id: 2, name: "Site Beta",  status: "online", value: "78.5%", lat: -37.8136, lng: 144.9631, production: "3.8k t/day", efficiency: "95%" }, // Melbourne
  { id: 3, name: "Site Gamma", status: "alert", value: "23.1%", lat: -34.9287, lng: 138.6007, production: "2.1k t/day", efficiency: "60%" }, // Adelaide
  { id: 4, name: "Site Delta", status: "online", value: "91.3%", lat: -31.9505, lng: 115.8605, production: "5.3k t/day", efficiency: "107%" }, // Perth
];

// Composant de carte interactive avec Google Maps iframe et marqueurs superposés
export function InteractiveMiningPolygonMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [selectedSite, setSelectedSite] = useState<number | null>(null);

  // Calcul des coordonnées moyennes pour centrer la carte
  const avgLat = sites.reduce((sum, site) => sum + site.lat, 0) / sites.length;
  const avgLng = sites.reduce((sum, site) => sum + site.lng, 0) / sites.length;

  // Calcul des statistiques
  const onlineCount = sites.filter(s => s.status === 'online').length;
  const alertCount = sites.filter(s => s.status === 'alert').length;
  const totalProduction = sites.reduce((sum, site) => {
    const value = parseFloat(site.production.split('k')[0]);
    return sum + value;
  }, 0);

  // Pour la conversion des coordonnées en position sur la carte
  const projectToPixel = (lat: number, lng: number) => {
    // Approximation pour convertir les coordonnées géographiques en positions pourcentage
    // Basé sur une projection centrée sur l'Australie
    const latRange = 15; // Approximatif pour la zone australienne
    const lngRange = 35; // Approximatif pour la zone australienne

    const x = ((lng - (avgLng - lngRange/2)) / lngRange) * 100;
    const y = ((avgLat - lat + latRange/2) / latRange) * 100;

    // S'assurer que les coordonnées sont dans les limites
    return {
      x: Math.max(5, Math.min(95, x)), // Limite les bords pour meilleure visibilité
      y: Math.max(5, Math.min(95, y))
    };
  };

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Initial update
    updateSize();

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  const googleMapsUrl = `https://www.google.com/maps/embed/v1/view?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyClTxih2WLTW8D15Z3X5fdoPncQZJA_p8o"}&center=${avgLat},${avgLng}&zoom=4&maptype=satellite`;

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full min-h-[400px] bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg overflow-hidden border-2 border-panel-border/50 shadow-elevated"
    >
      {/* Panneau d'iframe Google Maps qui remplit complètement la section */}
      <div className="absolute inset-0">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          style={{
            border: 0,
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0
          }}
          src={googleMapsUrl}
          allowFullScreen
          aria-hidden="false"
          tabIndex={0}
          title="Carte des Sites Miniers"
          className="rounded-lg"
        />
      </div>

      

      {/* Panneaux d'information superposés */}
      <div className="absolute top-4 left-4 bg-secondary/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-panel-border shadow-card z-10">
        <p className="text-xs text-muted-foreground mb-1">Sites Actifs</p>
        <p className="text-2xl font-bold text-primary">{onlineCount} / {sites.length}</p>
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <Badge className="bg-accent/90 text-accent-foreground shadow-card backdrop-blur-sm">
          <Navigation className="w-3 h-3 mr-1" />
          Vue Satellite
        </Badge>
        <Badge className="bg-primary/90 text-primary-foreground shadow-card backdrop-blur-sm">
          <Target className="w-3 h-3 mr-1" />
          Sites Miniers
        </Badge>
      </div>

      <div className="absolute bottom-4 right-4 bg-secondary/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-panel-border shadow-card z-10">
        <p className="text-xs text-muted-foreground mb-1">Production Totale</p>
        <p className="text-lg font-bold text-foreground">{totalProduction.toFixed(1)}k t/j</p>
      </div>

      <div className="absolute bottom-4 left-4 bg-destructive/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-destructive shadow-card z-10">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-destructive-foreground" />
          <p className="text-sm text-destructive-foreground font-semibold">{alertCount} Alertes</p>
        </div>
      </div>

      {/* Panneau d'information du site sélectionné */}
      {selectedSite && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-panel-bg/95 backdrop-blur-sm p-4 rounded-lg border border-panel-border shadow-elevated max-w-xs w-full z-20">
          {sites.filter(s => s.id === selectedSite).map(site => (
            <div key={site.id} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">{site.name}</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className={`p-3 rounded-lg ${site.status === 'alert' ? 'bg-destructive/20 border-destructive/50' : 'bg-success/20 border-success/50'} border`}>
                  <p className="text-xs text-muted-foreground">Statut</p>
                  <p className={`font-semibold ${site.status === 'alert' ? 'text-destructive' : 'text-success'}`}>
                    {site.status === 'alert' ? 'Alerte' : 'En ligne'}
                  </p>
                </div>
                <div className="bg-secondary p-3 rounded-lg border border-panel-border/50">
                  <p className="text-xs text-muted-foreground">Efficacité</p>
                  <p className="font-semibold">{site.efficiency}</p>
                </div>
                <div className="bg-secondary p-3 rounded-lg border border-panel-border/50 col-span-2">
                  <p className="text-xs text-muted-foreground">Production</p>
                  <p className="font-semibold">{site.production}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSite(null)}
                className="text-sm text-primary hover:underline"
              >
                Fermer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}