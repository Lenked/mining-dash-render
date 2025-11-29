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
} from "@/components/ui/sidebar";
import {
  Mountain,
  Radio,
  Swords,
  Route,
  Waves,
  BarChart3,
  Archive,
} from "lucide-react";

const navItems = [
  { title: "Mining", url: "/", icon: Mountain },
  { title: "Sonics", url: "/sonics", icon: Radio },
  { title: "Battles", url: "/battles", icon: Swords },
  { title: "Routes", url: "/routes", icon: Route },
  { title: "Sonars", url: "/sonars", icon: Waves },
  { title: "Statics", url: "/statics", icon: BarChart3 },
  { title: "Fonts", url: "/fonts", icon: Archive },
];

export function MiningSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      className={isCollapsed ? "w-16" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent>
        <div className="px-4 py-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-card">
              <Mountain className="w-6 h-6 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <span className="text-xl font-bold text-sidebar-foreground block">AquilaTrack</span>
                <span className="text-xs text-muted-foreground">Mining Dashboard</span>
              </div>
            )}
          </div>
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
