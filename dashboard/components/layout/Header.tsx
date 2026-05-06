"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const pageMeta: Record<string, { title: string; sub: string }> = {
  "/":             { title: "Overview",      sub: "Tuesday, May 6, 2026" },
  "/orders":       { title: "Orders",        sub: "Manage and track all transactions" },
  "/products":     { title: "Products",      sub: "Catalog and inventory management" },
  "/clients":      { title: "Clients",       sub: "Customer relationship management" },
  "/analytics":    { title: "Analytics",     sub: "Performance insights and trends" },
  "/invoices":     { title: "Invoices",      sub: "Billing and invoice records" },
  "/payments":     { title: "Payments",      sub: "Transaction ledger" },
  "/markets":      { title: "Markets",       sub: "Regional sales breakdown" },
  "/notifications":{ title: "Notifications", sub: "Activity alerts and updates" },
  "/settings":     { title: "Settings",      sub: "Account and preferences" },
  "/help":         { title: "Help & Support",sub: "Documentation and support tickets" },
};

export default function Header() {
  const pathname = usePathname();
  const meta = pageMeta[pathname] ?? { title: "Dashboard", sub: "" };

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-30 flex-shrink-0">
      <div className="flex flex-col">
        <h1 className="text-white font-semibold text-base leading-tight">{meta.title}</h1>
        {meta.sub && <p className="text-white/30 text-xs">{meta.sub}</p>}
      </div>

      <div className="hidden md:flex items-center gap-2 w-72 h-9 px-3 rounded-lg bg-white/5 border border-white/8 text-white/40 hover:border-white/15 transition-colors cursor-text">
        <Search className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="text-xs flex-1">Search orders, products, clients…</span>
        <kbd className="text-[10px] bg-white/8 border border-white/10 rounded px-1.5 py-0.5 font-mono">⌘K</kbd>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Button variant="ghost" size="icon" className="w-9 h-9 text-white/40 hover:text-white hover:bg-white/5">
            <Bell className="w-4 h-4" />
          </Button>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500 ring-2 ring-[#0a0a0f]" />
        </div>
        <div className="w-px h-6 bg-white/8 mx-1" />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors outline-none">
            <Avatar className="w-7 h-7">
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-700 text-white text-[11px] font-semibold">
                JP
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="text-white text-xs font-medium">Junhwa Park</span>
              <span className="text-white/30 text-[10px]">Administrator</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-white/30 ml-0.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-[#13131f] border-white/10 text-white">
            <DropdownMenuLabel className="text-white/50 text-xs font-normal">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/8" />
            <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5 text-sm cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5 text-sm cursor-pointer">Preferences</DropdownMenuItem>
            <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5 text-sm cursor-pointer">API Keys</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/8" />
            <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-red-500/10 text-sm cursor-pointer">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
