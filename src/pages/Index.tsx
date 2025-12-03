import { MiningLayout } from "@/components/MiningLayout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { CircularGauge } from "@/components/dashboard/CircularGauge";
import { SitesList } from "@/components/dashboard/SitesList";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { MiningMap } from "@/components/dashboard/MiningMap";
import { 
  AllSitesChart, 
  ZonesHistogramChart, 
  ZonesLineChart 
} from "@/components/dashboard/ChartPanel";
import { TargetedSitesCard } from "@/components/dashboard/TargetedSitesCard";
import { AllSitesOverviewCard } from "@/components/dashboard/AllSitesOverviewCard";
import { TargetSitesCard } from "@/components/dashboard/TargetSitesCard";
// import { ZoneOverviewCard } from "@/components/dashboard/ZoneOverviewCard";
// import { SiteZonesMapCard } from "@/components/dashboard/SiteZonesMapCard";
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
  Car,
  CarIcon,
  BellIcon,
  DockIcon,
  UsersIcon,
  Truck
} from "lucide-react";
import { useState, useEffect } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import type { ReactElement, ReactNode } from 'react';
import { InteractiveMiningMap } from "@/components/dashboard/InteractiveMiningMap";
import { useNavigationView } from "@/context/NavigationViewContext";
import { InteractiveMiningPolygonMap } from "@/components/dashboard/InteractiveMiningPolygonMap";
import { GridDashboardContent } from "@/components/dashboard/GridDashboardContent";

// Mock data
const mockSites = [
  { id: 1, name: "Site Alpha", status: "online", zones: 3, production: "4.2k t/day", efficiency: "94%" },
  { id: 2, name: "Site Beta", status: "online", zones: 2, production: "3.8k t/day", efficiency: "95%" },
  { id: 3, name: "Site Gamma", status: "warning", zones: 4, production: "2.1k t/day", efficiency: "60%" },
  { id: 4, name: "Site Delta", status: "online", zones: 5, production: "5.3k t/day", efficiency: "107%" },
];

const mockZones = [
  { id: 1, name: "Overview", status: "active", equipment: 12, area: "45 ha" },
  { id: 2, name: "Zone A", status: "active", equipment: 12, area: "45 ha" },
  { id: 3, name: "Zone B", status: "active", equipment: 8, area: "32 ha" },
  { id: 4, name: "Zone C", status: "maintenance", equipment: 15, area: "67 ha" },
];

