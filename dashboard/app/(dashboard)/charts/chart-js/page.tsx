"use client";

import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  RadialLinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
  Title,
  type ChartData,
  type ChartOptions,
  type Plugin,
} from "chart.js";
import "chartjs-adapter-date-fns";
import {
  Line,
  Bar,
  Pie,
  Doughnut,
  Radar,
  PolarArea,
  Scatter,
  Bubble,
  Chart as ChartComponent,
} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  RadialLinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
  Title,
);

ChartJS.defaults.color = "rgba(160, 160, 180, 0.8)";
ChartJS.defaults.borderColor = "rgba(255, 255, 255, 0.06)";
ChartJS.defaults.font.family = "inherit";
ChartJS.defaults.font.size = 11;

const PALETTE = ["#7c3aed", "#10b981", "#f59e0b", "#ec4899", "#0ea5e9", "#a855f7", "#22c55e"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const baseScales = {
  x: {
    grid: { color: "rgba(255,255,255,0.05)", drawBorder: false },
    ticks: { font: { size: 10 } },
  },
  y: {
    grid: { color: "rgba(255,255,255,0.05)", drawBorder: false },
    ticks: { font: { size: 10 } },
    beginAtZero: true,
  },
};

const compactLegend = {
  position: "top" as const,
  align: "end" as const,
  labels: { boxWidth: 10, boxHeight: 10, padding: 12, font: { size: 11 } },
};

function PanelTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-3">
      <h3 className="t-text font-semibold text-sm">{title}</h3>
      <p className="t-text-30 text-xs mt-0.5">{desc}</p>
    </div>
  );
}

/* ----------------------- LINE ----------------------- */

function GradientLine() {
  const ref = useRef<ChartJS<"line"> | null>(null);

  useEffect(() => {
    const chart = ref.current;
    if (!chart) return;
    const ctx = chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, chart.chartArea?.bottom ?? 240);
    gradient.addColorStop(0, "rgba(124, 58, 237, 0.55)");
    gradient.addColorStop(1, "rgba(124, 58, 237, 0)");
    chart.data.datasets[0].backgroundColor = gradient;
    chart.update();
  }, []);

  const data: ChartData<"line"> = {
    labels: months,
    datasets: [
      {
        label: "Revenue ($M)",
        data: [2.1, 2.4, 2.8, 3.2, 2.9, 4.1, 3.8, 5.0, 4.4, 6.2, 5.8, 9.4],
        borderColor: "#7c3aed",
        backgroundColor: "rgba(124, 58, 237, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: compactLegend, tooltip: { intersect: false, mode: "index" } },
    scales: baseScales,
    interaction: { intersect: false, mode: "index" },
  };

  return <Line ref={ref} data={data} options={options} />;
}

/* ----------------------- BAR ----------------------- */

function StackedBar() {
  const data: ChartData<"bar"> = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      { label: "Watches", data: [3.2, 4.1, 5.6, 9.1], backgroundColor: "#7c3aed", borderRadius: 6, borderSkipped: false, stack: "rev" },
      { label: "Jewelry", data: [2.4, 3.5, 4.2, 6.7], backgroundColor: "#10b981", borderRadius: 6, borderSkipped: false, stack: "rev" },
      { label: "Fashion", data: [1.7, 2.6, 3.4, 4.2], backgroundColor: "#f59e0b", borderRadius: 6, borderSkipped: false, stack: "rev" },
      { label: "Spirits", data: [0.9, 1.4, 1.8, 2.5], backgroundColor: "#ec4899", borderRadius: 6, borderSkipped: false, stack: "rev" },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: compactLegend },
    scales: {
      x: { ...baseScales.x, stacked: true },
      y: { ...baseScales.y, stacked: true, ticks: { ...baseScales.y.ticks, callback: (v) => `$${v}M` } },
    },
  };

  return <Bar data={data} options={options} />;
}

/* ----------------------- HORIZONTAL BAR ----------------------- */

function HorizontalBar() {
  const data: ChartData<"bar"> = {
    labels: ["United States", "United Kingdom", "France", "Japan", "Switzerland", "UAE", "Singapore", "Germany"],
    datasets: [
      {
        label: "Revenue ($M)",
        data: [22.4, 14.8, 9.6, 8.4, 7.2, 5.8, 4.9, 3.6],
        backgroundColor: PALETTE,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ...baseScales.x, ticks: { ...baseScales.x.ticks, callback: (v) => `$${v}M` } },
      y: baseScales.y,
    },
  };

  return <Bar data={data} options={options} />;
}

