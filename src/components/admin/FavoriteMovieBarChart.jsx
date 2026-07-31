import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const FavoriteMovieBarChart = ({ data }) => {
    return (
        <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-white">
                    Top 5 phim được yêu thích
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                    Thống kê số lượt yêu thích của các bộ phim.
                </p>
            </div>

            <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{
                            top: 10,
                            right: 20,
                            left: -30,
                            bottom: 10,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#27272a"
                        />

                        <XAxis
                            type="number"
                            tick={{ fill: "#a1a1aa" }}
                            allowDecimals={false}
                        />

                        <YAxis
                            type="category"
                            dataKey="name"
                            width={110}
                            tick={{ fill: "#e4e4e7", fontSize: 13 }}
                            tickFormatter={(value) =>
                                value.length > 20
                                    ? value.slice(0, 20) + "..."
                                    : value
                            }
                        />

                        <Tooltip
                            cursor={{ fill: "#18181b" }}
                            contentStyle={{
                                background: "#18181b",
                                border: "1px solid #3f3f46",
                                borderRadius: "12px",
                                color: "#fff",
                            }}
                            labelStyle={{
                                color: "#fff",
                            }}
                            formatter={(value) => [value, "Số lượt yêu thích"]}
                        />

                        <Bar
                            dataKey="favoriteCount"
                            fill="#ef4444"
                            radius={[0, 8, 8, 0]}
                            barSize={24}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default FavoriteMovieBarChart;