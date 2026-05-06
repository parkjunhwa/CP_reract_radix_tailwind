"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, ShoppingBag, Users, BarChart3, Package,
  Settings, HelpCircle, ChevronLeft, ChevronRight, Diamond,
  Bell, Globe, CreditCard, FileText, X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const mainNav = [
  { label: "대시보드", icon: LayoutDashboard, href: "/",              badge: null },
  { label: "주문",     icon: ShoppingBag,     href: "/orders",        badge: "12" },
  { label: "상품",     icon: Package,         href: "/products",      badge: null },
  { label: "고객",     icon: Users,           href: "/clients",       badge: "3"  },
  { label: "분석",     icon: BarChart3,       href: "/analytics",     badge: null },
  { label: "인보이스", icon: FileText,        href: "/invoices",      badge: null },
  { label: "결제",     icon: CreditCard,      href: "/payments",      badge: null },
  { label: "시장",     icon: Globe,           href: "/markets",       badge: null },
];

const bottomNav = [
  { label: "알림",   icon: Bell,       href: "/notifications", badge: "5"  },
  { label: "설정",   icon: Settings,   href: "/settings",      badge: null },
  { label: "고객지원",icon: HelpCircle, href: "/help",          badge: null },
];

function NavItem({
  label, icon: Icon, href, badge, active, collapsed, onClick,
}: {
  label: string; icon: React.ElementType; href: string;
  badge?: string | null; active: boolean; collapsed: boolean; onClick?: () => void;
}) {
  const cls = cn(
    "group flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-all duration-150 w-full",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-inset",
    active
      ? "bg-violet-600/20 text-violet-300 border border-violet-500/20"
      : "text-white/40 hover:text-white/80 hover:bg-white/5",
    collapsed && "justify-center"
  );
  const iconEl = (
    <Icon
      aria-hidden="true"
      className={cn("flex-shrink-0 w-4 h-4",
        active ? "text-violet-400" : "text-white/30 group-hover:text-white/60")}
    />
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger render={<Link href={href} className={cls} aria-current={active ? "page" : undefined} onClick={onClick} />}>
          {iconEl}
          <span className="sr-only">{label}</span>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-[#1a1a2e] border-white/10 text-white text-xs">
          {label}{badge && <span className="ml-1.5 text-violet-400">({badge})</span>}
        </TooltipContent>
      </Tooltip>
    );
  }
  return (
    <Link href={href} className={cls} aria-current={active ? "page" : undefined} onClick={onClick}>
      {iconEl}
      <span className="flex-1">{label}</span>
      {badge && (
        <Badge aria-label={`${badge}개`} className="bg-violet-600/30 text-violet-300 border-violet-500/20 text-[10px] h-4 px-1.5">
          {badge}
        </Badge>
      )}
    </Link>
  );
}

function BottomNavItem({
  label, icon: Icon, href, badge, collapsed, onClick,
}: {
  label: string; icon: React.ElementType; href: string;
  badge?: string | null; collapsed: boolean; onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href;
  const cls = cn(
    "group flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-all duration-150 w-full",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-inset",
    active
      ? "bg-violet-600/20 text-violet-300 border border-violet-500/20"
      : "text-white/40 hover:text-white/80 hover:bg-white/5",
    collapsed && "justify-center"
  );
  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger render={<Link href={href} className={cls} aria-current={active ? "page" : undefined} onClick={onClick} />}>
          <Icon aria-hidden="true" className="flex-shrink-0 w-4 h-4 text-white/30 group-hover:text-white/60" />
          <span className="sr-only">{label}</span>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-[#1a1a2e] border-white/10 text-white text-xs">{label}</TooltipContent>
      </Tooltip>
    );
  }
  return (
    <Link href={href} className={cls} aria-current={active ? "page" : undefined} onClick={onClick}>
      <Icon aria-hidden="true" className="flex-shrink-0 w-4 h-4 text-white/30 group-hover:text-white/60" />
      <span className="flex-1">{label}</span>
      {badge && (
        <Badge aria-label={`${badge}개`} className="bg-amber-500/20 text-amber-400 border-amber-500/20 text-[10px] h-4 px-1.5">
          {badge}
        </Badge>
      )}
    </Link>
  );
}

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      aria-label="사이드바 내비게이션"
      className={cn(
        "relative flex flex-col h-screen bg-[#0a0a0f] border-r border-white/5 transition-all duration-300 ease-in-out flex-shrink-0",
        collapsed ? "w-[72px]" : "w-[240px]"
      )}
    >
      {/* Logo + mobile close */}
      <div className={cn("flex items-center h-16 px-4 gap-3", collapsed && "justify-center px-0")}>
        <Link
          href="/"
          aria-label="LUXE Commerce 홈으로 이동"
          className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-900/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        >
          <Diamond className="w-4 h-4 text-white" aria-hidden="true" />
        </Link>
        {!collapsed && (
          <div className="flex flex-col leading-tight flex-1 min-w-0">
            <span className="text-white font-semibold text-sm tracking-wide">LUXE</span>
            <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase">Commerce</span>
          </div>
        )}
        {/* Mobile close */}
        {!collapsed && onClose && (
          <button
            type="button"
            aria-label="사이드바 닫기"
            onClick={onClose}
            className="md:hidden w-7 h-7 flex items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 flex-shrink-0"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <Separator className="bg-white/5" aria-hidden="true" />

      <nav aria-label="주요 메뉴" className="flex-1 flex flex-col gap-1 px-2 py-4 overflow-y-auto">
        {!collapsed && (
          <p className="text-[10px] font-medium text-white/20 uppercase tracking-[0.15em] px-2 mb-2" aria-hidden="true">
            Main Menu
          </p>
        )}
        {mainNav.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            active={pathname === item.href}
            collapsed={collapsed}
            onClick={onClose}
          />
        ))}
      </nav>

      <Separator className="bg-white/5" aria-hidden="true" />

      <nav aria-label="하단 메뉴" className="flex flex-col gap-1 px-2 py-4">
        {bottomNav.map((item) => (
          <BottomNavItem key={item.href} {...item} collapsed={collapsed} onClick={onClose} />
        ))}
      </nav>

      {/* Collapse toggle — desktop only */}
      <button
        type="button"
        aria-label={collapsed ? "사이드바 펼치기" : "사이드바 접기"}
        aria-expanded={!collapsed}
        onClick={() => setCollapsed(!collapsed)}
        className="hidden md:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#1a1a2e] border border-white/10 items-center justify-center text-white/40 hover:text-white hover:bg-[#252540] transition-all duration-150 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      >
        {collapsed
          ? <ChevronRight className="w-3 h-3" aria-hidden="true" />
          : <ChevronLeft className="w-3 h-3" aria-hidden="true" />
        }
      </button>
    </aside>
  );
}
