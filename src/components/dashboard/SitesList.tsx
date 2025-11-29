import { Badge } from "@/components/ui/badge";

interface Site {
  id: string;
  name: string;
  count: string;
  avatar: string;
}

const sites: Site[] = [
  { id: "1", name: "Lei", count: "585 Site", avatar: "L" },
  { id: "2", name: "Leike", count: "57,105 Alert", avatar: "L" },
];

export function SitesList() {
  return (
    <div className="space-y-3">
      {sites.map((site) => (
        <div
          key={site.id}
          className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-semibold">
            {site.avatar}
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">{site.name}</p>
            <p className="text-sm text-muted-foreground">{site.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
