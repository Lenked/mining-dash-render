import { ChevronRight, Radio } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Connection {
  id: string;
  index: number;
  name: string;
  count: number;
  status: "online" | "warning" | "offline";
}

const connections: Connection[] = [
  { id: "1", index: 1, name: "Notried", count: 92, status: "online" },
  { id: "2", index: 2, name: "Texti Piens", count: 91, status: "online" },
  { id: "3", index: 3, name: "Fantkali Farda", count: 99, status: "warning" },
  { id: "4", index: 4, name: "Avate Sahiers", count: 97, status: "online" },
  { id: "5", index: 5, name: "Folitate Stites", count: 96, status: "offline" },
];

export function ConnectionsList() {
  return (
    <div className="space-y-2">
      {connections.map((conn) => (
        <div
          key={conn.id}
          className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-all group cursor-pointer border border-transparent hover:border-panel-border/30"
        >
          <div className="flex items-center gap-2 min-w-[60px]">
            <span className="text-sm font-semibold text-muted-foreground">{conn.index}</span>
            <Radio 
              className={`w-3 h-3 ${
                conn.status === "online" ? "text-status-online" : 
                conn.status === "warning" ? "text-warning" : 
                "text-status-offline"
              } animate-pulse`}
            />
          </div>
          <span className="flex-1 text-sm font-medium text-foreground">{conn.name}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground bg-secondary/70 px-2.5 py-1 rounded-md">
              {conn.count}
            </span>
            <Badge 
              variant="secondary" 
              className={`text-xs ${
                conn.status === "online" ? "bg-success/20 text-success border-success/30" : 
                conn.status === "warning" ? "bg-warning/20 text-warning border-warning/30" : 
                "bg-muted text-muted-foreground border-border"
              }`}
            >
              {conn.status}
            </Badge>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      ))}
    </div>
  );
}
