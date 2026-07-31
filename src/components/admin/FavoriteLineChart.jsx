import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const FavoriteLineChart = ({ year, setYear, data }) => {
  const chartData = data.map((item) => ({
    ...item,
    monthName: `Tháng ${item.month}`,
  }));

  return (
    <div className="rounded-xl bg-[#1f1f1f] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          Lượt yêu thích theo tháng
        </h2>

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="rounded bg-[#2b2b2b] px-3 py-2  text-white outline-none"
        >
          <option value={2025}>2025</option>
          <option value={2026}>2026</option>
          <option value={2027}>2027</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />

          <XAxis
            dataKey="monthName"
            stroke="#ccc"
          />

          <YAxis stroke="#ccc" />

          <Tooltip
          formatter={(value) => [value, "Số lượt yêu thích"]}
          />

          <Line
            type="monotone"
            dataKey="favoriteCount"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FavoriteLineChart;