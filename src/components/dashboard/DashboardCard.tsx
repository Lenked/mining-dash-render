import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function DashboardCard({ title, children, action, className = "" }: DashboardCardProps) {
  return (
    <div className={`bg-panel-bg border border-panel-border rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground tracking-tight">{title}</h2>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  );
}
