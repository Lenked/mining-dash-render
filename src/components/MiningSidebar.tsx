import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Mountain,
  Radio,
  Swords,
  Route,
  Waves,
  BarChart3,
  Archive,
  AreaChart,
  DockIcon,
  CarIcon,
  BellIcon,
  TimerIcon,
  RefreshCwIcon,
  CircleArrowOutDownRightIcon,
  SettingsIcon,
  HistoryIcon,
  Tractor,
  UserCheck,
  MessageCircle,
  PanelLeft,
} from "lucide-react";
import { useState } from "react";
import { useNavigationView } from "@/context/NavigationViewContext";

const navItems = [
  { title: "Vue temps reel des operations", url: "", icon: TimerIcon },
  { title: "Tracking", url: "/tracking", icon: Tractor },
  { title: "Gestion des Trajets", url: "/sonics", icon: CarIcon },
  { title: "Gestion des Notifications", url: "/battles", icon: BellIcon },
  { title: "Gestion des Sites", url: "/routes", icon: AreaChart },
  { title: "Rapport", url: "/sonars", icon: DockIcon },
  { title: "Analyses", url: "/statics", icon: BarChart3 },
  { title: "Historique des Actions", url: "/statics", icon: HistoryIcon },
  { title: "Parametres", url: "/statics", icon: SettingsIcon },
  { title: "Support", url: "/support", icon: UserCheck },
  { title: "Chat", url: "/chat", icon: MessageCircle },

];

export function MiningSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";
  const [activeSidebar, setActiveSidebar] = useState("");
  const { setActiveView } = useNavigationView();

  const ClickItems = (item) => {
    setActiveSidebar(item.title);

    // When "Vue temps reel des operations" is clicked, set the active view
    if (item.title === "Vue temps reel des operations") {
      setActiveView("realtime-ops");
    }
  }

  return (
    <Sidebar
      className={isCollapsed ? "w-16" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent>
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-2">
            {isCollapsed ? (
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-card">
                <Mountain className="w-4 h-4 text-secondary-foreground" />
              </div>
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-card">
                <Mountain className="w-6 h-6 text-secondary-foreground" />
              </div>
            )}
            {!isCollapsed && (
              <>
                <div>
                  <span className="text-xl font-bold text-sidebar-foreground block">FS IOT Mining</span>
                  <span className="text-xs text-muted-foreground">Fleet Solution IOT Mining</span>
                </div>
                <div className="ml-auto">
                  <SidebarTrigger className="p-2 rounded-lg transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground" />
                </div>
              </>
            )}
          </div>

          {/* Bouton pour étendre/réduire le sidebar (mode réduit) */}
          {isCollapsed && (
            <div className="flex justify-center">
              <SidebarTrigger className="mt-1 p-2 rounded-lg transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground" />
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                       <NavLink
                        to={item.url}
                        onClick={() => ClickItems(item)}
                        end
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-card"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                        }`}
                      >
                        <item.icon className={`w-6 h-6 flex-shrink-0 transition-transform ${isActive ? "scale-110" : ""}`} />
                        {!isCollapsed && <span className="font-medium">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
