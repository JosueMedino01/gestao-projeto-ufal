"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type PerformanceChartCardProps = {
  className?: string;
  values: number[];
};

export function PerformanceChartCard({
  className,
  values,
}: PerformanceChartCardProps) {
  const data = values.map((value, index) => ({
    day: `${index + 1}`,
    score: value,
    fill: value >= 70 ? "#2B69C8" : value >= 45 ? "#3C7EE0" : "#8FB3DD",
  }));

  return (
    <article className={`rounded-[24px] border border-border bg-surface p-5 shadow-[0_12px_24px_rgba(19,32,58,0.08)] ${className ?? ""}`}>
      <div className="flex h-full flex-col justify-center rounded-[18px] bg-linear-to-b from-[#f8fbff] to-[#eff4fb] p-4">
        <div className="h-[270px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              barCategoryGap={10}
              margin={{ top: 12, right: 8, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                vertical
                horizontal
                stroke="#CCD7E8"
                strokeDasharray="0"
              />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#7C8DA7", fontSize: 11 }}
              />
              <YAxis hide domain={[0, 100]} />
              <Bar dataKey="score" radius={[999, 999, 0, 0]} maxBarSize={26}>
                {data.map((entry) => (
                  <Cell key={entry.day} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </article>
  );
}
