"use client";
import { useState } from "react";
import { Upload, Plus, X } from "lucide-react";
const inputCls = "w-full h-9 px-3 rounded-lg border text-xs outline-none t-text-70 placeholder:t-text-30 focus:border-[var(--t-accent)] transition-colors";
const inputStyle = { backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" };
export default function ProductAddPage() {
  const [tags, setTags] = useState(["Luxury Watch", "Swiss Made"]);
  const [tag, setTag] = useState("");
  return (
    <div className="space-y-4 pb-4 max-w-3xl">
      <div className="panel p-6 space-y-5">
        <h2 className="t-text font-semibold text-sm">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[["Product Name","Patek Philippe Nautilus 5711/1A"], ["SKU","PP-5711-ST-001"], ["Brand","Patek Philippe"], ["Reference","5711/1A-010"]].map(([l,p]) => (
            <div key={l} className="space-y-1.5"><label className="t-text-40 text-xs">{l}</label><input placeholder={p} className={inputCls} style={inputStyle} /></div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5"><label className="t-text-40 text-xs">Category</label>
            <select className={inputCls} style={inputStyle}><option>Luxury Watches</option><option>Fine Jewelry</option><option>Premium Fashion</option><option>Art & Collectibles</option><option>Rare Spirits</option></select>
          </div>
          <div className="space-y-1.5"><label className="t-text-40 text-xs">Status</label>
            <select className={inputCls} style={inputStyle}><option>Active</option><option>Draft</option><option>Out of Stock</option></select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[["Price ($)","142000"], ["Cost ($)","90000"], ["Stock Qty","3"]].map(([l,p]) => (
            <div key={l} className="space-y-1.5"><label className="t-text-40 text-xs">{l}</label><input type="number" placeholder={p} className={inputCls} style={inputStyle} /></div>
          ))}
        </div>
        <div className="space-y-1.5"><label className="t-text-40 text-xs">Description</label>
          <textarea rows={4} placeholder="Reference 5711/1A-010 in steel with blue dial. Full box and papers. 2024 production." className="w-full px-3 py-2 rounded-lg border text-xs t-text-70 outline-none resize-none focus:border-[var(--t-accent)] transition-colors" style={inputStyle} />
        </div>
        <div className="space-y-2"><label className="t-text-40 text-xs">Tags</label>
          <div className="flex flex-wrap gap-1.5 mb-2">{tags.map(t=><span key={t} className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] border text-violet-400 border-violet-500/30 bg-violet-500/10">{t}<button onClick={()=>setTags(ts=>ts.filter(x=>x!==t))}><X className="w-2.5 h-2.5"/></button></span>)}</div>
          <div className="flex gap-2"><input value={tag} onChange={e=>setTag(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&tag.trim()){setTags(ts=>[...ts,tag.trim()]);setTag("");}}} placeholder="Add tag…" className={`flex-1 ${inputCls}`} style={inputStyle}/><button onClick={()=>{if(tag.trim()){setTags(ts=>[...ts,tag]);setTag("");}}} className="h-9 px-3 rounded-lg text-white text-xs" style={{backgroundColor:"var(--t-accent)"}}><Plus className="w-3.5 h-3.5"/></button></div>
        </div>
        <div className="border-2 border-dashed rounded-xl p-8 text-center hover:border-[var(--t-accent)] transition-colors" style={{borderColor:"var(--t-border-2)"}}>
          <Upload className="w-8 h-8 mx-auto mb-2 t-text-30"/><p className="t-text-40 text-xs">Drop product images here, or <span className="text-violet-400 cursor-pointer">browse files</span></p>
        </div>
        <div className="flex justify-end gap-3">
          <button className="h-9 px-4 rounded-lg border text-xs font-medium t-text-60 hover:bg-[var(--t-hover)] transition-colors" style={{borderColor:"var(--t-border-2)"}}>Save Draft</button>
          <button className="h-9 px-4 rounded-lg text-white text-xs font-medium hover:opacity-90" style={{backgroundColor:"var(--t-accent)"}}>Publish Product</button>
        </div>
      </div>
    </div>
  );
}
