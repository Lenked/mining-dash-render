import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer, LineChart as RechartsLineChart } from 'recharts';

interface LineChartProps {
  data: Array<Record<string, any>>;
  xKey: string;
  yKey: string;
  title?: string;
  color?: string;
}

export const LineChart = ({ data, xKey, yKey, title, color = 'hsl(var(--chart-primary))' }: LineChartProps) => {
  return (
    <div className="w-full h-64 bg-[#1A202C] rounded-xl p-4">
      {title && <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
          <XAxis
            dataKey={xKey}
            stroke="#A0AEC0"
            tick={{ fill: '#A0AEC0' }}
            axisLine={{ stroke: '#2D3748' }}
          />
          <YAxis
            stroke="#A0AEC0"
            tick={{ fill: '#A0AEC0' }}
            axisLine={{ stroke: '#2D3748' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1A202C',
              borderColor: '#2D3748',
              color: 'white',
              borderRadius: '0.5rem',
              border: '1px solid #2D3748'
            }}
            itemStyle={{ color: 'white' }}
            labelStyle={{ color: '#A0AEC0', fontWeight: 'bold' }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '10px',
              color: '#A0AEC0'
            }}
          />
          <Line
            type="monotone"
            dataKey={yKey}
            stroke={color}
            activeDot={{ r: 8, stroke: color, strokeWidth: 2, fill: '#0F1A24' }}
            strokeWidth={2}
            name={yKey}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};