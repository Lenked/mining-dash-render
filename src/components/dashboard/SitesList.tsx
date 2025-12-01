import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface Site {
  id: string;
  name: string;
  count: string;
  avatar: string;
  status: "online" | "offline";
}

interface SitesListProps {
  onSiteClick?: (siteName: string) => void;
}

const sites: Site[] = [
  { id: "1", name: "Lei", count: "585 Site", avatar: "L", status: "online" },
  { id: "2", name: "Leike", count: "57,105 Alert", avatar: "L", status: "offline" },
];

export function SitesList({ onSiteClick }: SitesListProps) {
  return (
    <div className="space-y-3">
      {sites.map((site) => (
        <div
          key={site.id}
          onClick={() => onSiteClick && onSiteClick(site.name)}
          className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-all border border-panel-border/30 cursor-pointer shadow-sm hover:shadow-card"
        >
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center text-accent-foreground font-bold text-lg shadow-card">
              {site.avatar}
            </div>
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-panel-bg ${
                site.status === "online" ? "bg-status-online" : "bg-status-offline"
              }`}
            />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">{site.name}</p>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">{site.count}</p>
            </div>
          </div>
          {site.status === "online" && (
            <Badge variant="secondary" className="bg-success/20 text-success border-success/30 text-xs">
              Active
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
}
