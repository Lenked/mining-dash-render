import { useState, useEffect } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import { Badge } from "../ui/badge";
import { Activity, CheckCircle2 } from "lucide-react";
import { CircularGauge } from "./CircularGauge";
import { SitesList } from "./SitesList";
import { AllSitesChart } from "./ChartPanel";
import { Button } from "../ui/button";
import clsx from "clsx";
import { DonutChart } from "./DonutChart";

interface TargetSitesCardProps {
  onSiteClick?: (siteName: string) => void;
}

export const TargetSitesCard = ({ onSiteClick }: TargetSitesCardProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
    // Données pour le diagramme donut
    const donutData = [
      { name: "Actifs", value: 3, color: "#28BD66" },
      { name: "Inactifs", value: 1, color: "#F59E0B" },
      { name: "En maintenance", value: 5, color: "#EF4444" },
    ];

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
        <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-2xl bg-[#0F1A24] shadow-2xl">
          {/* Fullscreen Button */}
          {/* <button
            onClick={toggleFullscreen}
            className="absolute top-3 right-3 text-gray-300 hover:text-white transition-colors z-10"
          >
            <Minimize2 size={20} className="text-white" />
          </button> */}

          <DashboardCard
            title="Vehicules"
            action={
              <Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30">
                <Activity className="w-3 h-3 mr-1" />
                Actifs
              </Badge>
            }
          >
            <div className="space-y-6">
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

              

              <div className="pt-4 border-t border-panel-border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-foreground">Nombres de sites</h4>
                  <span className="text-xs text-muted-foreground">Updated 2min ago</span>
                </div>
                <SitesList onSiteClick={onSiteClick} />
              </div>
            </div>

  

              <div className="pt-4 border-t border-panel-border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-foreground">All Sites</h4>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-xs hover:bg-primary/10 hover:text-primary">
                      Contives
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs hover:bg-primary/10 hover:text-primary">
                      Sink
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Distribution by category</p>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-destructive rounded-lg mx-auto mb-2 flex items-center justify-center text-destructive-foreground font-bold text-xs">
                      15410
                    </div>
                    <p className="text-xs text-muted-foreground">75</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">1766</p>
                    <p className="text-lg font-bold text-foreground">45150</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">60</p>
                    <p className="text-xs text-foreground">33</p>
                  </div>
                </div>

                <AllSitesChart />

                <div className="pt-4 border-t border-panel-border mt-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Sites List</h4>
                  <SitesList onSiteClick={onSiteClick} />
                </div>
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
        title="Vehicules"
        action={
          <Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30">
            <Activity className="w-3 h-3 mr-1" />
            Operations
          </Badge>
        }
      >
        <div className="space-y-6">
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


              <div className="pt-4 border-t border-panel-border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-foreground">Nombres de sites</h4>
                  <span className="text-xs text-muted-foreground">Updated 2min ago</span>
                </div>
                <SitesList onSiteClick={onSiteClick} />
              </div>
            </div>

          {/* <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Summary</span>
              <span className="font-semibold text-foreground">513.500</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Trends</p>
                <div className="h-12 flex items-end gap-1">
                  {[50, 70, 55, 80, 65, 75, 90, 85].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-chart-secondary rounded-t transition-all hover:bg-primary"
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
          </div> */}

          <div className="pt-4 border-t border-panel-border">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-foreground">All Sites</h4>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-xs hover:bg-primary/10 hover:text-primary">
                  Contives
                </Button>
                <Button variant="ghost" size="sm" className="text-xs hover:bg-primary/10 hover:text-primary">
                  Sink
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Distribution by category</p>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="w-10 h-10 bg-destructive rounded-lg mx-auto mb-2 flex items-center justify-center text-destructive-foreground font-bold text-xs">
                  15410
                </div>
                <p className="text-xs text-muted-foreground">75</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">1766</p>
                <p className="text-lg font-bold text-foreground">45150</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">60</p>
                <p className="text-xs text-foreground">33</p>
              </div>
            </div>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};