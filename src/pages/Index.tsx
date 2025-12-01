import { MiningLayout } from "@/components/MiningLayout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { CircularGauge } from "@/components/dashboard/CircularGauge";
import { SitesList } from "@/components/dashboard/SitesList";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { MiningMap } from "@/components/dashboard/MiningMap";
import { AllSitesChart } from "@/components/dashboard/ChartPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Search,
  Bell,
  User,
  Settings,
  CheckCircle2,
  TrendingUp,
  Activity,
  BarChart3,
  Plus,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  MapPin,
  Zap,
  AlertTriangle,
  MoreVertical,
  Download,
  Copy,
  X,
  PlusIcon,
  ListIcon,
  ArrowBigRight,
  TimerIcon,
  CarIcon,
  BellIcon,
  DockIcon,
  UsersIcon
} from "lucide-react";
import { useState } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import type { ReactElement, ReactNode } from 'react';
import { InteractiveMiningMap } from "@/components/dashboard/InteractiveMiningMap";

// Mock data
const mockSites = [
  { id: 1, name: "Site Alpha", status: "online", zones: 3, production: "4.2k t/day", efficiency: "94%" },
  { id: 2, name: "Site Beta", status: "online", zones: 2, production: "3.8k t/day", efficiency: "95%" },
  { id: 3, name: "Site Gamma", status: "warning", zones: 4, production: "2.1k t/day", efficiency: "60%" },
  { id: 4, name: "Site Delta", status: "online", zones: 5, production: "5.3k t/day", efficiency: "107%" },
];

const mockZones = [
  { id: 1, name: "Zone A", status: "active", equipment: 12, area: "45 ha" },
  { id: 2, name: "Zone B", status: "active", equipment: 8, area: "32 ha" },
  { id: 3, name: "Zone C", status: "maintenance", equipment: 15, area: "67 ha" },
];

// Navigation types
type NavigationLevel = "all-sites" | "site-zones" | "zone-detail";

interface HistoryItem {
  level: NavigationLevel;
  site?: string;
  zone?: string;
}

