import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Static {
  id: string;
  name: string;
  position: string;
  avatar: string;
  color: string;
  trend: "up" | "down";
  percentage: string;
}

const statics: Static[] = [
  { id: "1", name: "Rigalis", position: "Sect", avatar: "R", color: "hsl(var(--chart-secondary))", trend: "up", percentage: "+12.5%" },
  { id: "2", name: "Mapules", position: "Ived", avatar: "M", color: "hsl(var(--chart-tertiary))", trend: "up", percentage: "+8.2%" },
  { id: "3", name: "Centrois", position: "Ived", avatar: "C", color: "hsl(var(--chart-primary))", trend: "down", percentage: "-3.1%" },
];

export function RecentStatics() {
  return (
    <div className="space-y-3">
      {statics.map((stat) => (
        <div
          key={stat.id}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-all cursor-pointer border border-transparent hover:border-panel-border/30"
        >
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold shadow-card"
            style={{ backgroundColor: stat.color }}
          >
            {stat.avatar}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">{stat.name}</p>
            <p className="text-xs text-muted-foreground">{stat.position}</p>
          </div>
          <div className="flex items-center gap-1">
            {stat.trend === "up" ? (
              <TrendingUp className="w-4 h-4 text-success" />
            ) : (
              <TrendingDown className="w-4 h-4 text-destructive" />
            )}
            <span className={`text-sm font-semibold ${stat.trend === "up" ? "text-success" : "text-destructive"}`}>
              {stat.percentage}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
