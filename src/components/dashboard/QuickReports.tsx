import { ChevronRight, CheckCircle2, Circle } from "lucide-react";
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
  { id: "3", status: "success", time: "19.0", name: "Alert", badge: "Pamit", percentage: "18%" },
  { id: "4", status: "success", time: "21.8", name: "Blestler", percentage: "72%" },
  { id: "5", status: "success", time: "19.0", name: "ElooPete", percentage: "16%" },
];

export function QuickReports() {
  return (
    <div className="space-y-2">
      {reports.map((report) => (
        <div
          key={report.id}
          className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-2 w-24">
            {report.status === "success" && (
              <CheckCircle2 className="w-5 h-5 text-success" />
            )}
            <span className="text-sm font-mono text-foreground bg-secondary/70 px-2 py-1 rounded">
              {report.time}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <Circle className="w-2 h-2 fill-foreground" />
            <span className="text-sm text-foreground">{report.name}</span>
            {report.badge && (
              <Badge variant="secondary" className="text-xs">
                {report.badge}
              </Badge>
            )}
          </div>
          <span className="text-sm font-semibold text-foreground w-16 text-right">
            {report.percentage}
          </span>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      ))}
    </div>
  );
}
