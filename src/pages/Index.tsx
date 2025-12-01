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
  BarChart3,
  Plus
} from "lucide-react";

// Mock data
const mockSiteUpdates = [
  { id: 1, site: "North Mine A", message: "Production target reached", time: "2 min ago", type: "success" },
  { id: 2, site: "East Quarry", message: "Equipment maintenance scheduled", time: "5 min ago", type: "warning" },
  { id: 3, site: "South Site B", message: "Alert: Low fuel level", time: "8 min ago", type: "error" },
  { id: 4, site: "West Valley", message: "New shift started", time: "12 min ago", type: "success" },
];

const mockProductionStats = [
  { id: 1, label: "Daily Output", value: "2,847", unit: "tons", change: "+12%", progress: 85 },
  { id: 2, label: "Efficiency Rate", value: "94.2", unit: "%", change: "+3%", progress: 94 },
  { id: 3, label: "Active Workers", value: "186", unit: "people", change: "+8", progress: 78 },
];

const mockEquipmentStatus = [
  { id: "EQ-001", name: "Excavator Prime", status: "operational", uptime: "98.5%" },
  { id: "EQ-002", name: "Loader Delta", status: "maintenance", uptime: "87.2%" },
  { id: "EQ-003", name: "Drill Rig Alpha", status: "operational", uptime: "95.8%" },
  { id: "EQ-004", name: "Crusher Unit", status: "offline", uptime: "0%" },
];

// Tab Button Component
const TabButton = ({ 
  children, 
  active = false, 
  icon = null, 
  variant = "default" 
}: { 
  children: React.ReactNode; 
  active?: boolean; 
  icon?: React.ReactNode; 
  variant?: "default" | "accent";
}) => (
  <button
    className={`
      relative px-4 py-2 rounded-t-lg text-sm font-medium transition-all
      ${active 
        ? 'bg-panel-bg text-foreground border-t border-l border-r border-panel-border' 
        : variant === "accent"
        ? 'bg-accent/10 text-accent hover:bg-accent/20 border border-accent/30 rounded-lg mx-1'
        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
      }
      ${active ? 'shadow-sm' : ''}
    `}
  >
    <div className="flex items-center gap-2">
      {icon}
      <span>{children}</span>
    </div>
    {active && (
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
    )}
  </button>
);

