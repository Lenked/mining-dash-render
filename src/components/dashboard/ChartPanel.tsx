import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Area, AreaChart, Tooltip } from "recharts";

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

// Données pour l'histogramme des zones
const zonesHistogramData = [
  { zone: "Zone A", production: 4200, equipment: 12, efficiency: 94 },
  { zone: "Zone B", production: 3800, equipment: 8, efficiency: 95 },
  { zone: "Zone C", production: 2100, equipment: 15, efficiency: 60 },
  { zone: "Zone D", production: 5300, equipment: 10, efficiency: 107 },
];

export function ZonesHistogramChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={zonesHistogramData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="productionGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.5} />
          </linearGradient>
          <linearGradient id="equipmentGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#28BD66" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#28BD66" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="zone" 
          stroke="hsl(var(--muted-foreground))" 
          fontSize={12}
          tick={{ fill: 'hsl(var(--foreground))' }}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))" 
          fontSize={12}
          tick={{ fill: 'hsl(var(--foreground))' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--panel-bg))',
            border: '1px solid hsl(var(--panel-border))',
            borderRadius: '8px',
            color: 'hsl(var(--foreground))',
          }}
        />
        <Bar 
          dataKey="production" 
          fill="url(#productionGradient)" 
          radius={[4, 4, 0, 0]}
          name="Production (t/j)"
        />
        <Bar 
          dataKey="equipment" 
          fill="url(#equipmentGradient)" 
          radius={[4, 4, 0, 0]}
          name="Équipement"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Données pour le diagramme de ligne des zones
const zonesLineData = [
  { period: "Jan", production: 3200, efficiency: 85 },
  { period: "Fév", production: 3800, efficiency: 88 },
  { period: "Mar", production: 4200, efficiency: 92 },
  { period: "Avr", production: 4100, efficiency: 90 },
  { period: "Mai", production: 4500, efficiency: 94 },
  { period: "Juin", production: 4800, efficiency: 96 },
  { period: "Juil", production: 4600, efficiency: 93 },
  { period: "Août", production: 4900, efficiency: 97 },
];

export function ZonesLineChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={zonesLineData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="productionLineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="efficiencyLineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#28BD66" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#28BD66" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="period" 
          stroke="hsl(var(--muted-foreground))" 
          fontSize={12}
          tick={{ fill: 'hsl(var(--foreground))' }}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))" 
          fontSize={12}
          tick={{ fill: 'hsl(var(--foreground))' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--panel-bg))',
            border: '1px solid hsl(var(--panel-border))',
            borderRadius: '8px',
            color: 'hsl(var(--foreground))',
          }}
        />
        <Line 
          type="monotone" 
          dataKey="production" 
          stroke="#3B82F6" 
          strokeWidth={3}
          dot={{ fill: '#3B82F6', r: 4 }}
          activeDot={{ r: 6 }}
          name="Production (t/j)"
        />
        <Line 
          type="monotone" 
          dataKey="efficiency" 
          stroke="#28BD66" 
          strokeWidth={3}
          dot={{ fill: '#28BD66', r: 4 }}
          activeDot={{ r: 6 }}
          name="Efficacité (%)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}