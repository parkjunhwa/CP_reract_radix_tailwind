"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, ShoppingBag, Users, BarChart3, Package,
  Settings, HelpCircle, ChevronLeft, ChevronRight, Diamond,
  Bell, Globe, CreditCard, FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const mainNav = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/", badge: null },
  { label: "Orders", icon: ShoppingBag, href: "/orders", badge: "12" },
  { label: "Products", icon: Package, href: "/products", badge: null },
  { label: "Clients", icon: Users, href: "/clients", badge: "3" },
  { label: "Analytics", icon: BarChart3, href: "/analytics", badge: null },
  { label: "Invoices", icon: FileText, href: "/invoices", badge: null },
  { label: "Payments", icon: CreditCard, href: "/payments", badge: null },
  { label: "Markets", icon: Globe, href: "/markets", badge: null },
];

const bottomNav = [
  { label: "Notifications", icon: Bell, href: "/notifications", badge: "5" },
  { label: "Settings", icon: Settings, href: "/settings", badge: null },
  { label: "Help & Support", icon: HelpCircle, href: "/help", badge: null },
];

function NavItem({
  label, icon: Icon, href, badge, active, collapsed,
}: {
  label: string; icon: React.ElementType; href: string;
  badge?: string | null; active: boolean; collapsed: boolean;
}) {
  const cls = cn(
    "group flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-all duration-150 w-full",
    active ? "bg-violet-600/20 text-violet-300 border border-violet-500/20"
           : "text-white/40 hover:text-white/80 hover:bg-white/5",
    collapsed && "justify-center"
  );
  const iconEl = (
    <Icon className={cn("flex-shrink-0 w-4 h-4",
      active ? "text-violet-400" : "text-white/30 group-hover:text-white/60")} />
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger render={<Link href={href} className={cls} />}>
          {iconEl}
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-[#1a1a2e] border-white/10 text-white text-xs">
          {label}{badge && <span className="ml-1.5 text-violet-400">({badge})</span>}
        </TooltipContent>
      </Tooltip>
    );
  }
  return (
    <Link href={href} className={cls}>
      {iconEl}
      <span className="flex-1">{label}</span>
      {badge && (
        <Badge className="bg-violet-600/30 text-violet-300 border-violet-500/20 text-[10px] h-4 px-1.5">
          {badge}
        </Badge>
      )}
    </Link>
  );
}

function BottomNavItem({
  label, icon: Icon, href, badge, collapsed,
}: {
  label: string; icon: React.ElementType; href: string;
  badge?: string | null; collapsed: boolean;
}) {
  const pathname = usePathname();
  const active = pathname === href;
  const cls = cn(
    "group flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-all duration-150 w-full",
    active ? "bg-violet-600/20 text-violet-300 border border-violet-500/20"
           : "text-white/40 hover:text-white/80 hover:bg-white/5",
    collapsed && "justify-center"
  );
  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger render={<Link href={href} className={cls} />}>
          <Icon className="flex-shrink-0 w-4 h-4 text-white/30 group-hover:text-white/60" />
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-[#1a1a2e] border-white/10 text-white text-xs">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }
  return (
    <Link href={href} className={cls}>
      <Icon className="flex-shrink-0 w-4 h-4 text-white/30 group-hover:text-white/60" />
      <span className="flex-1">{label}</span>
      {badge && (
        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/20 text-[10px] h-4 px-1.5">
          {badge}
        </Badge>
      )}
    </Link>
  );
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside className={cn(
      "relative flex flex-col h-screen bg-[#0a0a0f] border-r border-white/5 transition-all duration-300 ease-in-out flex-shrink-0",
      collapsed ? "w-[72px]" : "w-[240px]"
    )}>
      {/* Logo */}
      <div className={cn("flex items-center h-16 px-4 gap-3", collapsed && "justify-center px-0")}>
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-900/40">
          <Diamond className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div className="flex flex-col leading-tight">
            <span className="text-white font-semibold text-sm tracking-wide">LUXE</span>
            <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase">Commerce</span>
          </div>
        )}
      </div>

      <Separator className="bg-white/5" />

      <nav className="flex-1 flex flex-col gap-1 px-2 py-4 overflow-y-auto">
        {!collapsed && (
          <p className="text-[10px] font-medium text-white/20 uppercase tracking-[0.15em] px-2 mb-2">
            Main Menu
          </p>
        )}
        {mainNav.map((item) => (
          <NavItem
            key={item.label}
            {...item}
            active={pathname === item.href}
            collapsed={collapsed}
          />
        ))}
      </nav>

      <Separator className="bg-white/5" />

      <div className="flex flex-col gap-1 px-2 py-4">
        {bottomNav.map((item) => (
          <BottomNavItem key={item.label} {...item} collapsed={collapsed} />
        ))}
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#1a1a2e] border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-[#252540] transition-all duration-150 z-10"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  );
}