/* ----------------------- PIE / DOUGHNUT ----------------------- */

const categoryColors = ["#7c3aed", "#f59e0b", "#ec4899", "#0ea5e9", "#10b981"];
const categoryLabels = ["Watches", "Jewelry", "Fashion", "Art", "Spirits"];
const categoryValues = [38, 27, 18, 11, 6];

function PieExample() {
  const data: ChartData<"pie"> = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryValues,
        backgroundColor: categoryColors,
        borderColor: "var(--luxe-sidebar)",
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "right", labels: { boxWidth: 10, boxHeight: 10, font: { size: 11 } } } },
  };

  return <Pie data={data} options={options} />;
}

const centerLabelPlugin: Plugin<"doughnut"> = {
  id: "centerLabel",
  afterDraw(chart) {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;
    const cx = (chartArea.left + chartArea.right) / 2;
    const cy = (chartArea.top + chartArea.bottom) / 2;
    ctx.save();
    ctx.fillStyle = "rgba(220, 220, 235, 0.95)";
    ctx.font = "700 22px inherit";
    ctx.textAlign = "center";
    ctx.fillText("$60.4M", cx, cy);
    ctx.fillStyle = "rgba(160, 160, 180, 0.7)";
    ctx.font = "500 11px inherit";
    ctx.fillText("Total revenue", cx, cy + 18);
    ctx.restore();
  },
};

function DoughnutExample() {
  const data: ChartData<"doughnut"> = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryValues,
        backgroundColor: categoryColors,
        borderColor: "var(--luxe-sidebar)",
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: { legend: { position: "bottom", labels: { boxWidth: 10, boxHeight: 10, font: { size: 11 } } } },
  };

  return <Doughnut data={data} options={options} plugins={[centerLabelPlugin]} />;
}

/* ----------------------- RADAR ----------------------- */

function RadarExample() {
  const data: ChartData<"radar"> = {
    labels: ["Acquisition", "Retention", "Margin", "Velocity", "Brand", "Service"],
    datasets: [
      {
        label: "Actual",
        data: [85, 78, 72, 88, 91, 84],
        borderColor: "#7c3aed",
        backgroundColor: "rgba(124, 58, 237, 0.35)",
        pointBackgroundColor: "#7c3aed",
      },
      {
        label: "Target",
        data: [92, 88, 80, 85, 95, 90],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        pointBackgroundColor: "#10b981",
      },
    ],
  };

  const options: ChartOptions<"radar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: compactLegend },
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100,
        angleLines: { color: "rgba(255,255,255,0.06)" },
        grid: { color: "rgba(255,255,255,0.06)" },
        pointLabels: { font: { size: 11 }, color: "rgba(160,160,180,0.85)" },
        ticks: { display: false, stepSize: 25 },
      },
    },
  };

  return <Radar data={data} options={options} />;
}

/* ----------------------- POLAR AREA ----------------------- */

function PolarExample() {
  const data: ChartData<"polarArea"> = {
    labels: ["Vintage", "Modern", "Limited", "Classic", "Custom"],
    datasets: [
      {
        data: [42, 47, 52, 58, 65],
        backgroundColor: ["#7c3aed", "#10b981", "#f59e0b", "#ec4899", "#0ea5e9"].map(
          (c) => c + "BB",
        ),
        borderColor: "var(--luxe-sidebar)",
      },
    ],
  };

  const options: ChartOptions<"polarArea"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom", labels: { boxWidth: 10, boxHeight: 10, font: { size: 11 } } } },
    scales: {
      r: {
        ticks: { display: false },
        grid: { color: "rgba(255,255,255,0.06)" },
        angleLines: { color: "rgba(255,255,255,0.06)" },
      },
    },
  };

  return <PolarArea data={data} options={options} />;
}

/* ----------------------- SCATTER / BUBBLE ----------------------- */

function ScatterExample() {
  const data: ChartData<"scatter"> = {
    datasets: [
      {
        label: "Watches",
        data: [
          { x: 52, y: 42 },
          { x: 98, y: 37 },
          { x: 142, y: 37 },
          { x: 215, y: 35 },
          { x: 28, y: 43 },
        ],
        backgroundColor: "#7c3aed",
      },
      {
        label: "Jewelry",
        data: [
          { x: 68, y: 44 },
          { x: 12.5, y: 52 },
          { x: 42, y: 50 },
          { x: 22, y: 59 },
        ],
        backgroundColor: "#f59e0b",
      },
      {
        label: "Couture",
        data: [
          { x: 175, y: 46 },
          { x: 4.8, y: 54 },
          { x: 195, y: 44 },
        ],
        backgroundColor: "#ec4899",
      },
    ],
  };

  const options: ChartOptions<"scatter"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: compactLegend },
    scales: {
      x: { ...baseScales.x, title: { display: true, text: "Price ($K)", font: { size: 11 } } },
      y: { ...baseScales.y, title: { display: true, text: "Margin (%)", font: { size: 11 } } },
    },
  };

  return <Scatter data={data} options={options} />;
}