// Données de la flotte de véhicules
const fleetData = [
  { id: 'C001', type: 'truck', status: 'active', site: 'Site Alpha', capacity: '25t', lastUpdate: 'Il y a 10 min' },
  { id: 'C002', type: 'truck', status: 'maintenance', site: 'Atelier', capacity: '25t', lastUpdate: 'Il y a 2h' },
  { id: 'C003', type: 'truck', status: 'in-transit', site: 'Route vers Site Beta', capacity: '25t', lastUpdate: 'Il y a 5 min' },
  { id: 'C004', type: 'truck', status: 'active', site: 'Site Gamma', capacity: '25t', lastUpdate: 'Il y a 30 min' },
  { id: 'C005', type: 'truck', status: 'inactive', site: 'Garage', capacity: '25t', lastUpdate: 'Hier' },
  { id: 'R001', type: 'trailer', status: 'active', site: 'Site Alpha', capacity: '30t', lastUpdate: 'Il y a 15 min' },
  { id: 'R002', type: 'trailer', status: 'active', site: 'Zone de chargement', capacity: '30t', lastUpdate: 'Il y a 45 min' },
  { id: 'R003', type: 'trailer', status: 'maintenance', site: 'Atelier', capacity: '30t', lastUpdate: 'Il y a 3h' },
  { id: 'R004', type: 'trailer', status: 'in-transit', site: 'Route vers Site Delta', capacity: '30t', lastUpdate: 'Il y a 20 min' },
  { id: 'R005', type: 'trailer', status: 'active', site: 'Site Beta', capacity: '30t', lastUpdate: 'Il y a 1h' },
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

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleAction = (actionId: string) => {
    switch (actionId) {
      case 'refresh':
        handleRefresh();
        break;
      case 'export':
        alert(`Exporting data for ${label}`);
        break;
      case 'duplicate':
        alert(`Duplicating tab: ${label}`);
        break;
      case 'close':
        if (onClose) {
          onClose();
        }
        break;
      case 'close-others':
        alert('Closing other tabs');
        break;
      case 'close-right':
        alert('Closing tabs to the right');
        break;
      case 'vue-temps-reel':
        // Handled by parent component via onClick
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
  const { activeView } = useNavigationView();
  const [activeTab, setActiveTab] = useState<string>("all-sites");
  const [searchQuery, setSearchQuery] = useState("");
  const [navigationLevel, setNavigationLevel] = useState<NavigationLevel>("all-sites");
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [navigationHistory, setNavigationHistory] = useState<HistoryItem[]>([{level: "all-sites"}]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [activeFleetFilter, setActiveFleetFilter] = useState<'all' | 'truck' | 'trailer'>('all');
  const [showFleetData, setShowFleetData] = useState(false);
  const [content, setContent] = useState<'stat' | 'table'>("stat");
  const [hideSubHeader, setHideSubHeader] = useState(false)

  // Set showFleetData to true when on Overview tab with 'all' filter by default
  useEffect(() => {
    if ((activeTab === "all-sites" || activeTab === "realtime-ops") && activeFleetFilter === 'all') {
      setShowFleetData(true);
    } else {
      // Hide fleet data if not on Overview tab or not on 'all' filter
      setShowFleetData(false);
    }
  }, [activeTab, activeFleetFilter]);

  // Effect to handle navigation view changes from the sidebar
  useEffect(() => {
    if (activeView === 'realtime-ops') {
      setActiveTab("all-sites");
      setNavigationLevel("all-sites");
      setHideSubHeader(true)
      setSelectedSite(null);
      setSelectedZone(null);
      setContent("table"); // Show table view for real-time operations
      setActiveFleetFilter('all'); // Set 'all' filter by default


      
      
    } else {
      // Reset to default dashboard view
      setActiveTab("all-sites");
      setContent("stat");
    }
  }, [activeView]);

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
    // Don't change the activeTab to zone name since zones are no longer in the main tab list
    // Keep the site tab active while showing zone details
    const newHistory = navigationHistory.slice(0, historyIndex + 1);
    newHistory.push({level: "zone-detail", site: selectedSite, zone: zoneName});
    setNavigationHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    // Show table view when clicking on a zone
    setContent("table");
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const historyItem = navigationHistory[newIndex];
      setHistoryIndex(newIndex);
      setNavigationLevel(historyItem.level);
      setSelectedSite(historyItem.site || null);
      setSelectedZone(historyItem.zone || null);

      // Restore content based on navigation level
      if (historyItem.level === "all-sites") {
        setActiveTab("all-sites");
        setShowFleetData(false); // Réinitialiser l'affichage de la flotte
        setContent("stat"); // Set to stats view for all sites
      } else if (historyItem.level === "site-zones") {
        // Find the site tab that should be active
        if (historyItem.site) {
          setActiveTab(historyItem.site.toLowerCase().replace(" ", "-"));
        }
        setContent("stat"); // Set to stats view when returning to site-zones
      } else {
        // When going back from zone detail, go back to site-zones view
        if (historyItem.site) {
          setActiveTab(historyItem.site.toLowerCase().replace(" ", "-"));
        }
        setContent("table"); // Show table view for zone-detail level
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

      // Set content based on navigation level
      if (historyItem.level === "all-sites") {
        setActiveTab("all-sites");
        setShowFleetData(false); // Réinitialiser l'affichage de la flotte
        setContent("stat"); // Set to stats view for all sites
      } else if (historyItem.level === "site-zones") {
        // Find the site tab that should be active
        if (historyItem.site) {
          setActiveTab(historyItem.site.toLowerCase().replace(" ", "-"));
        }
        setContent("stat"); // Set to stats view when going to site-zones
      } else {
        // When going forward to zone detail, keep the site tab active
        if (historyItem.site) {
          setActiveTab(historyItem.site.toLowerCase().replace(" ", "-"));
        }
        setContent("table"); // Show table view for zone-detail level
      }
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  // Fonction pour filtrer les données de la flotte selon le filtre sélectionné
  const getFilteredFleetData = () => {
    if (activeFleetFilter === 'all') {
      return fleetData;
    }
    return fleetData.filter(vehicle => vehicle.type === activeFleetFilter);
  };

  // Fonction pour déterminer si afficher le contenu de la flotte
  const shouldShowFleetContent = () => {
    return showFleetData && activeFleetFilter !== 'all';
  };

  const getTabs = () => {
    if (navigationLevel === "all-sites") {
      return [
        { id: "all-sites", label: "Overview" },
        //{ id: "realtime-ops", label: "Vue Temps Réel" }, // Add the real-time operations tab
        ...mockSites.map(site => ({ id: site.name.toLowerCase().replace(" ", "-"), label: site.name }))
      ];
    } else {
      return [
        { id: "all-sites", label: "Overview" },
        //{ id: "realtime-ops", label: "Vue Temps Réel" }, // Add the real-time operations tab
        ...mockSites.map(site => ({ id: site.name.toLowerCase().replace(" ", "-"), label: site.name }))
      ];
    }
  };

  return (
    <MiningLayout >
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
                    setShowFleetData(false); // Réinitialiser l'affichage de la flotte
                    setContent("stat"); // Show dashboard view for normal overview
                     setActiveFleetFilter('all');
                  } else if (tab.id === "realtime-ops") {
                    // For the real-time operations tab, show fleet management view
                    setNavigationLevel("all-sites");
                    setSelectedSite(null);
                    setSelectedZone(null);
                    setContent("table"); // Show table view for real-time operations
                    setActiveFleetFilter('all'); // Set the 'all' filter by default
                  } else {
                    // Check if this tab corresponds to a specific site
                    const siteName = mockSites.find(site =>
                      site.name.toLowerCase().replace(" ", "-") === tab.id
                    )?.name;

                    if (siteName) {
                      setSelectedSite(siteName);
                      setNavigationLevel("site-zones");
                      setShowFleetData(false); // Réinitialiser l'affichage de la flotte
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

        {/* Zones as sous-onglets - displayed when viewing a specific site or zone details */}
        {(navigationLevel === "site-zones" || navigationLevel === "zone-detail") && selectedSite && (
          <div className="flex items-center justify-start px-6 py-3 border-b border-panel-border/50 bg-background/50">
            <div className="flex items-center space-x-2 bg-panel-bg p-1 rounded-full border border-panel-border shadow-sm">
              {mockZones.map((zone) => (
                <button
                  key={zone.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    (selectedZone ? selectedZone === zone.name : zone.id === 1)
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                  onClick={() => handleZoneClick(zone.name)}
                >
                  {zone.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Barre de filtre pour la flotte de véhicules - visible in real-time operations view and when viewing zone details */}
        {content === "table" && (activeTab === "all-sites" || selectedZone) && (
          <div className="flex items-center justify-start px-6 py-3 border-b border-panel-border/50 bg-background/50">
            <div className="flex items-center space-x-2 bg-panel-bg p-1 rounded-full border border-panel-border shadow-sm">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFleetFilter === 'all'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
                onClick={() => {
                  setActiveFleetFilter('all');
                  setContent("table")
                }}
              >
                Tous
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFleetFilter === 'truck'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
                onClick={() => {
                  setActiveFleetFilter('truck');
                  setContent("table")
                }}
              >
                Camion
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFleetFilter === 'trailer'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
                onClick={() => {
                  setActiveFleetFilter('trailer');
                  setContent("table")
                }}
              >
                Remorque
              </button>
            </div>
          </div>
        )}

        {/* Search and Actions Bar */}
       {!hideSubHeader ? (
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
       ) : null}
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-8 animate-fade-in">
        {/* Dashboard with Draggable Grid */}
        {content === "stat" && navigationLevel !== "zone-detail" && !selectedZone && (navigationLevel === "all-sites" ||
            mockSites.some(site => site.name.toLowerCase().replace(" ", "-") === activeTab)) && (
            <>
              {/* Top Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-9">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Panel - Nombres de sites */}
                    <div className="lg:col-span-4">
                      <TargetedSitesCard onSiteClick={handleSiteClick} />
                    </div>

                    {/* Center - Map */}
                    <div className="lg:col-span-8">
                      <AllSitesOverviewCard
                        navigationLevel={navigationLevel}
                        selectedSite={selectedSite}
                      />
                    </div>

                    <div className="lg:col-span-12">
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
                    </div>
                  </div>
                </div>

                {/* Right Panel - Target Sites Stats */}
                <div className="lg:col-span-3">
                <TargetSitesCard onSiteClick={handleSiteClick} />
                </div>
              </div>
            </>
          )}
        

        {navigationLevel === "site-zones" && selectedSite && (
          <>
            {/* Site Zones View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/** CHECKPOINT */}
              {/* Left Panel */}
              <div className="lg:col-span-3">
                <TargetedSitesCard onSiteClick={handleSiteClick} />
              </div>

              {/* Center - Zones Map */}
              <div className="lg:col-span-6 space-y-6">
                {/* <SiteZonesMapCard selectedSite={selectedSite} /> */}
                
                {/* Line Chart Section */}
                <DashboardCard
                  title="Évolution des Performances"
                  action={
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Tendances
                    </Badge>
                  }
                >
                  <ZonesLineChart />
                </DashboardCard>
              </div>

              {/* Right Panel */}
              <div className="lg:col-span-3">
                <TargetSitesCard onSiteClick={handleSiteClick} />
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
            {/* Zone Detail View - Similar to Overview but with polygon map */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                <div className="lg:col-span-9">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Left Panel - Nombres de sites */}
                <div className="lg:col-span-4">
                  <TargetedSitesCard onSiteClick={handleSiteClick} />
                </div>

                {/* Center - Polygon Map for the selected zone */}
                <div className="lg:col-span-8">
                  {/* <ZoneOverviewCard selectedZone={selectedZone} /> */}
                </div>
                    <div className="lg:col-span-12">
                       {/* Zone-specific information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {mockZones.map((zone) => {
                            if (zone.name !== selectedZone) {
                              return null;
                            }
                            return (
                              <Card
                                key={zone.id}
                                className="p-4 bg-panel-bg border-panel-border shadow-card transition-all duration-300"
                              >
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-accent" />
                                    <h4 className="font-bold text-foreground">{zone.name}</h4>
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
                                  <div className="flex justify-between text-muted-foreground">
                                    <span>Site:</span>
                                    <span className="text-foreground font-medium">{selectedSite}</span>
                                  </div>
                                </div>
                              </Card>
                            );
                          })}
                        </div>
                    </div>
                  </div>
                </div>


                {/* Right Panel - Zone Stats */}
                <div className="lg:col-span-3">
                  <TargetSitesCard onSiteClick={handleSiteClick} />
                </div>
              </div>
          </>
        )}

        {/* Fleet Data Table - Displayed when showFleetData is true */}
        {showFleetData && (activeTab === "all-sites" || activeTab === "realtime-ops") && content === "table" && (
          <div className="mt-8">
            <div className="bg-panel-bg border border-panel-border rounded-xl shadow-elevated p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  {activeFleetFilter === 'all' && 'Tous les véhicules'}
                  {activeFleetFilter === 'truck' && 'Camions'}
                  {activeFleetFilter === 'trailer' && 'Remorques'}
                </h2>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-10">
                {/* En transit */}
                <div className="bg-secondary/30 p-4 rounded-lg border border-panel-border flex flex-col h-full min-h-[140px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                      <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xl font-bold text-foreground truncate">24</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 truncate">En transit</p>
                  <div className="mt-auto">
                    <div className="h-1.5 bg-primary/20 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-3/4"></div>
                    </div>
                  </div>
                </div>

                {/* Dans la file d'attente */}
                <div className="bg-secondary/30 p-4 rounded-lg border border-panel-border flex flex-col h-full min-h-[140px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                      <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xl font-bold text-foreground truncate">24</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 truncate">File d'attente</p>
                  <div className="mt-auto">
                    <div className="h-1.5 bg-primary/20 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-3/4"></div>
                    </div>
                  </div>
                </div>

                {/* Chargement */}
                <div className="bg-secondary/30 p-4 rounded-lg border border-panel-border flex flex-col h-full min-h-[140px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-success/10 rounded-lg flex-shrink-0">
                      <Zap className="w-5 h-5 text-success" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xl font-bold text-foreground truncate">18</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 truncate">Chargement</p>
                  <div className="mt-auto">
                    <div className="h-1.5 bg-success/20 rounded-full overflow-hidden">
                      <div className="h-full bg-success w-2/3"></div>
                    </div>
                  </div>
                </div>

                {/* Déchargement */}
                <div className="bg-secondary/30 p-4 rounded-lg border border-panel-border flex flex-col h-full min-h-[140px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-accent/10 rounded-lg flex-shrink-0">
                      <BarChart3 className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xl font-bold text-foreground truncate">86.6%</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 truncate">Déchargement</p>
                  <div className="mt-auto">
                    <div className="h-1.5 bg-accent/20 rounded-full overflow-hidden">
                      <div className="h-full bg-accent w-4/5"></div>
                    </div>
                  </div>
                </div>

                {/* Retour à la base */}
                <div className="bg-secondary/30 p-4 rounded-lg border border-panel-border flex flex-col h-full min-h-[140px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-warning/10 rounded-lg flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-warning" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xl font-bold text-foreground truncate">92%</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 truncate">Retour base</p>
                  <div className="mt-auto">
                    <div className="h-1.5 bg-warning/20 rounded-full overflow-hidden">
                      <div className="h-full bg-warning w-5/6"></div>
                    </div>
                  </div>
                </div>

                {/* Maintenance */}
                <div className="bg-secondary/30 p-4 rounded-lg border border-panel-border flex flex-col h-full min-h-[140px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-warning/10 rounded-lg flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-warning" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xl font-bold text-foreground truncate">92%</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 truncate">Maintenance</p>
                  <div className="mt-auto">
                    <div className="h-1.5 bg-warning/20 rounded-full overflow-hidden">
                      <div className="h-full bg-warning w-5/6"></div>
                    </div>
                  </div>
                </div>

                {/* Inactif */}
                <div className="bg-secondary/30 p-4 rounded-lg border border-panel-border flex flex-col h-full min-h-[140px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-warning/10 rounded-lg flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-warning" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xl font-bold text-foreground truncate">92%</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 truncate">Inactif</p>
                  <div className="mt-auto">
                    <div className="h-1.5 bg-warning/20 rounded-full overflow-hidden">
                      <div className="h-full bg-warning w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/**En transit
              Dans la file d'attente
              Chargement
              Déchargement
              Retour à la base
              Maintenance
              Inactif */}
              {/* Fleet Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/30">
                    <tr>
                      <th className="py-3 px-4 text-left text-white">Véhicule</th>
                      <th className="py-3 px-4 text-left text-white">Catégorie</th>
                      <th className="py-3 px-4 text-left text-white">Statut</th>
                      <th className="py-3 px-4 text-left text-white">Site</th>
                      <th className="py-3 px-4 text-left text-white">Capacité</th>
                      <th className="py-3 px-4 text-left text-white">Dernière mise à jour</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredFleetData().map((vehicle) => (
                      <tr key={vehicle.id} className="border-t border-panel-border/50 hover:bg-secondary/20 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                          {vehicle.type === 'truck' ? (
                                // <Car className="w-5 h-5 text-primary" />
                                <img className="w-10 h-10 text-primary" src="/truck.png" alt="" />
                              ) : (
                                // <Truck className="w-5 h-5 text-accent" />
                                <img className="w-10 h-10 text-primary" src="/van.png" alt="" />
                              )}
                            <span className="font-medium text-white">{vehicle.id}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 capitalize text-white">
                          {vehicle.type === 'truck' ? 'Camion' : 'Remorque'}
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={`
                              border-transparent ${vehicle.status === 'active' ? 'bg-success/20 text-success' :
                              vehicle.status === 'maintenance' ? 'bg-warning/20 text-warning' :
                              vehicle.status === 'in-transit' ? 'bg-primary/20 text-primary' :
                              'bg-destructive/20 text-destructive'}
                            `}
                          >
                            {vehicle.status === 'active' && 'Actif'}
                            {vehicle.status === 'maintenance' && 'Maintenance'}
                            {vehicle.status === 'in-transit' && 'En transit'}
                            {vehicle.status === 'inactive' && 'Inactif'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-white">{vehicle.site}</td>
                        <td className="py-3 px-4 text-white">{vehicle.capacity}</td>
                        <td className="py-3 px-4 text-muted-foreground">{vehicle.lastUpdate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

    </MiningLayout>
  );
};

export default Index;