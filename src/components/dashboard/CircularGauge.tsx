interface CircularGaugeProps {
  value: number;
  max: number;
  label: string;
  color?: string;
}

export function CircularGauge({ value, max, label, color = "hsl(var(--chart-primary))" }: CircularGaugeProps) {
  const percentage = (value / max) * 100;
  const strokeDasharray = 2 * Math.PI * 45;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

  return (
    <div className="relative w-44 h-44">
      <div className="absolute inset-0 bg-gradient-to-br from-panel-bg to-secondary rounded-full shadow-elevated"></div>
      <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 100 100">
        {/* Outer glow */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="hsl(var(--gauge-track))"
          strokeWidth="6"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          filter="url(#glow)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <span className="text-4xl font-bold text-foreground mb-1">{value}</span>
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{label}</span>
        <div className="mt-2 px-3 py-1 bg-secondary/70 rounded-full">
          <span className="text-xs font-semibold" style={{ color }}>{percentage.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
}
