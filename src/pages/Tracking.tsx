import { MiningLayout } from "@/components/MiningLayout";
import { StatsCard } from "@/components/StatsCard";
import { VehicleList } from "@/components/VehicleList";
import { FleetMap } from "@/components/FleetMap";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Bell,
  User,
  Settings,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Truck,
  MapPin,
  Activity,
  BarChart3,
} from "lucide-react";
import { useState } from "react";

// Fonction pour générer des données statistiques de manière générique
const generateStatsData = () => {
  const statsTypes: {
    label: string;
    variant: "success" | "white" | "warning" | "destructive" | "primary" | "offline";
    icon: JSX.Element;
  }[] = [
    { label: "En marche", variant: "success", icon: <Activity className="w-5 h-5" /> },
    { label: "Hors ligne", variant: "white", icon: <Truck className="w-5 h-5" /> },
    { label: "Ralenti", variant: "warning", icon: <MapPin className="w-5 h-5" /> },
    { label: "Arrêté", variant: "destructive", icon: <BarChart3 className="w-5 h-5" /> },
    { label: "Suivi", variant: "primary", icon: <Activity className="w-5 h-5" /> },
    { label: "Aucune", variant: "white", icon: <MapPin className="w-5 h-5" /> },
    { label: "Eteint", variant: "destructive", icon: <Truck className="w-5 h-5" /> },
    { label: "Aucune donnée", variant: "warning", icon: <Activity className="w-5 h-5" /> },
    { label: "Non suivi", variant: "primary", icon: <BarChart3 className="w-5 h-5" /> },
  ];

  return statsTypes.map((statType, index) => ({
    value: Math.floor(Math.random() * 100) + 1, // Valeur aléatoire entre 1 et 100
    label: statType.label,
    variant: statType.variant,
    icon: statType.icon,
  }));
};

const Tracking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statsData] = useState(generateStatsData);

  return (
    <MiningLayout>
      {/* Header */}
      <header className="bg-secondary border-b border-panel-border shadow-elevated">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left - Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-accent/10 transition-colors">
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button className="p-2 rounded-lg hover:bg-accent/10 transition-colors">
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
            <button 
              className="p-2 rounded-lg hover:bg-accent/10 transition-colors hover:rotate-180"
              onClick={() => window.location.reload()}
            >
              <RotateCw className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Center - Search */}
          <div className="flex-1 flex justify-center max-w-2xl mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tracking, vehicles, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-panel-bg border border-panel-border rounded-lg text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Right - User Actions */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="p-2 rounded-lg hover:bg-accent/10 transition-colors">
                <Bell className="w-5 h-5 text-white" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full border-2 border-secondary animate-pulse"></span>
              </button>
            </div>
            <button className="p-2 rounded-lg hover:bg-accent/10 transition-colors">
              <Settings className="w-5 h-5 text-white" />
            </button>
            <div className="relative group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center cursor-pointer ring-2 ring-transparent hover:ring-primary/50 transition-all">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-status-online rounded-full border-2 border-secondary animate-pulse"></span>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Header */}
      <header className="border-b border-panel-border bg-panel-bg/50 backdrop-blur-sm">
        <div className="p-4 w-full">
          <div className="flex items-stretch gap-2 pb-2 w-full">
            {statsData.map((stat, index) => (
              <StatsCard
                key={`${stat.label}-${index}`}
                value={stat.value}
                label={stat.label}
                variant={stat.variant}
                icon={stat.icon}
                className="flex-1 min-w-0"
              />
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar - Vehicle List */}
        <aside className="w-[400px] shrink-0 border-r border-panel-border overflow-hidden">
          <VehicleList />
        </aside>

        {/* Map Area */}
        <section className="flex-1 p-4">
          <FleetMap />
        </section>
      </main>
    </MiningLayout>
  );
};

export default Tracking;