function BubbleExample() {
  const data: ChartData<"bubble"> = {
    datasets: [
      {
        label: "Watches",
        data: [
          { x: 52, y: 42, r: 12 },
          { x: 98, y: 37, r: 9 },
          { x: 142, y: 37, r: 6 },
          { x: 215, y: 35, r: 4 },
          { x: 28, y: 43, r: 14 },
        ],
        backgroundColor: "rgba(124,58,237,0.55)",
      },
      {
        label: "Jewelry",
        data: [
          { x: 68, y: 44, r: 10 },
          { x: 12.5, y: 52, r: 18 },
          { x: 42, y: 50, r: 12 },
          { x: 22, y: 59, r: 14 },
        ],
        backgroundColor: "rgba(245,158,11,0.55)",
      },
      {
        label: "Couture",
        data: [
          { x: 175, y: 46, r: 5 },
          { x: 4.8, y: 54, r: 22 },
          { x: 195, y: 44, r: 4 },
        ],
        backgroundColor: "rgba(236,72,153,0.55)",
      },
    ],
  };

  const options: ChartOptions<"bubble"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: compactLegend },
    scales: {
      x: { ...baseScales.x, title: { display: true, text: "Price ($K)", font: { size: 11 } } },
      y: { ...baseScales.y, title: { display: true, text: "Margin (%)", font: { size: 11 } } },
    },
  };

  return <Bubble data={data} options={options} />;
}

/* ----------------------- COMBO ----------------------- */

function ComboChart() {
  const data: ChartData<"bar" | "line"> = {
    labels: months,
    datasets: [
      {
        type: "bar" as const,
        label: "Orders",
        data: [320, 420, 380, 560, 490, 710, 650, 850, 780, 1020, 940, 1560],
        backgroundColor: "rgba(14,165,233,0.7)",
        borderRadius: 4,
        borderSkipped: false,
        yAxisID: "yOrders",
      },
      {
        type: "line" as const,
        label: "Revenue ($M)",
        data: [2.1, 2.4, 2.8, 3.2, 2.9, 4.1, 3.8, 5.0, 4.4, 6.2, 5.8, 9.4],
        borderColor: "#7c3aed",
        backgroundColor: "#7c3aed",
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderWidth: 2,
        yAxisID: "yRev",
      },
      {
        type: "line" as const,
        label: "Avg Value ($)",
        data: [6562, 5714, 7368, 5714, 5918, 5775, 5846, 5882, 5641, 6078, 6170, 6026],
        borderColor: "#f59e0b",
        backgroundColor: "#f59e0b",
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderWidth: 2,
        borderDash: [4, 4],
        yAxisID: "yAvg",
      },
    ],
  };

  const options: ChartOptions<"bar" | "line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: compactLegend, tooltip: { intersect: false, mode: "index" } },
    interaction: { intersect: false, mode: "index" },
    scales: {
      x: baseScales.x,
      yOrders: { type: "linear", position: "left", ticks: { font: { size: 10 } }, grid: { color: "rgba(255,255,255,0.05)" }, title: { display: true, text: "Orders", font: { size: 10 } } },
      yRev: { type: "linear", position: "right", ticks: { font: { size: 10 }, callback: (v) => `$${v}M` }, grid: { display: false }, title: { display: true, text: "Revenue", font: { size: 10 } } },
      yAvg: { type: "linear", display: false },
    },
  };

  return <ChartComponent type="bar" data={data} options={options} />;
}

/* ----------------------- AREA STACKED ----------------------- */

