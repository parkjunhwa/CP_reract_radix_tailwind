"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { categoryData } from "@/lib/data";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#13131f] border border-white/10 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-white font-semibold text-sm">{payload[0].name}</p>
        <p className="text-white/50 text-xs mt-0.5">{payload[0].value}% of revenue</p>
      </div>
    );
  }
  return null;
};

export default function CategoryChart() {
  return (
    <div className="rounded-xl border border-white/8 bg-[#0d0d18] p-5 flex flex-col gap-4">
      <div>
        <h3 className="text-white font-semibold text-sm">Revenue by Category</h3>
        <p className="text-white/30 text-xs mt-0.5">Breakdown for current year</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Donut chart */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={60}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-white font-bold text-base leading-tight">5</span>
            <span className="text-white/30 text-[10px]">Categories</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 flex flex-col gap-2.5">
          {categoryData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-white/50 text-xs flex-1 leading-none">{item.name}</span>
              <span className="text-white text-xs font-semibold">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
