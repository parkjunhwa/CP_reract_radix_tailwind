"use client";

import dynamic from "next/dynamic";

const RevenueChart = dynamic(() => import("./RevenueChart"), { ssr: false });
const CategoryChart = dynamic(() => import("./CategoryChart"), { ssr: false });
const OrdersBarChart = dynamic(() => import("./OrdersBarChart"), { ssr: false });

export default function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
      <div className="lg:col-span-2 flex min-h-0 lg:min-h-[20rem]">
        <div className="flex min-h-0 flex-1 flex-col">
          <RevenueChart />
        </div>
      </div>
      <div className="flex min-h-0 flex-col gap-4 lg:h-full">
        <div className="flex min-h-0 flex-1 flex-col lg:min-h-0">
          <CategoryChart />
        </div>
        <div className="flex min-h-0 flex-1 flex-col lg:min-h-0">
          <OrdersBarChart />
        </div>
      </div>
    </div>
  );
}
