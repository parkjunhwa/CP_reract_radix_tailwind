"use client";
import { useState } from "react";
import { Download, Share2, Trash2, Plus, Edit, Copy, ExternalLink, RefreshCcw, Upload, Star, Bell, Archive } from "lucide-react";
import { cn } from "@/lib/utils";
export default function ActionsWidgetsPage() {
  const [starred, setStarred] = useState(new Set([1, 3]));
  const [liked, setLiked] = useState<number[]>([]);
  const btnSolid = "h-9 px-4 rounded-lg text-white text-xs font-medium hover:opacity-90 transition-all flex items-center gap-1.5";
  const btnOutline = "h-9 px-4 rounded-lg border text-xs font-medium t-text-60 hover:bg-[var(--t-hover)] transition-colors flex items-center gap-1.5";
  return (
    <div className="space-y-3 pb-0">
      <div className="panel p-5 space-y-3">
        <h3 className="t-text font-semibold text-sm">Solid Buttons</h3>
        <div className="flex flex-wrap gap-2">
          {[["var(--t-accent)","Primary"],["#10b981","Success"],["#f59e0b","Warning"],["#ef4444","Danger"],["#0ea5e9","Info"]].map(([c,l])=>(
            <button key={l as string} className={btnSolid} style={{backgroundColor:c as string}}>{l}</button>
          ))}
        </div>
      </div>
      <div className="panel p-5 space-y-3">
        <h3 className="t-text font-semibold text-sm">Action Icon Buttons</h3>
        <div className="flex flex-wrap gap-2">
          {[Download,Share2,Edit,Copy,Trash2,ExternalLink,RefreshCcw,Upload,Archive,Plus].map((Icon,i)=>(
            <button key={i} className="w-9 h-9 rounded-lg border flex items-center justify-center t-text-40 hover:t-text-70 hover:bg-[var(--t-hover)] transition-colors" style={{borderColor:"var(--t-border-2)"}}>
              <Icon className="w-4 h-4"/>
            </button>
          ))}
        </div>
      </div>
      <div className="panel p-5 space-y-3">
        <h3 className="t-text font-semibold text-sm">Interactive Toggles</h3>
        <div className="space-y-3">
          {[{id:1,name:"Patek Philippe Nautilus"},{id:2,name:"Richard Mille RM 011"},{id:3,name:"Cartier Diamond Set"}].map(item=>(
            <div key={item.id} className="flex items-center justify-between p-3 rounded-lg" style={{backgroundColor:"var(--t-hover)"}}>
              <span className="t-text-60 text-xs font-medium">{item.name}</span>
              <div className="flex items-center gap-2">
                <button onClick={()=>setStarred(s=>{const n=new Set(s);n.has(item.id)?n.delete(item.id):n.add(item.id);return n;})} className={cn("p-1.5 rounded-md transition-colors",starred.has(item.id)?"text-amber-400":"t-text-30 hover:text-amber-400")}>
                  <Star className="w-4 h-4"/>
                </button>
                <button onClick={()=>setLiked(l=>l.includes(item.id)?l.filter(x=>x!==item.id):[...l,item.id])} className={cn("p-1.5 rounded-md transition-colors",liked.includes(item.id)?"text-violet-400":"t-text-30 hover:text-violet-400")}>
                  <Bell className="w-4 h-4"/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