function StackedArea() {
  const data: ChartData<"line"> = {
    labels: months,
    datasets: [
      { label: "Watches", data: [1.2, 1.4, 1.6, 2.0, 1.8, 2.4, 2.2, 2.8, 2.6, 3.4, 3.2, 5.2], borderColor: "#7c3aed", backgroundColor: "rgba(124,58,237,0.5)", fill: true, tension: 0.3, pointRadius: 0 },
      { label: "Jewelry", data: [0.6, 0.7, 0.8, 0.9, 0.7, 1.1, 1.0, 1.4, 1.2, 1.7, 1.6, 2.4], borderColor: "#10b981", backgroundColor: "rgba(16,185,129,0.4)", fill: true, tension: 0.3, pointRadius: 0 },
      { label: "Fashion", data: [0.3, 0.3, 0.4, 0.3, 0.4, 0.6, 0.6, 0.8, 0.6, 1.1, 1.0, 1.8], borderColor: "#f59e0b", backgroundColor: "rgba(245,158,11,0.4)", fill: true, tension: 0.3, pointRadius: 0 },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: compactLegend, tooltip: { intersect: false, mode: "index" } },
    scales: {
      x: baseScales.x,
      y: { ...baseScales.y, stacked: true, ticks: { ...baseScales.y.ticks, callback: (v) => `$${v}M` } },
    },
  };

  return <Line data={data} options={options} />;
}

/* ----------------------- SPARKLINE CARDS ----------------------- */

const sparkSets = [
  { label: "Revenue", value: "$60.4M", delta: "+18.4%", positive: true, data: [2, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 9], color: "#7c3aed" },
  { label: "Orders", value: "9,640", delta: "+12.1%", positive: true, data: [320, 420, 380, 560, 490, 710, 650, 850, 780, 1020, 940, 1560], color: "#10b981" },
  { label: "Avg Value", value: "$6,128", delta: "-1.6%", positive: false, data: [6562, 5714, 7368, 5714, 5918, 5775, 5846, 5882, 5641, 6078, 6170, 6026], color: "#f59e0b" },
  { label: "Active Clients", value: "598", delta: "+9.8%", positive: true, data: [28, 34, 31, 42, 38, 51, 47, 63, 58, 74, 69, 98], color: "#0ea5e9" },
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const chartData: ChartData<"line"> = {
    labels: data.map((_, i) => i.toString()),
    datasets: [
      {
        data,
        borderColor: color,
        backgroundColor: color + "33",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
      },
    ],
  };
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
    elements: { line: { borderJoinStyle: "round" } },
  };
  return <Line data={chartData} options={options} />;
}

/* ----------------------- PAGE ----------------------- */

export default function ChartJsPage() {
  return (
    <div className="space-y-3 pb-0">
      {/* KPI sparklines */}
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
            <div className="h-12 mt-2">
              <Sparkline data={s.data} color={s.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Hero combo */}
      <div className="panel p-5">
        <PanelTitle title="Combo (Bar + Line)" desc="Bar for orders, line for revenue and avg order value with three y-axes" />
        <div className="h-72">
          <ComboChart />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        <div className="panel p-5">
          <PanelTitle title="Smooth Line" desc="Filled gradient line with smooth tension" />
          <div className="h-64"><GradientLine /></div>
        </div>
        <div className="panel p-5">
          <PanelTitle title="Stacked Area" desc="Three categories stacked with smooth tension" />
          <div className="h-64"><StackedArea /></div>
        </div>
        <div className="panel p-5">
          <PanelTitle title="Stacked Bar" desc="Quarterly revenue stacked across categories" />
          <div className="h-64"><StackedBar /></div>
        </div>
        <div className="panel p-5">
          <PanelTitle title="Horizontal Bar" desc="Revenue per country, ranked descending" />
          <div className="h-64"><HorizontalBar /></div>
        </div>
        <div className="panel p-5">
          <PanelTitle title="Pie Chart" desc="Classic pie with side legend" />
          <div className="h-64"><PieExample /></div>
        </div>
        <div className="panel p-5">
          <PanelTitle title="Doughnut + Center" desc="Donut chart with custom plugin drawing total in center" />
          <div className="h-64"><DoughnutExample /></div>
        </div>
        <div className="panel p-5">
          <PanelTitle title="Radar" desc="Compare actual vs target across dimensions" />
          <div className="h-64"><RadarExample /></div>
        </div>
        <div className="panel p-5">
          <PanelTitle title="Polar Area" desc="Polar area chart with translucent slices" />
          <div className="h-64"><PolarExample /></div>
        </div>
        <div className="panel p-5">
          <PanelTitle title="Scatter" desc="Discrete points by category — price vs margin" />
          <div className="h-64"><ScatterExample /></div>
        </div>
        <div className="panel p-5">
          <PanelTitle title="Bubble" desc="Bubble size = unit sales; X = price, Y = margin" />
          <div className="h-64"><BubbleExample /></div>
        </div>
      </div>
    </div>
  );
}
