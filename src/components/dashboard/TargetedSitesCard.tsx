import { useState, useEffect } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import { Badge } from "../ui/badge";
import { CheckCircle2 } from "lucide-react";
import { DonutChart } from "./DonutChart";
import { SitesList } from "./SitesList";
import clsx from "clsx";

interface TargetedSitesCardProps {
  onSiteClick?: (siteName: string) => void;
}

export const TargetedSitesCard = ({ onSiteClick }: TargetedSitesCardProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Données pour le diagramme donut
  const donutData = [
    { name: "Sites actifs", value: 3, color: "#28BD66" },
    { name: "Total de zones", value: 1, color: "#F59E0B" },
    { name: "En alerte", value: 5, color: "#EF4444" },
    { name: "Production", value: 15.4, color: "#3B82F6" },
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
        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto rounded-2xl bg-[#0F1A24] shadow-2xl">
          {/* Fullscreen Button */}
          {/* <button
            onClick={toggleFullscreen}
            className="absolute top-3 right-3 text-gray-300 hover:text-white transition-colors z-10"
          >
            <Minimize2 size={20} className="text-white" />
          </button> */}

          <DashboardCard
            title="Nombres de sites"
            action={
              <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Online
              </Badge>
            }
          >
            <div className="space-y-6">
              {/* Donut Chart */}
              <div className="flex flex-col items-center">
                <DonutChart 
                  data={donutData}
                  innerRadius={60}
                  outerRadius={90}
                  showTooltip={true}
                />
              </div>

              {/* Legend */}
              <div className="pt-4 border-t border-panel-border">
                <h4 className="text-xs font-semibold text-foreground mb-3">Légende</h4>
                <div className="grid grid-cols-2 gap-3">
                  {donutData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Volume extrait</span>
                  <span className="font-semibold text-foreground">513.500</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Trends</p>
                    <div className="h-12 flex items-end gap-1">
                      {[40, 60, 45, 70, 55, 65, 80, 75].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-accent rounded-t transition-all hover:bg-primary"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Centre</p>
                    <p className="text-sm">
                      <span className="font-semibold text-foreground">84</span>
                      <span className="text-muted-foreground"> ∨</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Basili/Villag
                    </p>
                    <p className="text-xs">
                      <span className="text-foreground">Fiyile</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-panel-border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-foreground">Nombres de sites</h4>
                  <span className="text-xs text-muted-foreground">Updated 2min ago</span>
                </div>
                <SitesList onSiteClick={onSiteClick} />
              </div>
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
      {/* <button
        onClick={toggleFullscreen}
        className="absolute top-3 right-3 text-gray-300 hover:text-white transition-colors z-10"
      >
        <Maximize2 size={20} className="text-gray-300 hover:text-white" />
      </button> */}

      <DashboardCard
        title="Nombres de sites"
        action={
          <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Actifs
          </Badge>
        }
      >
        <div className="space-y-6">
          {/* Donut Chart */}
          <div className="flex flex-col items-center">
            <DonutChart 
              data={donutData}
              innerRadius={60}
              outerRadius={90}
              showTooltip={true}
            />
          </div>

          {/* Legend */}
          <div className="pt-4 border-t border-panel-border">
            <h4 className="text-xs font-semibold text-foreground mb-3">Légende</h4>
            <div className="grid grid-cols-2 gap-3">
              {donutData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Volume extrait</span>
              <span className="font-semibold text-foreground">513.500</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Trends</p>
                <div className="h-12 flex items-end gap-1">
                  {[40, 60, 45, 70, 55, 65, 80, 75].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-accent rounded-t transition-all hover:bg-primary"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Centre</p>
                <p className="text-sm">
                  <span className="font-semibold text-foreground">84</span>
                  <span className="text-muted-foreground"> ∨</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Basili/Villag
                </p>
                <p className="text-xs">
                  <span className="text-foreground">Fiyile</span>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-panel-border">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-foreground">Nombres de sites</h4>
              <span className="text-xs text-muted-foreground">Updated 2min ago</span>
            </div>
            <SitesList onSiteClick={onSiteClick} />
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};