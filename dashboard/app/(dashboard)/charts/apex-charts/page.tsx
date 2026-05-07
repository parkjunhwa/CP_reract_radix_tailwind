"use client";

import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PALETTE = ["#7c3aed", "#10b981", "#f59e0b", "#ec4899", "#0ea5e9", "#a855f7", "#22c55e"];

const baseOptions: ApexOptions = {
  chart: {
    background: "transparent",
    foreColor: "var(--t-text-50)",
    toolbar: { show: false },
    animations: { enabled: true, speed: 400 },
    fontFamily: "inherit",
  },
  grid: {
    borderColor: "var(--t-border)",
    strokeDashArray: 3,
    yaxis: { lines: { show: true } },
  },
  tooltip: { theme: "dark", style: { fontSize: "12px", fontFamily: "inherit" } },
  legend: { fontSize: "11px", labels: { colors: "var(--t-text-50)" } },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth", width: 2 },
  colors: PALETTE,
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type ChartCard = {
  title: string;
  desc: string;
  height?: number;
  options: ApexOptions;
  series: ApexOptions["series"];
  type: NonNullable<NonNullable<ApexOptions["chart"]>["type"]>;
};

const charts: ChartCard[] = [
  {
    title: "Area — Gradient Revenue",
    desc: "Smooth gradient area chart with two series",
    height: 260,
    type: "area",
    options: {
      ...baseOptions,
      xaxis: { categories: months, labels: { style: { fontSize: "10px" } } },
      yaxis: { labels: { style: { fontSize: "10px" }, formatter: (v) => `$${v}M` } },
      fill: {
        type: "gradient",
        gradient: { shadeIntensity: 1, opacityFrom: 0.6, opacityTo: 0.05, stops: [0, 95] },
      },
      markers: { size: 0, hover: { size: 5 } },
    },
    series: [
      { name: "Revenue", data: [2.1, 2.4, 2.8, 3.2, 2.9, 4.1, 3.8, 5.0, 4.4, 6.2, 5.8, 9.4] },
      { name: "Forecast", data: [1.8, 2.1, 2.6, 3.4, 3.1, 3.9, 4.0, 4.7, 4.8, 5.7, 6.1, 8.6] },
    ],
  },
  {
    title: "Line — Multi-series Trend",
    desc: "Three independent metrics tracked over the year",
    height: 260,
    type: "line",
    options: {
      ...baseOptions,
      xaxis: { categories: months, labels: { style: { fontSize: "10px" } } },
      yaxis: { labels: { style: { fontSize: "10px" } } },
      stroke: { curve: "smooth", width: 3 },
      markers: { size: 4, strokeWidth: 0, hover: { size: 6 } },
    },
    series: [
      { name: "Watches", data: [320, 420, 380, 560, 490, 710, 650, 850, 780, 1020, 940, 1560] },
      { name: "Jewelry", data: [260, 330, 420, 470, 520, 590, 610, 700, 740, 880, 920, 1240] },
      { name: "Fashion", data: [180, 210, 290, 340, 410, 480, 530, 610, 680, 780, 820, 1020] },
    ],
  },
  {
    title: "Bar — Stacked Quarterly",
    desc: "Stacked column chart split by category",
    height: 260,
    type: "bar",
    options: {
      ...baseOptions,
      chart: { ...baseOptions.chart, stacked: true },
      xaxis: { categories: ["Q1", "Q2", "Q3", "Q4"], labels: { style: { fontSize: "10px" } } },
      yaxis: { labels: { style: { fontSize: "10px" }, formatter: (v) => `$${v}M` } },
      plotOptions: { bar: { columnWidth: "55%", borderRadius: 6, borderRadiusApplication: "end" } },
      fill: { opacity: 1 },
    },
    series: [
      { name: "Watches", data: [3.2, 4.1, 5.6, 9.1] },
      { name: "Jewelry", data: [2.4, 3.5, 4.2, 6.7] },
      { name: "Fashion", data: [1.7, 2.6, 3.4, 4.2] },
      { name: "Spirits", data: [0.9, 1.4, 1.8, 2.5] },
    ],
  },
  {
    title: "Mixed — Bar + Line + Area",
    desc: "Combine three chart types on the same canvas",
    height: 280,
    type: "line",
    options: {
      ...baseOptions,
      stroke: { width: [0, 3, 2], curve: "smooth" },
      plotOptions: { bar: { columnWidth: "45%", borderRadius: 4 } },
      fill: { type: ["solid", "solid", "gradient"], opacity: [0.85, 1, 0.4] },
      labels: months,
      yaxis: [
        { seriesName: "Orders", labels: { style: { fontSize: "10px" } }, title: { text: "Orders", style: { fontSize: "10px" } } },
        { seriesName: "AOV", labels: { style: { fontSize: "10px" } }, opposite: true, title: { text: "Avg ($)", style: { fontSize: "10px" } } },
        { seriesName: "Revenue", show: false },
      ],
    },
    series: [
      { name: "Orders", type: "column", data: [320, 420, 380, 560, 490, 710, 650, 850, 780, 1020, 940, 1560] },
      { name: "AOV", type: "line", data: [6562, 5714, 7368, 5714, 5918, 5775, 5846, 5882, 5641, 6078, 6170, 6026] },
      { name: "Revenue", type: "area", data: [2.1, 2.4, 2.8, 3.2, 2.9, 4.1, 3.8, 5.0, 4.4, 6.2, 5.8, 9.4] },
    ],
  },
  {
    title: "Pie — Category Mix",
    desc: "Classic pie chart with percentage labels",
    height: 280,
    type: "pie",
    options: {
      ...baseOptions,
      labels: ["Watches", "Jewelry", "Fashion", "Art", "Spirits"],
      stroke: { width: 0 },
      legend: { ...baseOptions.legend, position: "bottom" },
      dataLabels: { enabled: true, style: { fontSize: "11px", fontWeight: 600 } },
    },
    series: [38, 27, 18, 11, 6],
  },
  {
    title: "Donut — Sales by Region",
    desc: "Donut variant with center summary",
    height: 280,
    type: "donut",
    options: {
      ...baseOptions,
      labels: ["Americas", "EMEA", "APAC", "MENA", "LATAM"],
      stroke: { width: 0 },
      legend: { ...baseOptions.legend, position: "bottom" },
      plotOptions: {
        pie: {
          donut: {
            size: "68%",
            labels: {
              show: true,
              total: { show: true, label: "Total", fontSize: "12px", color: "var(--t-text-50)", formatter: () => "$60.4M" },
              value: { fontSize: "20px", fontWeight: 700, color: "var(--t-text)" },
            },
          },
        },
      },
    },
    series: [42, 25, 18, 9, 6],
  },
  {
    title: "Radial Bar — Goal Progress",
    desc: "Multiple radial bars showing percentage to target",
    height: 280,
    type: "radialBar",
    options: {
      ...baseOptions,
      labels: ["Revenue", "New Clients", "Retention", "NPS"],
      legend: { ...baseOptions.legend, show: true, position: "bottom" },
      plotOptions: {
        radialBar: {
          hollow: { size: "30%" },
          track: { background: "var(--t-border)", strokeWidth: "100%" },
          dataLabels: {
            name: { fontSize: "11px", color: "var(--t-text-50)" },
            value: { fontSize: "14px", fontWeight: 600, color: "var(--t-text)" },
            total: { show: true, label: "Avg", color: "var(--t-text-50)", fontSize: "11px" },
          },
        },
      },
    },
    series: [78, 64, 91, 88],
  },
  {
    title: "Heatmap — Hourly Activity",
    desc: "Order volume heatmap by day and hour bucket",
    height: 280,
    type: "heatmap",
    options: {
      ...baseOptions,
      xaxis: { type: "category", categories: ["00", "04", "08", "12", "16", "20"], labels: { style: { fontSize: "10px" } } },
      stroke: { width: 1, colors: ["var(--luxe-sidebar-2)"] },
      plotOptions: {
        heatmap: {
          radius: 4,
          colorScale: {
            ranges: [
              { from: 0, to: 19, name: "Quiet", color: "#1e1b4b" },
              { from: 20, to: 39, name: "Low", color: "#4c1d95" },
              { from: 40, to: 59, name: "Medium", color: "#7c3aed" },
              { from: 60, to: 79, name: "High", color: "#a855f7" },
              { from: 80, to: 100, name: "Peak", color: "#f59e0b" },
            ],
          },
        },
      },
    },
    series: [
      { name: "Mon", data: [8, 12, 24, 56, 78, 42] },
      { name: "Tue", data: [9, 14, 22, 60, 80, 38] },
      { name: "Wed", data: [10, 18, 28, 64, 82, 45] },
      { name: "Thu", data: [12, 16, 30, 72, 88, 52] },
      { name: "Fri", data: [14, 20, 35, 78, 94, 60] },
      { name: "Sat", data: [22, 28, 44, 70, 86, 76] },
      { name: "Sun", data: [18, 24, 38, 62, 76, 70] },
    ],
  },
  {
    title: "Polar Area — Style Mix",
    desc: "Polar area chart with proportional radii",
    height: 280,
    type: "polarArea",
    options: {
      ...baseOptions,
      labels: ["Vintage", "Modern", "Limited", "Classic", "Custom"],
      stroke: { colors: ["var(--luxe-sidebar)"] },
      fill: { opacity: 0.8 },
      legend: { ...baseOptions.legend, position: "bottom" },
      yaxis: { show: false },
    },
    series: [42, 47, 52, 58, 65],
  },
  {
    title: "Treemap — Revenue Share",
    desc: "Hierarchical squarified treemap",
    height: 280,
    type: "treemap",
    options: {
      ...baseOptions,
      legend: { ...baseOptions.legend, show: false },
      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: false,
        },
      },
      dataLabels: { enabled: true, style: { fontSize: "11px", fontWeight: 600 } },
      stroke: { colors: ["var(--luxe-sidebar)"] },
    },
    series: [
      {
        data: [
          { x: "Watches", y: 38 },
          { x: "Jewelry", y: 27 },
          { x: "Fashion", y: 18 },
          { x: "Art", y: 11 },
          { x: "Spirits", y: 6 },
        ],
      },
    ],
  },
  {
    title: "Candlestick — Watch Index",
    desc: "OHLC trading view of a luxury watch index",
    height: 280,
    type: "candlestick",
    options: {
      ...baseOptions,
      xaxis: { type: "datetime", labels: { style: { fontSize: "10px" } } },
      yaxis: { labels: { style: { fontSize: "10px" } } },
      plotOptions: {
        candlestick: { colors: { upward: "#10b981", downward: "#ef4444" } },
      },
    },
    series: [
      {
        data: [
          { x: new Date("2026-01-01").getTime(), y: [128, 138, 124, 134] },
          { x: new Date("2026-02-01").getTime(), y: [134, 140, 130, 138] },
          { x: new Date("2026-03-01").getTime(), y: [138, 152, 136, 148] },
          { x: new Date("2026-04-01").getTime(), y: [148, 158, 144, 156] },
          { x: new Date("2026-05-01").getTime(), y: [156, 162, 150, 152] },
          { x: new Date("2026-06-01").getTime(), y: [152, 168, 148, 164] },
          { x: new Date("2026-07-01").getTime(), y: [164, 178, 162, 174] },
          { x: new Date("2026-08-01").getTime(), y: [174, 182, 168, 178] },
          { x: new Date("2026-09-01").getTime(), y: [178, 188, 172, 184] },
          { x: new Date("2026-10-01").getTime(), y: [184, 198, 180, 196] },
          { x: new Date("2026-11-01").getTime(), y: [196, 204, 188, 192] },
          { x: new Date("2026-12-01").getTime(), y: [192, 218, 190, 214] },
        ],
      },
    ],
  },
  {
    title: "Range Area — Confidence Band",
    desc: "Forecast with shaded uncertainty range",
    height: 280,
    type: "rangeArea",
    options: {
      ...baseOptions,
      xaxis: { categories: months, labels: { style: { fontSize: "10px" } } },
      yaxis: { labels: { style: { fontSize: "10px" }, formatter: (v) => `$${v}M` } },
      stroke: { curve: "smooth", width: [2, 0] },
      fill: { opacity: [1, 0.25] },
    },
    series: [
      {
        type: "line",
        name: "Forecast",
        data: [2.1, 2.4, 2.8, 3.2, 2.9, 4.1, 3.8, 5.0, 4.4, 6.2, 5.8, 9.4],
      },
      {
        type: "rangeArea",
        name: "Range",
        data: [
          { x: "Jan", y: [1.6, 2.6] },
          { x: "Feb", y: [1.9, 2.9] },
          { x: "Mar", y: [2.2, 3.4] },
          { x: "Apr", y: [2.6, 3.8] },
          { x: "May", y: [2.4, 3.5] },
          { x: "Jun", y: [3.4, 4.8] },
          { x: "Jul", y: [3.1, 4.6] },
          { x: "Aug", y: [4.2, 5.8] },
          { x: "Sep", y: [3.6, 5.2] },
          { x: "Oct", y: [5.2, 7.2] },
          { x: "Nov", y: [4.8, 6.8] },
          { x: "Dec", y: [8.0, 10.6] },
        ],
      },
    ],
  },
  {
    title: "Bubble — Product Performance",
    desc: "Each bubble = one product. X = price, Y = margin, R = unit sales",
    height: 280,
    type: "bubble",
    options: {
      ...baseOptions,
      xaxis: {
        type: "numeric",
        title: { text: "Price (USD)", style: { fontSize: "10px" } },
        labels: { style: { fontSize: "10px" }, formatter: (v) => `$${(Number(v) / 1000).toFixed(0)}K` },
      },
      yaxis: {
        title: { text: "Margin (%)", style: { fontSize: "10px" } },
        labels: { style: { fontSize: "10px" }, formatter: (v) => `${v}%` },
      },
      fill: { opacity: 0.7 },
      markers: { strokeWidth: 0 },
    },
    series: [
      {
        name: "Watches",
        data: [
          [52000, 42, 80],
          [98000, 37, 60],
          [142000, 37, 35],
          [215000, 35, 18],
          [28000, 43, 110],
        ],
      },
      {
        name: "Jewelry",
        data: [
          [68000, 44, 55],
          [12500, 52, 240],
          [42000, 50, 90],
          [22000, 59, 160],
        ],
      },
      {
        name: "Couture",
        data: [
          [175000, 46, 22],
          [4800, 54, 320],
          [195000, 44, 14],
        ],
      },
    ],
  },
  {
    title: "Boxplot — Price Spread",
    desc: "Statistical price distribution per category",
    height: 280,
    type: "boxPlot",
    options: {
      ...baseOptions,
      plotOptions: {
        boxPlot: { colors: { upper: "#7c3aed", lower: "#0ea5e9" } },
      },
      xaxis: { type: "category", labels: { style: { fontSize: "10px" } } },
      yaxis: { labels: { style: { fontSize: "10px" }, formatter: (v) => `$${(Number(v) / 1000).toFixed(0)}K` } },
    },
    series: [
      {
        type: "boxPlot",
        data: [
          { x: "Watches", y: [12000, 38000, 72000, 142000, 240000] },
          { x: "Jewelry", y: [4800, 22000, 42000, 78000, 195000] },
          { x: "Fashion", y: [800, 4200, 12000, 32000, 90000] },
          { x: "Art", y: [2400, 9600, 28000, 84000, 320000] },
          { x: "Spirits", y: [400, 1800, 4800, 12000, 48000] },
        ],
      },
    ],
  },
];

