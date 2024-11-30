import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
const data = [
  { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 300, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 200, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 278, pv: 3908, amt: 2000 },
];

const Chart = () => {
  return (
    <div className="mt-5">
      <h3 className="subtext">Analytics</h3>
      <div className="pt-5">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart width={400} height={400} data={data}>
            <defs>
              <linearGradient id="bgGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="2%" stopColor="#e1f5fe" />
                <stop offset="100%" stopColor="#b3e5fc" />
              </linearGradient>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#bgGradient)"
            />
            <CartesianGrid stroke="#d0d0d0" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="uv" stroke="#0288d1" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
