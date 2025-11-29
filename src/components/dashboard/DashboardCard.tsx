import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function DashboardCard({ title, children, action, className = "" }: DashboardCardProps) {
  return (
    <div className={`bg-panel-bg border border-panel-border rounded-xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}
