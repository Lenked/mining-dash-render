import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { CircularGauge } from "@/components/dashboard/CircularGauge";
import { SitesList } from "@/components/dashboard/SitesList";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { InteractiveMiningMap } from "@/components/dashboard/InteractiveMiningMap";
import { AllSitesChart } from "@/components/dashboard/ChartPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckCircle2,
  TrendingUp,
  Activity,
  BarChart3,
  MapPin,
} from "lucide-react";
import { DraggableGridLayout, defaultDashboardLayouts, useGridLayout } from "./DraggableGridLayout";
import { Layout, Layouts } from "react-grid-layout";

interface GridDashboardContentProps {
  navigationLevel: string;
  selectedSite: string | null;
  onSiteClick: (siteName: string) => void;
  mockSites: Array<{
    id: number;
    name: string;
    status: string;
    zones: number;
    production: string;
    efficiency: string;
  }>;
}

export function GridDashboardContent({
  navigationLevel,
  selectedSite,
  onSiteClick,
  mockSites,
}: GridDashboardContentProps) {
  const { layouts, saveLayout, resetLayout } = useGridLayout(defaultDashboardLayouts);

  const handleLayoutChange = (currentLayout: Layout[], allLayouts: Layouts) => {
    saveLayout(allLayouts);
  };

  return (
    <div className="space-y-6 pt-14">
      <DraggableGridLayout
        layouts={layouts}
        onLayoutChange={handleLayoutChange}
        rowHeight={80}
        isEditable={true}
      >
        {/* Targeted Sites Card */}
        <div key="targeted-sites">
          <DashboardCard
            title="Targeted Sites"
            action={
              <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Online
              </Badge>
            }
            className="h-full"
          >
            <div className="space-y-4">
              <div className="flex justify-center">
                <CircularGauge value={575} max={1000} label="kM" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Summary</span>
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
                    <p className="text-xs text-muted-foreground mt-1">Basili/Villag</p>
                    <p className="text-xs"><span className="text-foreground">Fiyile</span></p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-panel-border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-foreground">Targeted Sites</h4>
                  <span className="text-xs text-muted-foreground">Updated 2min ago</span>
                </div>
                <SitesList onSiteClick={onSiteClick} />
              </div>
            </div>
          </DashboardCard>
        </div>

        {/* All Sites Overview Map */}
        <div key="all-sites-map">
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
            className="h-full"
          >
            <div className="h-[calc(100%-120px)] min-h-[250px]">
              <InteractiveMiningMap />
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <StatsCard
                label="Found"
                value="86.6%"
                icon={<Activity className="w-5 h-5 text-white" />}
                iconBg="hsl(var(--success))"
              />
              <StatsCard
                label="Reuyertia"
                value="2"
                icon={<TrendingUp className="w-5 h-5 text-white" />}
                iconBg="hsl(var(--chart-primary))"
              />
              <StatsCard
                label="Fleneling"
                value="189%"
                icon={<BarChart3 className="w-5 h-5 text-white" />}
                iconBg="hsl(var(--accent))"
              />
            </div>
          </DashboardCard>
        </div>

        {/* Target Sites Card */}
        <div key="target-sites">
          <DashboardCard
            title="Target Sites"
            action={
              <Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30">
                <Activity className="w-3 h-3 mr-1" />
                Monitoring
              </Badge>
            }
            className="h-full"
          >
            <div className="space-y-4">
              <div className="flex justify-center">
                <CircularGauge value={575} max={1000} label="kM" color="hsl(var(--chart-secondary))" />
              </div>

              <div className="space-y-2">
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
                    <p className="text-xs text-muted-foreground mt-1">Basili/Villag</p>
                    <p className="text-xs"><span className="text-foreground">Fiyile</span></p>
                  </div>
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

        {/* Sites List */}
        <div key="sites-list">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full">
            {mockSites.map((site) => {
              if (navigationLevel === "site-zones" && selectedSite && selectedSite !== site.name) {
                return null;
              }
              return (
                <Card
                  key={site.id}
                  onClick={() => onSiteClick(site.name)}
                  className="p-4 bg-panel-bg border-panel-border shadow-card hover:shadow-elevated hover:scale-105 hover:border-primary/50 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary group-hover:animate-pulse" />
                      <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{site.name}</h4>
                    </div>
                    <Badge className={
                      site.status === "online"
                        ? "bg-success/20 text-success border-success/30"
                        : "bg-warning/20 text-warning border-warning/30"
                    }>
                      {site.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Zones:</span>
                      <span className="text-foreground font-medium">{site.zones}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Production:</span>
                      <span className="text-foreground font-medium">{site.production}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Efficiency:</span>
                      <span className="text-foreground font-medium">{site.efficiency}</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </DraggableGridLayout>
    </div>
  );
}
