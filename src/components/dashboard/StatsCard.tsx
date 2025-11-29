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
    <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
      {icon && (
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: iconBg }}
        >
          {icon}
        </div>
      )}
      <div className="flex-1">
        <p className="text-sm text-muted-foreground uppercase">{label}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}
