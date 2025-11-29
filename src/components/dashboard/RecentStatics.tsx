interface Static {
  id: string;
  name: string;
  position: string;
  avatar: string;
  color: string;
}

const statics: Static[] = [
  { id: "1", name: "Rigalis", position: "Sect", avatar: "R", color: "hsl(var(--chart-secondary))" },
  { id: "2", name: "Mapules", position: "Ived", avatar: "M", color: "hsl(var(--chart-tertiary))" },
  { id: "3", name: "Centrois", position: "Ived", avatar: "C", color: "hsl(var(--chart-primary))" },
];

export function RecentStatics() {
  return (
    <div className="space-y-3">
      {statics.map((stat) => (
        <div
          key={stat.id}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
            style={{ backgroundColor: stat.color }}
          >
            {stat.avatar}
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">{stat.name}</p>
            <p className="text-sm text-muted-foreground">{stat.position}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