// Tab Button Component
const TabButton = ({
  id,
  label,
  active = false,
  onClick,
  onClose
}: {
  id: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
  onClose?: () => void;
}) => {
  // Determine if this tab is a site-specific tab
  const isSiteTab = mockSites.some(site => site.name.toLowerCase().replace(" ", "-") === id);
  const isAllSitesTab = id === "all-sites";

  // Context menu actions based on tab type
  type ContextMenuAction = {
    id: string;
    label: string;
    icon: React.ElementType;
  };

  const getContextMenuActions = (): ContextMenuAction[] => {
    if (isAllSitesTab) {
      return [
        { id: 'refresh', label: 'Refresh Stats', icon: RotateCw },
        { id: 'add', label: 'Ajouter des Sites', icon: PlusIcon },
        { id: 'liste', label: 'Listes des Sites', icon: ListIcon },
        { id: 'gest-actif', label: 'Gestion des Actifs', icon: ArrowBigRight },
        { id: 'vue-temps-reel', label: 'Vue Temps Réel des Operations', icon: TimerIcon },
        { id: 'gest-trajet', label: 'Gestion des Trajets', icon:CarIcon },
        { id: 'gest-notif', label: 'Gestion des Notifications', icon:BellIcon },
        { id: 'gest-personnel', label: 'Gestion du Personnel', icon:UsersIcon },
        { id: 'gest-rapport', label: 'Rapport', icon:DockIcon },
        /* { id: 'close-others', label: 'Close Other Tabs', icon: X },
        { id: 'close-all', label: 'Close All Tabs', icon: X }, */
      ];
    } else if (isSiteTab) {
      return [
        { id: 'refresh', label: 'Refresh Site Data', icon: RotateCw },
        { id: 'export', label: 'Export Site Data', icon: Download },
        { id: 'duplicate', label: 'Duplicate Tab', icon: Copy },
        { id: 'close', label: 'Close Tab', icon: X },
        { id: 'close-others', label: 'Close Other Tabs', icon: X },
        { id: 'close-right', label: 'Close Tabs to the Right', icon: X },
      ];
    } else {
      return [
        { id: 'refresh', label: 'Refresh', icon: RotateCw },
        { id: 'export', label: 'Export Data', icon: Download },
        { id: 'duplicate', label: 'Duplicate Tab', icon: Copy },
        { id: 'close', label: 'Close Tab', icon: X },
        { id: 'close-others', label: 'Close Other Tabs', icon: X },
        { id: 'close-right', label: 'Close Tabs to the Right', icon: X },
      ];
    }
  };

  const renderIcon = (IconComponent: React.ElementType) => {
    return <IconComponent className="w-4 h-4" />;
  };

  const handleAction = (actionId: string) => {
    switch (actionId) {
      case 'refresh':
        handleRefresh();
        break;
      case 'export':
        // Placeholder for export functionality
        alert(`Exporting data for ${label}`);
        break;
      case 'duplicate':
        // Placeholder for duplicate functionality
        alert(`Duplicating tab: ${label}`);
        break;
      case 'close':
        onClose && onClose();
        break;
      case 'close-others':
        // Placeholder for close others functionality
        alert('Closing other tabs');
        break;
      case 'close-right':
        // Placeholder for close right functionality
        alert('Closing tabs to the right');
        break;
      default:
        break;
    }
  };

  return (
    <ContextMenu.Root>
      <ContextMenuTrigger>
        <div
          onClick={onClick}
          className={`
            group relative px-4 py-2 rounded-t-lg text-sm font-medium transition-all duration-300 cursor-pointer
            flex items-center gap-2
            ${active
              ? 'bg-panel-bg text-foreground border-t-2 border-x border-panel-border border-t-primary shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-panel-bg/30 bg-panel-bg/20'
            }
          `}
        >
          <span>{label}</span>
          {onClose && !active && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive text-xs"
            >
              ×
            </button>
          )}
          {active && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-fade-in" />
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48 bg-panel-bg border border-panel-border shadow-elevated rounded-lg p-1 z-50">
        {getContextMenuActions().map((action) => (
          <ContextMenuItem
            key={action.id}
            className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer text-white"
            onClick={() => handleAction(action.id)}
          >
            {renderIcon(action.icon)}
            {action.label}
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu.Root>
  );
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("all-sites");
  const [searchQuery, setSearchQuery] = useState("");
  const [navigationLevel, setNavigationLevel] = useState<NavigationLevel>("all-sites");
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [navigationHistory, setNavigationHistory] = useState<HistoryItem[]>([{level: "all-sites"}]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleSiteClick = (siteName: string) => {
    setSelectedSite(siteName);
    setNavigationLevel("site-zones");
    setActiveTab("all-zones");
    const newHistory = navigationHistory.slice(0, historyIndex + 1);
    newHistory.push({level: "site-zones", site: siteName});
    setNavigationHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleZoneClick = (zoneName: string) => {
    setSelectedZone(zoneName);
    setNavigationLevel("zone-detail");
    setActiveTab(zoneName.toLowerCase().replace(" ", "-"));
    const newHistory = navigationHistory.slice(0, historyIndex + 1);
    newHistory.push({level: "zone-detail", site: selectedSite, zone: zoneName});
    setNavigationHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const historyItem = navigationHistory[newIndex];
      setHistoryIndex(newIndex);
      setNavigationLevel(historyItem.level);
      setSelectedSite(historyItem.site || null);
      setSelectedZone(historyItem.zone || null);
      if (historyItem.level === "all-sites") {
        setActiveTab("all-sites");
      } else if (historyItem.level === "site-zones") {
        setActiveTab("all-zones");
      } else {
        setActiveTab(historyItem.zone?.toLowerCase().replace(" ", "-") || "all-zones");
      }
    }
  };

  const handleForward = () => {
    if (historyIndex < navigationHistory.length - 1) {
      const newIndex = historyIndex + 1;
      const historyItem = navigationHistory[newIndex];
      setHistoryIndex(newIndex);
      setNavigationLevel(historyItem.level);
      setSelectedSite(historyItem.site || null);
      setSelectedZone(historyItem.zone || null);
      if (historyItem.level === "all-sites") {
        setActiveTab("all-sites");
      } else if (historyItem.level === "site-zones") {
        setActiveTab("all-zones");
      } else {
        setActiveTab(historyItem.zone?.toLowerCase().replace(" ", "-") || "all-zones");
      }
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const getTabs = () => {
    if (navigationLevel === "all-sites") {
      return [
        { id: "all-sites", label: "Overview" },
        ...mockSites.map(site => ({ id: site.name.toLowerCase().replace(" ", "-"), label: site.name }))
      ];
    } else if (navigationLevel === "site-zones") {
      return [
        { id: "all-sites", label: "Overview" },
        { id: "all-zones", label: `All Zones - ${selectedSite}` },
        ...mockZones.map(zone => ({ id: zone.name.toLowerCase().replace(" ", "-"), label: zone.name }))
      ];
    } else {
      return [
        { id: "all-sites", label: "Overview" },
        { id: "all-zones", label: `All Zones - ${selectedSite}` },
        ...mockZones.map(zone => ({ id: zone.name.toLowerCase().replace(" ", "-"), label: zone.name }))
      ];
    }
  };

  return (
    <MiningLayout>
      {/* Header */}
      <header className="bg-secondary border-b border-panel-border shadow-elevated">
        {/* Tabs Navigation */}
        <div className="flex items-center justify-between px-6 pt-3">
          <div className="flex items-center gap-1">
            {getTabs().map(tab => (
              <TabButton
                key={tab.id}
                id={tab.id}
                label={tab.label}
                active={activeTab === tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === "all-sites") {
                    setNavigationLevel("all-sites");
                    setSelectedSite(null);
                    setSelectedZone(null);
                  } else {
                    // Check if this tab corresponds to a specific site
                    const siteName = mockSites.find(site =>
                      site.name.toLowerCase().replace(" ", "-") === tab.id
                    )?.name;

                    if (siteName) {
                      setSelectedSite(siteName);
                      setNavigationLevel("site-zones");
                      // Update history when navigating via tab
                      const newHistory = navigationHistory.slice(0, historyIndex + 1);
                      newHistory.push({level: "site-zones", site: siteName});
                      setNavigationHistory(newHistory);
                      setHistoryIndex(newHistory.length - 1);
                    }
                  }
                }}
              />
            ))}
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-2 h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary hover:scale-110 transition-all"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Search and Actions Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-panel-border/50">
          {/* Left - Navigation Buttons */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBack}
              disabled={historyIndex === 0}
              className="hover:bg-accent/10 disabled:opacity-30 transition-all hover:scale-105 disabled:hover:scale-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleForward}
              disabled={historyIndex === navigationHistory.length - 1}
              className="hover:bg-accent/10 disabled:opacity-30 transition-all hover:scale-105 disabled:hover:scale-100"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRefresh}
              className="hover:bg-accent/10 transition-all hover:scale-105 hover:rotate-180"
            >
              <RotateCw className="w-4 h-4" />
            </Button>
          </div>

          {/* Center - Search */}
          <div className="flex-1 flex justify-center max-w-2xl mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search sites, zones, equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-panel-bg border border-panel-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>
        
          {/* Right - User Actions */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:scale-110 transition-all">
                <Bell className="w-5 h-5 text-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full border-2 border-secondary animate-pulse"></span>
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:scale-110 transition-all">
              <Settings className="w-5 h-5 text-foreground" />
            </Button>
            <div className="relative group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center cursor-pointer ring-2 ring-transparent hover:ring-primary/50 transition-all hover:scale-110">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-status-online rounded-full border-2 border-secondary animate-pulse"></span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-8 animate-fade-in">
        {(navigationLevel === "all-sites" ||
          mockSites.some(site => site.name.toLowerCase().replace(" ", "-") === activeTab)) && (
          <>
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
                        <h4 className="text-sm font-semibold text-foreground">Targeted Sites</h4>
                        <span className="text-xs text-muted-foreground">Updated 2min ago</span>
                      </div>
                      <SitesList onSiteClick={handleSiteClick} />
                    </div>
                  </div>
                </DashboardCard>
              </div>

              {/* Center - Map */}
              <div className="lg:col-span-6">
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
                        <SitesList onSiteClick={handleSiteClick} />
                      </div>
                    </div>
                  </div>
                </DashboardCard>
              </div>
            </div>

            {/* All Sites List - Clickable */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockSites.map((site) => {
                // If we're in site-zones level, only show the selected site
                if (navigationLevel === "site-zones" && selectedSite && selectedSite !== site.name) {
                  return null;
                }
                return (
                  <Card
                    key={site.id}
                    onClick={() => handleSiteClick(site.name)}
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
          </>
        )}

        {navigationLevel === "site-zones" && selectedSite && (
          <>
            {/* Site Zones View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Panel */}
              <div className="lg:col-span-3">
                <DashboardCard 
                  title="All Zones Overview"
                  action={
                    <Badge variant="secondary" className="bg-accent/20 text-accent-foreground border-accent/30">
                      {mockZones.length} Zones
                    </Badge>
                  }
                >
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <CircularGauge value={78} max={100} label="%" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Site Efficiency</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{selectedSite}</p>
                    </div>
                  </div>
                </DashboardCard>
              </div>

              {/* Center - Zones Map */}
              <div className="lg:col-span-6">
                <DashboardCard
                  title={`${selectedSite} - Zones Map`}
                  action={
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                      Live View
                    </Badge>
                  }
                >
                  <InteractiveMiningMap />
                  
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <StatsCard
                      label="Total Area"
                      value="144 ha"
                      icon={<MapPin className="w-6 h-6 text-white" />}
                      iconBg="hsl(var(--primary))"
                    />
                    <StatsCard
                      label="Equipment"
                      value="35"
                      icon={<Zap className="w-6 h-6 text-white" />}
                      iconBg="hsl(var(--accent))"
                    />
                    <StatsCard
                      label="Production"
                      value="4.2k t"
                      icon={<TrendingUp className="w-6 h-6 text-white" />}
                      iconBg="hsl(var(--success))"
                    />
                  </div>
                </DashboardCard>
              </div>

              {/* Right Panel */}
              <div className="lg:col-span-3">
                <DashboardCard 
                  title="Zone Stats"
                  action={
                    <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                      Active
                    </Badge>
                  }
                >
                  <div className="space-y-4">
                    {mockZones.map((zone) => (
                      <div 
                        key={zone.id}
                        className="p-3 rounded-lg bg-secondary/30 border border-panel-border hover:border-primary/50 transition-all cursor-pointer"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-foreground">{zone.name}</span>
                          <Badge className={zone.status === "active" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}>
                            {zone.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Equipment: {zone.equipment} | Area: {zone.area}
                        </div>
                      </div>
                    ))}
                  </div>
                </DashboardCard>
              </div>
            </div>

            {/* All Zones List - Clickable */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockZones.map((zone) => (
                <Card 
                  key={zone.id}
                  onClick={() => handleZoneClick(zone.name)}
                  className="p-4 bg-panel-bg border-panel-border shadow-card hover:shadow-elevated hover:scale-105 hover:border-accent/50 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-accent group-hover:animate-pulse" />
                      <h4 className="font-bold text-foreground group-hover:text-accent transition-colors">{zone.name}</h4>
                    </div>
                    <Badge className={
                      zone.status === "active" 
                        ? "bg-success/20 text-success border-success/30" 
                        : "bg-warning/20 text-warning border-warning/30"
                    }>
                      {zone.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Equipment:</span>
                      <span className="text-foreground font-medium">{zone.equipment}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Area:</span>
                      <span className="text-foreground font-medium">{zone.area}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {navigationLevel === "zone-detail" && selectedZone && (
          <>
            {/* Zone Detail View */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6 bg-panel-bg border-panel-border shadow-elevated">
                  <h3 className="text-2xl font-bold text-foreground mb-4">{selectedZone} Overview</h3>
                  <div className="aspect-video bg-gradient-to-br from-accent/20 via-primary/10 to-secondary/20 rounded-lg border-2 border-panel-border/50 flex items-center justify-center relative overflow-hidden group hover:border-primary/50 transition-all">
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <polygon points="20,20 80,20 90,50 70,80 30,80 10,50" fill="currentColor" className="text-primary" />
                      </svg>
                    </div>
                    <div className="text-center z-10">
                      <MapPin className="w-16 h-16 text-primary mx-auto mb-2 animate-pulse" />
                      <p className="text-lg font-bold text-foreground">{selectedZone} Polygon Map</p>
                      <p className="text-sm text-muted-foreground">Interactive zone boundary</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-panel-bg border-panel-border shadow-elevated">
                  <h3 className="text-lg font-bold text-foreground mb-4">Zone Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-success/10 to-transparent border border-success/20">
                      <p className="text-sm text-muted-foreground mb-1">Daily Output</p>
                      <p className="text-2xl font-bold text-foreground">1.4k t</p>
                      <p className="text-xs text-success mt-1">+12% vs yesterday</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                      <p className="text-sm text-muted-foreground mb-1">Efficiency</p>
                      <p className="text-2xl font-bold text-foreground">94%</p>
                      <p className="text-xs text-primary mt-1">Target: 90%</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-br from-accent/10 to-transparent border border-accent/20">
                      <p className="text-sm text-muted-foreground mb-1">Equipment</p>
                      <p className="text-2xl font-bold text-foreground">12</p>
                      <p className="text-xs text-accent mt-1">All operational</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-br from-warning/10 to-transparent border border-warning/20">
                      <p className="text-sm text-muted-foreground mb-1">Area</p>
                      <p className="text-2xl font-bold text-foreground">45 ha</p>
                      <p className="text-xs text-warning mt-1">Medium size</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="p-6 bg-panel-bg border-panel-border shadow-elevated">
                  <h3 className="text-xl font-bold text-foreground mb-4">{selectedZone} Efficiency</h3>
                  <CircularGauge value={94} max={100} label="%" color="hsl(var(--success))" />
                  <div className="mt-4 pt-4 border-t border-panel-border">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Target</span>
                      <span className="text-foreground font-medium">90%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Performance</span>
                      <span className="text-success font-medium">+4%</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-panel-bg border-panel-border shadow-elevated">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    Active Alerts
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-warning/10 border border-warning/30">
                      <p className="text-sm font-medium text-foreground mb-1">Maintenance Due</p>
                      <p className="text-xs text-muted-foreground">Equipment #3 requires service</p>
                    </div>
                    <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                      <p className="text-sm font-medium text-foreground mb-1">All Clear</p>
                      <p className="text-xs text-muted-foreground">No critical issues</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </MiningLayout>
  );
};

export default Index;