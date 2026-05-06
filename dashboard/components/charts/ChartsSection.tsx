"use client";

import dynamic from "next/dynamic";

const RevenueChart = dynamic(() => import("./RevenueChart"), { ssr: false });
const CategoryChart = dynamic(() => import("./CategoryChart"), { ssr: false });
const OrdersBarChart = dynamic(() => import("./OrdersBarChart"), { ssr: false });

export default function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <RevenueChart />
      </div>
      <div className="flex flex-col gap-4">
        <CategoryChart />
        <OrdersBarChart />
      </div>
    </div>
  );
}
