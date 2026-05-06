export type OrderStatus = "completed" | "pending" | "processing" | "cancelled";

export interface Order {
  id: string;
  customer: string;
  avatar: string;
  product: string;
  amount: number;
  status: OrderStatus;
  date: string;
  region: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  revenue: number;
  trend: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  target: number;
  orders: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface TopCustomer {
  id: string;
  name: string;
  avatar: string;
  email: string;
  totalSpent: number;
  orders: number;
  lastOrder: string;
  tier: "platinum" | "gold" | "silver";
}

export const revenueData: RevenueData[] = [
  { month: "Jan", revenue: 4200000, target: 4000000, orders: 312 },
  { month: "Feb", revenue: 3800000, target: 4200000, orders: 278 },
  { month: "Mar", revenue: 5100000, target: 4500000, orders: 401 },
  { month: "Apr", revenue: 4700000, target: 4800000, orders: 356 },
  { month: "May", revenue: 5600000, target: 5000000, orders: 445 },
  { month: "Jun", revenue: 6200000, target: 5500000, orders: 512 },
  { month: "Jul", revenue: 5900000, target: 6000000, orders: 489 },
  { month: "Aug", revenue: 6800000, target: 6200000, orders: 578 },
  { month: "Sep", revenue: 7200000, target: 6800000, orders: 621 },
  { month: "Oct", revenue: 6900000, target: 7000000, orders: 598 },
  { month: "Nov", revenue: 8100000, target: 7500000, orders: 712 },
  { month: "Dec", revenue: 9400000, target: 8500000, orders: 834 },
];

export const categoryData: CategoryData[] = [
  { name: "Luxury Watches", value: 38, color: "#6366f1" },
  { name: "Fine Jewelry", value: 27, color: "#8b5cf6" },
  { name: "Premium Fashion", value: 19, color: "#a78bfa" },
  { name: "Art & Collectibles", value: 10, color: "#c4b5fd" },
  { name: "Rare Spirits", value: 6, color: "#ddd6fe" },
];

export const recentOrders: Order[] = [
  {
    id: "ORD-7821",
    customer: "James Worthington",
    avatar: "JW",
    product: "Patek Philippe Nautilus",
    amount: 142000,
    status: "completed",
    date: "2026-05-06",
    region: "New York",
  },
  {
    id: "ORD-7820",
    customer: "Sofia Marchetti",
    avatar: "SM",
    product: "Cartier Diamond Necklace",
    amount: 89500,
    status: "processing",
    date: "2026-05-06",
    region: "Milan",
  },
  {
    id: "ORD-7819",
    customer: "Robert Chen",
    avatar: "RC",
    product: "Richard Mille RM 011",
    amount: 215000,
    status: "completed",
    date: "2026-05-05",
    region: "Hong Kong",
  },
  {
    id: "ORD-7818",
    customer: "Alexandra von Stein",
    avatar: "AV",
    product: "Hermès Birkin 35",
    amount: 32000,
    status: "pending",
    date: "2026-05-05",
    region: "Paris",
  },
  {
    id: "ORD-7817",
    customer: "Marcus Thompson",
    avatar: "MT",
    product: "Audemars Piguet Royal Oak",
    amount: 98000,
    status: "completed",
    date: "2026-05-04",
    region: "London",
  },
  {
    id: "ORD-7816",
    customer: "Yuki Tanaka",
    avatar: "YT",
    product: "Chanel Haute Joaillerie Set",
    amount: 175000,
    status: "processing",
    date: "2026-05-04",
    region: "Tokyo",
  },
  {
    id: "ORD-7815",
    customer: "Elena Petrov",
    avatar: "EP",
    product: "Vintage Bordeaux Collection",
    amount: 28500,
    status: "cancelled",
    date: "2026-05-03",
    region: "Geneva",
  },
];

export const topProducts: Product[] = [
  {
    id: "PRD-001",
    name: "Patek Philippe Nautilus 5711",
    category: "Luxury Watches",
    price: 142000,
    stock: 3,
    sold: 24,
    revenue: 3408000,
    trend: 18.4,
  },
  {
    id: "PRD-002",
    name: "Richard Mille RM 011",
    category: "Luxury Watches",
    price: 215000,
    stock: 2,
    sold: 18,
    revenue: 3870000,
    trend: 22.1,
  },
  {
    id: "PRD-003",
    name: "Cartier Diamond Tennis Bracelet",
    category: "Fine Jewelry",
    price: 68000,
    stock: 8,
    sold: 41,
    revenue: 2788000,
    trend: 11.3,
  },
  {
    id: "PRD-004",
    name: "Hermès Birkin 35 Crocodile",
    category: "Premium Fashion",
    price: 85000,
    stock: 1,
    sold: 15,
    revenue: 1275000,
    trend: -3.2,
  },
  {
    id: "PRD-005",
    name: "Rolex Daytona White Gold",
    category: "Luxury Watches",
    price: 52000,
    stock: 6,
    sold: 67,
    revenue: 3484000,
    trend: 8.9,
  },
];

export const topCustomers: TopCustomer[] = [
  {
    id: "USR-001",
    name: "James Worthington III",
    avatar: "JW",
    email: "j.worthington@priv.com",
    totalSpent: 1240000,
    orders: 28,
    lastOrder: "2026-05-06",
    tier: "platinum",
  },
  {
    id: "USR-002",
    name: "Sofia Marchetti-Rossi",
    avatar: "SM",
    email: "s.marchetti@luxury.it",
    totalSpent: 892000,
    orders: 19,
    lastOrder: "2026-05-06",
    tier: "platinum",
  },
  {
    id: "USR-003",
    name: "Robert Chen",
    avatar: "RC",
    email: "robert.chen@hk.finance",
    totalSpent: 675000,
    orders: 14,
    lastOrder: "2026-05-05",
    tier: "gold",
  },
  {
    id: "USR-004",
    name: "Alexandra von Stein",
    avatar: "AV",
    email: "a.vonstein@privatbank.ch",
    totalSpent: 548000,
    orders: 22,
    lastOrder: "2026-05-05",
    tier: "gold",
  },
  {
    id: "USR-005",
    name: "Yuki Tanaka",
    avatar: "YT",
    email: "y.tanaka@artcollect.jp",
    totalSpent: 421000,
    orders: 11,
    lastOrder: "2026-05-04",
    tier: "gold",
  },
];

export const kpiData = {
  totalRevenue: { value: 68420000, change: 14.2, period: "vs last year" },
  totalOrders: { value: 5834, change: 9.8, period: "vs last year" },
  avgOrderValue: { value: 117280, change: 4.1, period: "vs last year" },
  conversionRate: { value: 3.42, change: -0.8, period: "vs last year" },
  newClients: { value: 284, change: 22.5, period: "vs last year" },
  returnRate: { value: 1.2, change: -0.3, period: "vs last year" },
};
