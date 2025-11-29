import { MiningLayout } from "@/components/MiningLayout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { CircularGauge } from "@/components/dashboard/CircularGauge";
import { SitesList } from "@/components/dashboard/SitesList";
import { RecentStatics } from "@/components/dashboard/RecentStatics";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ConnectionsList } from "@/components/dashboard/ConnectionsList";
import { QuickReports } from "@/components/dashboard/QuickReports";
import { MiningMap } from "@/components/dashboard/MiningMap";
import { AllSitesChart, GridReportChart } from "@/components/dashboard/ChartPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Bell, 
  User, 
  Settings,
  CheckCircle2,
  TrendingUp,
  Activity,
  BarChart3
} from "lucide-react";

const Index = () => {
  return (
    <MiningLayout>
      {/* Header */}
      <header className="bg-secondary border-b border-panel-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-foreground">
              <span className="w-2 h-2 rounded-full bg-primary mr-2" />
              Followers
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground">
              Routes
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground">
              Textient
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Jinames"
              className="pl-10 pr-4 py-2 bg-panel-bg border border-panel-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary w-64"
            />
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5 text-foreground" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5 text-foreground" />
          </Button>
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <User className="w-5 h-5 text-accent-foreground" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Targeted Sites */}
          <div className="lg:col-span-3">
            <DashboardCard title="Targeted Sites">
              <div className="space-y-6">
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
                            className="flex-1 bg-accent rounded-t"
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
                  <h4 className="text-sm font-semibold text-foreground mb-3">Targeted Sites</h4>
                  <SitesList />
                </div>
              </div>
            </DashboardCard>
          </div>

          {/* Center - Map */}
          <div className="lg:col-span-6">
            <DashboardCard
              title="All All Sites"
              action={
                <Badge variant="secondary">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Exited
                </Badge>
              }
            >
              <MiningMap />
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <StatsCard
                  label="Found"
                  value="86.6%"
                  icon={<Activity className="w-6 h-6 text-white" />}
                  iconBg="hsl(var(--success))"
                />
                <StatsCard
                  label="Reuyertia"
                  value="2"
                  icon={<TrendingUp className="w-6 h-6 text-white" />}
                  iconBg="hsl(var(--chart-primary))"
                />
                <StatsCard
                  label="Fleneling"
                  value="189%"
                  icon={<BarChart3 className="w-6 h-6 text-white" />}
                  iconBg="hsl(var(--accent))"
                />
              </div>
            </DashboardCard>
          </div>

          {/* Right Panel - Target Sites Stats */}
          <div className="lg:col-span-3">
            <DashboardCard title="Target Sites">
              <div className="space-y-6">
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
                            className="flex-1 bg-chart-secondary rounded-t"
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
                    <h4 className="text-sm font-semibold text-foreground">All Sites</h4>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-xs">
                        Contives
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Sink
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-destructive rounded-lg mx-auto mb-2 flex items-center justify-center text-destructive-foreground font-bold">
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
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Statics */}
          <DashboardCard title="Recent Statics">
            <RecentStatics />
            
            <div className="mt-6 pt-4 border-t border-panel-border space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Alert</p>
                    <p className="text-xs text-muted-foreground">2,808 nsk</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span className="text-sm font-semibold text-foreground">110.5129K</span>
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Connections */}
          <DashboardCard
            title="Connections"
            action={<Badge variant="secondary">Cotted</Badge>}
          >
            <ConnectionsList />
          </DashboardCard>

          {/* Quick Reports */}
          <DashboardCard
            title="Quick Reports"
            action={<Badge variant="secondary">flatted</Badge>}
          >
            <QuickReports />
          </DashboardCard>
        </div>

        {/* Grid Reports */}
        <DashboardCard
          title="Grid Reports"
          action={<Badge variant="secondary">Cottad</Badge>}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground">Gamp Site</h4>
                <span className="text-sm text-muted-foreground">0350</span>
              </div>
              <GridReportChart />
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground">Abatiting</h4>
                <Settings className="w-4 h-4 text-muted-foreground" />
              </div>
              <GridReportChart />
            </div>
          </div>
        </DashboardCard>
      </div>
    </MiningLayout>
  );
};

export default Index;
