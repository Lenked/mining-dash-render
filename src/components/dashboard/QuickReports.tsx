import { ChevronRight, CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Report {
  id: string;
  status: "success" | "pending" | "warning";
  time: string;
  name: string;
  badge?: string;
  percentage: string;
}

const reports: Report[] = [
  { id: "1", status: "success", time: "18.1", name: "Segemend", badge: "Basi", percentage: "90%" },
  { id: "2", status: "success", time: "18.8", name: "Shengers", percentage: "90%" },
  { id: "3", status: "warning", time: "19.0", name: "Alert", badge: "Pamit", percentage: "18%" },
  { id: "4", status: "success", time: "21.8", name: "Blestler", percentage: "72%" },
  { id: "5", status: "pending", time: "19.0", name: "ElooPete", percentage: "16%" },
];

export function QuickReports() {
  return (
    <div className="space-y-2">
      {reports.map((report) => (
        <div
          key={report.id}
          className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-all group cursor-pointer border border-transparent hover:border-panel-border/30"
        >
          <div className="flex items-center gap-2 min-w-[90px]">
            {report.status === "success" && (
              <CheckCircle2 className="w-5 h-5 text-success" />
            )}
            {report.status === "warning" && (
              <AlertCircle className="w-5 h-5 text-warning" />
            )}
            {report.status === "pending" && (
              <Clock className="w-5 h-5 text-muted-foreground animate-pulse" />
            )}
            <span className="text-sm font-mono font-semibold text-foreground bg-secondary/70 px-2.5 py-1 rounded-md shadow-sm">
              {report.time}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <Circle className={`w-2 h-2 ${
              report.status === "success" ? "fill-success" :
              report.status === "warning" ? "fill-warning" :
              "fill-muted-foreground"
            }`} />
            <span className="text-sm font-medium text-foreground">{report.name}</span>
            {report.badge && (
              <Badge variant="secondary" className="text-xs bg-accent/20 text-accent border-accent/30">
                {report.badge}
              </Badge>
            )}
          </div>
          <span className={`text-sm font-bold w-16 text-right ${
            parseInt(report.percentage) > 70 ? "text-success" :
            parseInt(report.percentage) > 40 ? "text-warning" :
            "text-destructive"
          }`}>
            {report.percentage}
          </span>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      ))}
    </div>
  );
}