const sparkSets = [
  { label: "Revenue", value: "$60.4M", delta: "+18.4%", positive: true, data: [2, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 9], color: "#7c3aed" },
  { label: "Orders", value: "9,640", delta: "+12.1%", positive: true, data: [320, 420, 380, 560, 490, 710, 650, 850, 780, 1020, 940, 1560], color: "#10b981" },
  { label: "Avg Value", value: "$6,128", delta: "-1.6%", positive: false, data: [6562, 5714, 7368, 5714, 5918, 5775, 5846, 5882, 5641, 6078, 6170, 6026], color: "#f59e0b" },
  { label: "Active Clients", value: "598", delta: "+9.8%", positive: true, data: [28, 34, 31, 42, 38, 51, 47, 63, 58, 74, 69, 98], color: "#0ea5e9" },
];

export default function ApexChartsPage() {
  return (
    <div className="space-y-3 pb-0">
      {/* Sparkline KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {sparkSets.map((s) => (
          <div key={s.label} className="panel p-4">
            <div className="flex items-center justify-between">
              <p className="t-text-40 text-xs">{s.label}</p>
              <span className={`text-[10px] font-semibold ${s.positive ? "text-emerald-400" : "text-red-400"}`}>
                {s.delta}
              </span>
            </div>
            <p className="t-text font-bold text-lg mt-1">{s.value}</p>
            <ApexChart
              type="line"
              height={48}
              options={{
                chart: { sparkline: { enabled: true }, animations: { enabled: false } },
                stroke: { curve: "smooth", width: 2 },
                colors: [s.color],
                tooltip: { enabled: false },
                fill: {
                  type: "gradient",
                  gradient: { opacityFrom: 0.4, opacityTo: 0, shadeIntensity: 1, stops: [0, 100] },
                },
              }}
              series={[{ name: s.label, data: s.data }]}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        {charts.map((c) => (
          <div key={c.title} className="panel p-5 space-y-3">
            <div>
              <h3 className="t-text font-semibold text-sm">{c.title}</h3>
              <p className="t-text-30 text-xs mt-0.5">{c.desc}</p>
            </div>
            <ApexChart options={c.options} series={c.series} type={c.type} height={c.height ?? 240} />
          </div>
        ))}
      </div>
    </div>
  );
}
