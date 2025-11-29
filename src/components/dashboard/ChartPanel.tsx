import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Area, AreaChart } from "recharts";

const barData = [
  { month: "Jul", value1: 60, value2: 80 },
  { month: "Aug", value1: 45, value2: 55 },
  { month: "Sep", value1: 70, value2: 90 },
  { month: "Oct", value1: 55, value2: 75 },
  { month: "Nov", value1: 85, value2: 95 },
  { month: "Dec", value1: 75, value2: 85 },
];

const lineData = [
  { x: 0, y: 30 },
  { x: 1, y: 45 },
  { x: 2, y: 35 },
  { x: 3, y: 60 },
  { x: 4, y: 50 },
  { x: 5, y: 70 },
  { x: 6, y: 65 },
  { x: 7, y: 80 },
];

export function AllSitesChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={barData}>
        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <Bar dataKey="value1" fill="hsl(var(--chart-secondary))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="value2" fill="hsl(var(--chart-primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function GridReportChart() {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <AreaChart data={lineData}>
        <defs>
          <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-secondary))" stopOpacity={0.8} />
            <stop offset="95%" stopColor="hsl(var(--chart-secondary))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="y"
          stroke="hsl(var(--chart-secondary))"
          fillOpacity={1}
          fill="url(#colorY)"
        />
        <Line
          type="monotone"
          dataKey="y"
          stroke="hsl(var(--destructive))"
          strokeWidth={2}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
