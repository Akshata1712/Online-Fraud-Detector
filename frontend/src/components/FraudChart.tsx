
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  type: string;
  count: number;
}

interface FraudChartProps {
  data: ChartData[];
}

const FraudChart = ({ data }: FraudChartProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-600">
          <p className="font-semibold text-white">{`${label}`}</p>
          <p className="text-cyan-400">
            {`Fraud Count: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-700">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white">Fraud Distribution by Type</h3>
        <p className="text-gray-300 mt-1">Number of fraudulent transactions by transaction type</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="type" 
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={{ stroke: '#6b7280' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={{ stroke: '#6b7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="count" 
              fill="url(#colorGradient)"
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80 transition-opacity duration-200"
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#0891b2" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-5 gap-2">
        {data.map((item, index) => (
          <div key={item.type} className="text-center p-2 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="text-xs font-medium text-gray-300">{item.type}</div>
            <div className="text-lg font-bold text-cyan-400">{item.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FraudChart;
