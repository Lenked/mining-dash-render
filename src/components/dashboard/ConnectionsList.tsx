import { ChevronRight } from "lucide-react";

interface Connection {
  id: string;
  index: number;
  name: string;
  count: number;
}

const connections: Connection[] = [
  { id: "1", index: 1, name: "Notried", count: 92 },
  { id: "2", index: 2, name: "Texti Piens", count: 91 },
  { id: "3", index: 3, name: "Fantkali Farda", count: 99 },
  { id: "4", index: 3, name: "Avate Sahiers", count: 97 },
  { id: "5", index: 4, name: "Folitate Stites", count: 96 },
];

export function ConnectionsList() {
  return (
    <div className="space-y-2">
      {connections.map((conn) => (
        <div
          key={conn.id}
          className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors group cursor-pointer"
        >
          <span className="text-sm text-muted-foreground w-8">{conn.index}</span>
          <span className="text-sm text-muted-foreground w-8">{conn.index}</span>
          <span className="flex-1 text-sm text-foreground">{conn.name}</span>
          <span className="text-sm font-semibold text-foreground">{conn.count}</span>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      ))}
    </div>
  );
}
