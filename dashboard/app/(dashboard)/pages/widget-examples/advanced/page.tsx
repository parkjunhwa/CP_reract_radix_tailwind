"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
const data = [{m:"Jan",r:2.1},{m:"Feb",r:2.4},{m:"Mar",r:2.8},{m:"Apr",r:3.2},{m:"May",r:2.9},{m:"Jun",r:4.1},{m:"Jul",r:3.8},{m:"Aug",r:5.0},{m:"Sep",r:4.4},{m:"Oct",r:6.2},{m:"Nov",r:5.8},{m:"Dec",r:9.4}];
const leaderboard = [{name:"James Worthington",region:"New York",revenue:"$4.2M",pct:88},{name:"Sofia Marchetti",region:"Milan",revenue:"$3.1M",pct:72},{name:"Robert Chen",region:"Hong Kong",revenue:"$2.8M",pct:65},{name:"Yuki Tanaka",region:"Tokyo",revenue:"$2.4M",pct:58}];
const TS = {backgroundColor:"var(--luxe-sidebar-2)",border:"1px solid var(--t-border-2)",borderRadius:8,fontSize:12};
export default function AdvancedWidgetsPage() {
  return (
    <div className="space-y-4 pb-4">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="panel p-5"><h3 className="t-text font-semibold text-sm mb-4">Revenue Bar Chart</h3>
          <ResponsiveContainer width="100%" height={200}><BarChart data={data}><XAxis dataKey="m" tick={{fontSize:10,fill:"var(--t-text-40)"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:10,fill:"var(--t-text-40)"}} axisLine={false} tickLine={false}/><Tooltip contentStyle={TS}/><Bar dataKey="r" fill="#7c3aed" radius={[4,4,0,0]} name="Revenue ($M)"/></BarChart></ResponsiveContainer>
        </div>
        <div className="panel p-5"><h3 className="t-text font-semibold text-sm mb-4">Top Sales Reps</h3>
          <div className="space-y-4">{leaderboard.map((rep,i)=>(
            <div key={rep.name} className="flex items-center gap-3"><span className="t-text-30 text-xs w-4 flex-shrink-0">#{i+1}</span>
              <div className="flex-1 min-w-0"><div className="flex justify-between mb-1"><span className="t-text-70 text-xs font-medium truncate">{rep.name}</span><span className="t-text font-semibold text-xs">{rep.revenue}</span></div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{backgroundColor:"var(--t-border)"}}><div className="h-full rounded-full bg-violet-500" style={{width:`${rep.pct}%`}}/></div>
              </div>
            </div>
          ))}</div>
        </div>
      </div>
    </div>
  );
}
