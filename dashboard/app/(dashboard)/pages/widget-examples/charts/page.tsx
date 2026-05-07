"use client";
import { AreaChart, Area, PieChart, Pie, Cell, RadialBarChart, RadialBar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
const areaData = [{m:"Jan",v:2.1},{m:"Feb",v:2.4},{m:"Mar",v:2.8},{m:"Apr",v:3.2},{m:"May",v:2.9},{m:"Jun",v:4.1},{m:"Jul",v:3.8},{m:"Aug",v:5.0}];
const pieData = [{n:"Watches",v:38,c:"#7c3aed"},{n:"Jewelry",v:27,c:"#f59e0b"},{n:"Fashion",v:18,c:"#ec4899"},{n:"Art",v:11,c:"#0ea5e9"},{n:"Spirits",v:6,c:"#10b981"}];
const radialData = [{name:"Q4",value:94,fill:"#7c3aed"},{name:"Q3",value:78,fill:"#0ea5e9"},{name:"Q2",value:65,fill:"#10b981"},{name:"Q1",value:52,fill:"#f59e0b"}];
const TS = {backgroundColor:"var(--luxe-sidebar-2)",border:"1px solid var(--t-border-2)",borderRadius:8,fontSize:12};
export default function ChartsWidgetsPage() {
  return (
    <div className="space-y-4 pb-4">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="panel p-5"><h3 className="t-text font-semibold text-sm mb-4">Area Chart Widget</h3>
          <ResponsiveContainer width="100%" height={160}><AreaChart data={areaData}><defs><linearGradient id="wg1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/><stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="var(--t-border)"/><XAxis dataKey="m" tick={{fontSize:10,fill:"var(--t-text-40)"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:10,fill:"var(--t-text-40)"}} axisLine={false} tickLine={false}/><Tooltip contentStyle={TS}/><Area type="monotone" dataKey="v" stroke="#7c3aed" fill="url(#wg1)" strokeWidth={2} name="Revenue ($M)"/></AreaChart></ResponsiveContainer>
        </div>
        <div className="panel p-5"><h3 className="t-text font-semibold text-sm mb-2">Donut Chart Widget</h3>
          <div className="flex items-center gap-4"><ResponsiveContainer width="45%" height={160}><PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="v">{pieData.map((e,i)=><Cell key={i} fill={e.c}/>)}</Pie><Tooltip contentStyle={TS} formatter={(v:number)=>`${v}%`}/></PieChart></ResponsiveContainer>
            <div className="flex-1 space-y-2">{pieData.map(d=><div key={d.n} className="flex items-center gap-2"><div className="w-2 h-2 rounded-full flex-shrink-0" style={{backgroundColor:d.c}}/><span className="t-text-50 text-xs flex-1">{d.n}</span><span className="t-text-40 text-xs font-semibold">{d.v}%</span></div>)}</div>
          </div>
        </div>
      </div>
      <div className="panel p-5"><h3 className="t-text font-semibold text-sm mb-4">Radial Bar — Quarterly Goals</h3>
        <ResponsiveContainer width="100%" height={180}><RadialBarChart data={radialData} innerRadius={30} outerRadius={110} startAngle={180} endAngle={0}><RadialBar dataKey="value" cornerRadius={6}/><Tooltip contentStyle={TS} formatter={(v:number)=>`${v}%`}/></RadialBarChart></ResponsiveContainer>
      </div>
    </div>
  );
}