const Index = () => {
  return (
    <MiningLayout>
      {/* Header */}
      <header className="bg-secondary border-b border-panel-border shadow-elevated">
        {/* Tabs Navigation */}
        <div className="flex items-center justify-between px-6 pt-3">
          <div className="flex items-center gap-1">
            <TabButton active icon={<span className="w-2 h-2 rounded-full bg-status-online animate-pulse" />}>
              Followers
            </TabButton>
            <TabButton icon={null}>
              Routes
            </TabButton>
            <TabButton icon={null}>
              Textient
            </TabButton>
            <TabButton icon={null} variant="accent">
              Selected User
            </TabButton>
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-2 h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Search and Actions Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-panel-border/50">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search sites, users, reports..."
                className="pl-10 pr-4 py-2 bg-panel-bg border border-panel-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary w-80 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-xs hover:bg-primary/10 hover:text-primary">
                Filter by region
              </Button>
              <Button variant="ghost" size="sm" className="text-xs hover:bg-primary/10 hover:text-primary">
                Export data
              </Button>
            </div>
          </div>
        
          <div className="flex items-center gap-4">
            <div className="relative">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Bell className="w-5 h-5 text-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full border-2 border-secondary"></span>
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Settings className="w-5 h-5 text-foreground" />
            </Button>
            <div className="relative group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center cursor-pointer ring-2 ring-transparent hover:ring-primary/50 transition-all">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-status-online rounded-full border-2 border-secondary"></span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Targeted Sites */}
          <div className="lg:col-span-3">
            <DashboardCard 
              title="Targeted Sites"
              action={
                <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Online
                </Badge>
              }
            >
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
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-foreground">Targeted Sites</h4>
                    <span className="text-xs text-muted-foreground">Updated 2min ago</span>
                  </div>
                  <SitesList />
                </div>
              </div>
            </DashboardCard>
          </div>

          {/* Center - Map */}
          <div className="lg:col-span-6">
            <DashboardCard
              title="All Sites Overview"
              action={
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                    Live Map
                  </Badge>
                  <Badge variant="secondary">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    4 Active
                  </Badge>
                </div>
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
            <DashboardCard 
              title="Target Sites"
              action={
                <Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30">
                  <Activity className="w-3 h-3 mr-1" />
                  Monitoring
                </Badge>
              }
            >
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

        {/* Additional Content Row */}
        <DashboardCard
          title="Sites Activity Overview"
          action={
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
              Live Feed
            </Badge>
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground mb-3">Recent Updates</h4>
              {mockSiteUpdates.map((update) => (
                <div key={update.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-panel-border/30">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${
                    update.type === 'success' ? 'bg-status-online' : 
                    update.type === 'warning' ? 'bg-warning' : 'bg-destructive'
                  } animate-pulse`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{update.site}</p>
                    <p className="text-xs text-muted-foreground">{update.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{update.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground mb-3">Production Stats</h4>
              <div className="space-y-3">
                {mockProductionStats.map((stat) => (
                  <div key={stat.id} className="p-4 rounded-lg bg-gradient-to-br from-accent/10 to-transparent border border-accent/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <span className="text-xs text-accent">{stat.change}</span>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                      <span className="text-xs text-muted-foreground mb-1">{stat.unit}</span>
                    </div>
                    <div className="h-1 bg-secondary rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full bg-accent rounded-full transition-all"
                        style={{ width: `${stat.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground mb-3">Equipment Status</h4>
              <div className="space-y-3">
                {mockEquipmentStatus.map((equipment) => (
                  <div key={equipment.id} className="p-3 rounded-lg bg-secondary/50 border border-panel-border/30 hover:border-primary/30 transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{equipment.name}</span>
                      <Badge 
                        variant="secondary" 
                        className={
                          equipment.status === 'operational' ? 'bg-success/20 text-success border-success/30' :
                          equipment.status === 'maintenance' ? 'bg-warning/20 text-warning border-warning/30' :
                          'bg-destructive/20 text-destructive border-destructive/30'
                        }
                      >
                        {equipment.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>ID: {equipment.id}</span>
                      <span>•</span>
                      <span>Uptime: {equipment.uptime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DashboardCard>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Statics */}
          <DashboardCard 
            title="Recent Statistics"
            action={
              <span className="text-xs text-muted-foreground">Last 7 days</span>
            }
          >
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
            action={
              <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                <span className="w-2 h-2 rounded-full bg-success mr-1 animate-pulse" />
                Connected
              </Badge>
            }
          >
            <ConnectionsList />
          </DashboardCard>

          {/* Quick Reports */}
          <DashboardCard
            title="Quick Reports"
            action={
              <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                <BarChart3 className="w-3 h-3 mr-1" />
                Generated
              </Badge>
            }
          >
            <QuickReports />
          </DashboardCard>
        </div>

        {/* Grid Reports */}
        <DashboardCard
          title="Grid Reports Analysis"
          action={
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                Real-time
              </Badge>
              <span className="text-xs text-muted-foreground">Updated now</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-panel-bg/50 p-4 rounded-lg border border-panel-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-base font-bold text-foreground">Gamp Site</h4>
                  <p className="text-xs text-muted-foreground">Production metrics</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-accent">0350</span>
                  <p className="text-xs text-muted-foreground">units/day</p>
                </div>
              </div>
              <GridReportChart />
            </div>
            <div className="bg-panel-bg/50 p-4 rounded-lg border border-panel-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-base font-bold text-foreground">Abatiting</h4>
                  <p className="text-xs text-muted-foreground">Efficiency tracking</p>
                </div>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Settings className="w-4 h-4 text-muted-foreground hover:text-primary" />
                </Button>
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
