"use client";
import { useState } from "react";
import { Bell, Check, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
const NOTES = [
  {id:1,avatar:"CF",color:"from-violet-500 to-purple-700",title:"Congratulations Flora 🎉",sub:"Won the monthly bestseller gold badge",time:"1h ago",read:false,type:"award"},
  {id:2,avatar:"CB",color:"from-sky-500 to-blue-700",title:"Cecilia Becker",sub:"Accepted your connection request",time:"12h ago",read:false,type:"social"},
  {id:3,avatar:"BW",color:"from-emerald-500 to-teal-700",title:"New message from Bernard Woods",sub:"You have new message from Bernard Woods",time:"May 18, 8:26 AM",read:true,type:"message"},
  {id:4,avatar:"MR",color:"from-amber-500 to-orange-700",title:"Monthly Report Generated",sub:"July month financial report is generated",time:"Apr 24, 10:30 AM",read:true,type:"report"},
  {id:5,avatar:"GA",color:"from-rose-500 to-pink-700",title:"Application Approved 🚀",sub:"Your Meta Gadgets project application has been approved",time:"Feb 17, 12:17 PM",read:true,type:"system"},
  {id:6,avatar:"HM",color:"from-teal-500 to-cyan-700",title:"New message from Harry",sub:"You have new message from Harry",time:"Jan 6, 1:48 PM",read:true,type:"message"},
];
const TYPE_BADGE: Record<string,string> = { award:"bg-amber-500/10 text-amber-400 border-amber-500/20", social:"bg-sky-500/10 text-sky-400 border-sky-500/20", message:"bg-violet-500/10 text-violet-400 border-violet-500/20", report:"bg-emerald-500/10 text-emerald-400 border-emerald-500/20", system:"bg-rose-500/10 text-rose-400 border-rose-500/20" };
export default function NotificationsPage() {
  const [notes, setNotes] = useState(NOTES);
  const unread = notes.filter(n=>!n.read).length;
  return (
    <div className="space-y-4 pb-4 max-w-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2"><Bell className="w-5 h-5 t-text-50"/><h2 className="t-text font-semibold text-sm">Notifications</h2>{unread>0&&<Badge className="text-[10px] px-1.5 h-4 border" style={{backgroundColor:"var(--t-accent-soft)",borderColor:"var(--t-border-2)",color:"var(--t-accent-text)"}}>{unread} unread</Badge>}</div>
        <button onClick={()=>setNotes(n=>n.map(x=>({...x,read:true})))} className="text-xs t-text-40 hover:t-text-70 transition-colors">Mark all as read</button>
      </div>
      <div className="panel divide-y" style={{borderColor:"var(--t-border)"}}>
        {notes.map(n=>(
          <div key={n.id} className={cn("flex items-start gap-3 px-5 py-4 transition-colors",!n.read&&"bg-[var(--luxe-accent-2)]","hover:bg-[var(--t-hover)]")}>
            <Avatar className="w-9 h-9 flex-shrink-0"><AvatarFallback className={cn("bg-gradient-to-br text-white text-[10px] font-bold",n.color)}>{n.avatar}</AvatarFallback></Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className={cn("text-xs leading-snug",n.read?"t-text-60":"t-text-80 font-medium")}>{n.title}</p>
                <span className="t-text-30 text-[10px] flex-shrink-0">{n.time}</span>
              </div>
              <p className="t-text-40 text-[10px] mt-0.5">{n.sub}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <Badge className={cn("text-[9px] px-1.5 border capitalize",TYPE_BADGE[n.type]||"")}>{n.type}</Badge>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {!n.read&&<button onClick={()=>setNotes(ns=>ns.map(x=>x.id===n.id?{...x,read:true}:x))} className="p-1 rounded t-text-30 hover:text-emerald-400 transition-colors" title="Mark as read"><Check className="w-3.5 h-3.5"/></button>}
              <button onClick={()=>setNotes(ns=>ns.filter(x=>x.id!==n.id))} className="p-1 rounded t-text-30 hover:text-red-400 transition-colors" title="Delete"><Trash2 className="w-3.5 h-3.5"/></button>
            </div>
          </div>
        ))}
        {notes.length===0&&<div className="py-12 text-center"><Bell className="w-10 h-10 mx-auto mb-3 t-text-20"/><p className="t-text-40 text-sm">No notifications</p></div>}
      </div>
    </div>
  );
}
