import Link from "next/link";
import { ArrowRight, TrendingUp, Users, DollarSign, Package, Bell, Star, Clock, Award } from "lucide-react";
const cards = [
  { title:"Total Revenue", value:"$28.4M", sub:"vs last month", icon:DollarSign, color:"text-violet-400", bg:"bg-violet-500/10" },
  { title:"New Clients", value:"284", sub:"+22.5% growth", icon:Users, color:"text-sky-400", bg:"bg-sky-500/10" },
  { title:"Orders", value:"4,823", sub:"this month", icon:Package, color:"text-emerald-400", bg:"bg-emerald-500/10" },
  { title:"Avg. Rating", value:"4.86", sub:"from 842 reviews", icon:Star, color:"text-amber-400", bg:"bg-amber-500/10" },
  { title:"Notifications", value:"12", sub:"unread messages", icon:Bell, color:"text-rose-400", bg:"bg-rose-500/10" },
  { title:"Auth. Time", value:"2.4d", sub:"average duration", icon:Clock, color:"text-teal-400", bg:"bg-teal-500/10" },
  { title:"Badges Earned", value:"18", sub:"team achievements", icon:Award, color:"text-fuchsia-400", bg:"bg-fuchsia-500/10" },
  { title:"Growth Rate", value:"14.2%", sub:"year over year", icon:TrendingUp, color:"text-lime-400", bg:"bg-lime-500/10" },
];
export default function BasicWidgetsPage() {
  return (
    <div className="space-y-4 pb-4">
      <div className="panel p-5">
        <h2 className="t-text font-semibold text-sm mb-4">Basic Stat Widgets</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map(c => { const Icon = c.icon; return (
            <div key={c.title} className="panel p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${c.bg}`}><Icon className={`w-5 h-5 ${c.color}`} /></div>
              <div><p className="t-text font-bold text-xl">{c.value}</p><p className="t-text-30 text-[10px]">{c.title}</p></div>
            </div>
          ); })}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[{ title:"Revenue This Month", value:"$4.1M", change:"+18%", color:"text-emerald-400" },
          { title:"Deals Closed", value:"47", change:"+12%", color:"text-violet-400" },
          { title:"New Signups", value:"284", change:"+22%", color:"text-sky-400" }].map(c => (
          <div key={c.title} className="panel p-5">
            <p className="t-text-40 text-xs">{c.title}</p>
            <p className="t-text font-bold text-2xl mt-1">{c.value}</p>
            <p className={`text-xs font-semibold mt-1 ${c.color}`}>{c.change} this month</p>
          </div>
        ))}
      </div>
    </div>
  );
}
