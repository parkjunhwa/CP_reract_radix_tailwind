"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, ChevronDown, Sun, Moon, Monitor, Menu } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const pageMeta: Record<string, { title: string; sub: string }> = {
  "/":              { title: "Overview",       sub: "Tuesday, May 6, 2026" },
  "/orders":        { title: "Orders",         sub: "Manage and track all transactions" },
  "/products":      { title: "Products",       sub: "Catalog and inventory management" },
  "/clients":       { title: "Clients",        sub: "Customer relationship management" },
  "/analytics":     { title: "Analytics",      sub: "Performance insights and trends" },
  "/invoices":      { title: "Invoices",       sub: "Billing and invoice records" },
  "/payments":      { title: "Payments",       sub: "Transaction ledger" },
  "/markets":       { title: "Markets",        sub: "Regional sales breakdown" },
  "/notifications": { title: "Notifications",  sub: "Activity alerts and updates" },
  "/settings":      { title: "Settings",       sub: "Account and preferences" },
  "/help":          { title: "Help & Support", sub: "Documentation and support tickets" },
};

const THEME_OPTIONS = [
  { value: "light",  label: "Light",  icon: Sun },
  { value: "dark",   label: "Dark",   icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

interface HeaderProps {
  onMenuToggle?: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const pathname = usePathname();
  const meta = pageMeta[pathname] ?? { title: "Dashboard", sub: "" };
  const { theme, setTheme } = useTheme();

  const ThemeIcon = theme === "light" ? Sun : theme === "system" ? Monitor : Moon;

  return (
    <header
      role="banner"
      className="h-16 flex items-center justify-between px-4 md:px-6 bg-[#0a0a0f]/80 dark:bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-30 flex-shrink-0"
    >
      {/* Mobile menu button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="사이드바 메뉴 열기"
          aria-expanded="false"
          onClick={onMenuToggle}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        >
          <Menu className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Page title */}
        <div className="flex flex-col">
          <h1 className="text-white font-semibold text-base leading-tight">{meta.title}</h1>
          {meta.sub && <p className="text-white/30 text-xs hidden sm:block">{meta.sub}</p>}
        </div>
      </div>

      {/* Center: Search */}
      <div
        role="search"
        className="hidden md:flex items-center gap-2 w-72 h-9 px-3 rounded-lg bg-white/5 border border-white/8 text-white/40 hover:border-white/15 transition-colors cursor-text"
      >
        <Search className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
        <span className="text-xs flex-1">Search orders, products, clients…</span>
        <kbd className="text-[10px] bg-white/8 border border-white/10 rounded px-1.5 py-0.5 font-mono" aria-label="단축키 Cmd K">⌘K</kbd>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 md:gap-2">
        {/* Theme toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label={`현재 테마: ${theme}. 테마 변경`}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            <ThemeIcon className="w-4 h-4" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36 bg-[#13131f] border-white/10 text-white" role="menu">
            <DropdownMenuLabel className="text-white/40 text-xs font-normal">테마 선택</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/8" />
            {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
              <DropdownMenuItem
                key={value}
                role="menuitemradio"
                aria-checked={theme === value}
                onClick={() => setTheme(value)}
                className={cn(
                  "flex items-center gap-2 text-sm cursor-pointer",
                  theme === value
                    ? "text-violet-300 bg-violet-600/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                {label}
                {theme === value && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" aria-hidden="true" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            aria-label="알림 5개 미읽음"
            className="w-9 h-9 text-white/40 hover:text-white hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            <Bell className="w-4 h-4" aria-hidden="true" />
          </Button>
          <span
            aria-hidden="true"
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500 ring-2 ring-[#0a0a0f]"
          />
        </div>

        <div className="w-px h-6 bg-white/8 mx-1 hidden sm:block" aria-hidden="true" />

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="계정 메뉴 열기"
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            <Avatar className="w-7 h-7">
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-700 text-white text-[11px] font-semibold">
                JP
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="text-white text-xs font-medium">Junhwa Park</span>
              <span className="text-white/30 text-[10px]">Administrator</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-white/30 ml-0.5 hidden sm:block" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-[#13131f] border-white/10 text-white" role="menu">
            <DropdownMenuLabel className="text-white/50 text-xs font-normal">내 계정</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/8" />
            <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5 text-sm cursor-pointer">프로필</DropdownMenuItem>
            <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5 text-sm cursor-pointer">환경설정</DropdownMenuItem>
            <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5 text-sm cursor-pointer">API 키</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/8" />
            <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-red-500/10 text-sm cursor-pointer">로그아웃</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
