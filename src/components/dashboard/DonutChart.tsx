import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface DonutChartData {
  name: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutChartData[];
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
}

export function DonutChart({ 
  data, 
  innerRadius = 60, 
  outerRadius = 90,
  showLegend = false,
  showTooltip = true
}: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.03) return null; // Ne pas afficher les labels pour les segments trop petits
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        {/* Ombre du texte pour la lisibilité */}
        <text
          x={x + 1}
          y={y + 1}
          fill="rgba(0, 0, 0, 0.4)"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={12}
          fontWeight="bold"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
        {/* Texte principal */}
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={12}
          fontWeight="bold"
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))' }}
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-panel-bg border border-panel-border rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-semibold text-foreground">{payload[0].name}</p>
          <p className="text-xs text-muted-foreground">
            Valeur: <span className="text-foreground font-medium">{payload[0].value}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Pourcentage: <span className="text-foreground font-medium">
              {((payload[0].value / total) * 100).toFixed(1)}%
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))' }}>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <defs>
            {/* Filtre d'ombre simple pour les segments */}
            <filter id="segmentShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
              <feOffset dx="1" dy="2" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            fill="#8884d8"
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            paddingAngle={1}
            cornerRadius={3}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                style={{ filter: 'url(#segmentShadow)' }}
              />
            ))}
          </Pie>
          {showTooltip && <Tooltip content={<CustomTooltip />} />}
          {showLegend && (
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-xs text-muted-foreground">{value}</span>
              )}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

