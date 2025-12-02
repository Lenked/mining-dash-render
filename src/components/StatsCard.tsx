import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatsCardProps {
  value: number;
  label: string;
  variant: "success" | "offline" | "warning" | "destructive" | "primary" | "white";
  icon?: ReactNode;
  description?: string;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
}

export const StatsCard = ({ 
  value, 
  label, 
  variant, 
  icon, 
  description, 
  trend,
  className 
}: StatsCardProps) => {
  const variantStyles: Record<StatsCardProps["variant"], string> = {
    success: "bg-gradient-to-br from-success/5 to-success/15 text-success border-success/30 shadow-success/5",
    offline: "bg-gradient-to-br from-offline/5 to-offline/15 text-offline border-offline/30 shadow-offline/5",
    warning: "bg-gradient-to-br from-warning/5 to-warning/15 text-warning border-warning/30 shadow-warning/5",
    destructive: "bg-gradient-to-br from-destructive/5 to-destructive/15 text-destructive border-destructive/30 shadow-destructive/5",
    primary: "bg-gradient-to-br from-primary/5 to-primary/15 text-primary border-primary/30 shadow-primary/5",
    white: "bg-gradient-to-br from-white/10 to-white/5 text-white border-white/20 shadow-white/5",
  };

  const getTrendColor = () => {
    if (!trend) return "";
    if (trend.value > 0) return "text-success";
    if (trend.value < 0) return "text-destructive";
    return "text-muted-foreground";
  };

  const formatTrendValue = (val: number) => {
    return `${val > 0 ? "+" : ""}${val}%`;
  };

  return (
    <Card className={cn(
      "group relative p-2 pt-1 flex flex-col transition-all duration-300",
      "hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
      "border border-solid",
      variantStyles[variant],
      className
    )}>
      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 to-transparent 
        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      
      {/* En-tête avec icône et label */}
      <div className="flex items-center justify-between mb-4">
        {/* <div className="flex items-center gap-2">
          {icon && (
            <div className={cn(
              "p-2 rounded-lg flex items-center justify-center",
              variant === "white" ? "bg-white/20" : "bg-current/10"
            )}>
              <div className="text-xl">{icon}</div>
            </div>
          )}
          
        </div> */}
        
        {/* Indicateur de tendance */}
        {trend && (
          <div className={cn(
            "text-xs font-semibold px-2 py-1 rounded-full",
            getTrendColor(),
            variant === "white" ? "bg-white/20" : "bg-current/5"
          )}>
            {formatTrendValue(trend.value)}
            <span className="ml-1 text-xs opacity-70">{trend.label}</span>
          </div>
        )}
      </div>

      {/* Valeur principale */}
      <div className="mb-2">
        <div className="text-3xl font-semibold tracking-tight">
          {value.toLocaleString()}
        </div>
        
        {/* Description optionnelle */}
        {description && (
          <div className="text-sm mt-1 opacity-70 leading-relaxed">
            {description}
          </div>
        )}
      </div>

      <div className="font-medium opacity-70 tracking-wide uppercase" style={{fontSize: 10}}>
            {label}
          </div>
      {/* Barre de progression subtile
      <div className="mt-4">
        <div className="h-1 w-full bg-current/10 rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full transition-all duration-700",
              variant === "white" ? "bg-white/40" : "bg-current/40"
            )}
            style={{ 
              width: `${Math.min(100, Math.max(10, (value % 100)))}%` 
            }}
          />
        </div>
      </div> */}
    </Card>
  );
};