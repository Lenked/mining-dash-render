import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  iconBg?: string;
}

export function StatsCard({ label, value, icon, iconBg = "hsl(var(--accent))" }: StatsCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 border border-panel-border/50 shadow-card hover:shadow-card-hover transition-all">
      {icon && (
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center shadow-elevated"
          style={{ backgroundColor: iconBg }}
        >
          {icon}
        </div>
      )}
      <div className="flex-1">
        <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}
