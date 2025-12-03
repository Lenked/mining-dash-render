import { useState, useEffect } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import { Badge } from "../ui/badge";
import { CheckCircle2, Activity, TrendingUp, BarChart3 } from "lucide-react";
import { InteractiveMiningMap } from "./InteractiveMiningMap";
import { StatsCard } from "./StatsCard";
import { LineChart } from "./LineChart";
import clsx from "clsx";

interface AllSitesOverviewCardProps {
  navigationLevel: "all-sites" | "site-zones" | "zone-detail";
  selectedSite: string | null;
}

export const AllSitesOverviewCard = ({ navigationLevel, selectedSite }: AllSitesOverviewCardProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Données fictives pour le graphique
  const chartData = [
    { date: 'Lun', volume: 4000 },
    { date: 'Mar', volume: 3000 },
    { date: 'Mer', volume: 2000 },
    { date: 'Jeu', volume: 2780 },
    { date: 'Ven', volume: 1890 },
    { date: 'Sam', volume: 2390 },
    { date: 'Dim', volume: 3490 },
  ];

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle escape key press to exit fullscreen
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // If in fullscreen, render the card as a modal overlay
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
        <div className="relative w-full max-w-6xl max-h-[90vh] overflow-auto rounded-2xl bg-[#0F1A24] shadow-2xl">
          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="absolute top-3 right-3 text-gray-300 hover:text-white transition-colors z-10"
          >
            <Minimize2 size={20} className="text-white" />
          </button>

          <DashboardCard
            title={
              navigationLevel === "site-zones" && selectedSite
                ? `${selectedSite} Overview`
                : "All Sites Overview"
            }
            action={
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                  {navigationLevel === "site-zones" ? "Site Map" : "Live Map"}
                </Badge>
                <Badge variant="secondary">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {navigationLevel === "site-zones" ? "1 Active" : "4 Active"}
                </Badge>
              </div>
            }
          >
            <InteractiveMiningMap />

            <div className="grid grid-cols-3 gap-4 mt-6">
              <StatsCard
                label="Volume extrait"
                value="86.6%"
                icon={<Activity className="w-6 h-6 text-white" />}
                iconBg="hsl(var(--success))"
              />
              <StatsCard
                label="volume chargé"
                value="2"
                icon={<TrendingUp className="w-6 h-6 text-white" />}
                iconBg="hsl(var(--chart-primary))"
              />
              <StatsCard
                label="Volume déchargé"
                value="189%"
                icon={<BarChart3 className="w-6 h-6 text-white" />}
                iconBg="hsl(var(--accent))"
              />
            </div>

            {/* Diagramme de ligne en plein écran */}
            <div className="mt-6">
              <LineChart
                data={chartData}
                xKey="date"
                yKey="volume"
                title="Volume au fil du temps"
                color="hsl(var(--chart-primary))"
              />
            </div>
          </DashboardCard>
        </div>
      </div>
    );
  }

  // Normal view
  return (
    <div className="relative">
      {/* Fullscreen Button */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-3 right-3 text-gray-300 hover:text-white transition-colors z-10"
      >
        <Maximize2 size={20} className="text-gray-300 hover:text-white" />
      </button>

      <DashboardCard
        title={
          navigationLevel === "site-zones" && selectedSite
            ? `${selectedSite} Overview`
            : "All Sites Overview"
        }
        action={
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
              {navigationLevel === "site-zones" ? "Site Map" : "Live Map"}
            </Badge>
            <Badge variant="secondary">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              {navigationLevel === "site-zones" ? "1 Active" : "4 Active"}
            </Badge>
          </div>
        }
      >
        <InteractiveMiningMap />

        <div className="grid grid-cols-3 gap-4 mt-6">
              <StatsCard
                label="Volume extrait"
                value="86.6%"
                icon={<Activity className="w-6 h-6 text-white" />}
                iconBg="hsl(var(--success))"
              />
              <StatsCard
                label="volume chargé"
                value="2"
                icon={<TrendingUp className="w-6 h-6 text-white" />}
                iconBg="hsl(var(--chart-primary))"
              />
              <StatsCard
                label="Volume déchargé"
                value="189%"
                icon={<BarChart3 className="w-6 h-6 text-white" />}
                iconBg="hsl(var(--accent))"
              />
            </div>

            {/* Diagramme de ligne 
            <div className="mt-6">
              <LineChart
                data={chartData}
                xKey="date"
                yKey="volume"
                title="Volume au fil du temps"
                color="hsl(var(--chart-primary))"
              />
            </div>*/}
      </DashboardCard>
    </div>
  );
};