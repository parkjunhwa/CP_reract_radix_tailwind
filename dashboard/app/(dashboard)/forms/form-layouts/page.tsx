"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Building, Globe } from "lucide-react";

function SectionHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--t-border)" }}>
      <h3 className="t-text font-semibold text-sm">{title}</h3>
      <p className="t-text-40 text-xs mt-0.5">{sub}</p>
    </div>
  );
}

function InputField({ label, placeholder, type = "text", icon: Icon }: { label: string; placeholder: string; type?: string; icon?: React.ElementType }) {
  return (
    <div className="space-y-1.5">
      <label className="t-text-50 text-xs font-medium">{label}</label>
      <div className={`flex items-center gap-2 h-9 rounded-lg border transition-colors focus-within:border-[var(--t-accent)] ${Icon ? "px-3" : ""}`}
        style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }}>
        {Icon && <Icon className="w-3.5 h-3.5 t-text-30 flex-shrink-0" />}
        <input type={type} placeholder={placeholder}
          className={`${Icon ? "" : "px-3"} flex-1 bg-transparent text-xs outline-none text-[color:var(--t-text-70)] placeholder:text-[color:var(--t-text-30)] h-full w-full`} />
      </div>
    </div>
  );
}

export default function FormLayoutsPage() {
  const [country, setCountry] = useState("");
  return (
    <div className="space-y-4 pb-4 max-w-4xl">
      {/* Basic layout */}
      <div className="panel">
        <SectionHeader title="Basic Form Layout" sub="Simple single-column form with labeled inputs" />
        <div className="p-5 space-y-4 max-w-sm">
          <InputField label="Full Name" placeholder="James Worthington" icon={User} />
          <InputField label="Email Address" placeholder="j.worthington@luxe.com" type="email" icon={Mail} />
          <InputField label="Phone Number" placeholder="+1 (212) 555-0100" type="tel" icon={Phone} />
          <div className="flex justify-end gap-2">
            <button className="h-9 px-4 rounded-lg border text-xs font-medium t-text-60 hover:bg-[var(--t-hover)]" style={{ borderColor: "var(--t-border-2)" }}>Cancel</button>
            <button className="h-9 px-4 rounded-lg text-white text-xs font-medium" style={{ backgroundColor: "var(--t-accent)" }}>Save</button>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="panel">
        <SectionHeader title="Two Column Layout" sub="Side-by-side fields for compact data entry" />
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="First Name" placeholder="James" icon={User} />
            <InputField label="Last Name" placeholder="Worthington" />
            <InputField label="Email" placeholder="j.worthington@luxe.com" type="email" icon={Mail} />
            <InputField label="Phone" placeholder="+1 (212) 555-0100" type="tel" icon={Phone} />
            <InputField label="Company" placeholder="LUXE Commerce Inc." icon={Building} />
            <InputField label="Website" placeholder="https://luxe.com" icon={Globe} />
          </div>
          <div className="space-y-1.5">
            <label className="t-text-50 text-xs font-medium">Address</label>
            <div className="flex items-center gap-2 h-9 px-3 rounded-lg border transition-colors focus-within:border-[var(--t-accent)]"
              style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }}>
              <MapPin className="w-3.5 h-3.5 t-text-30" />
              <input placeholder="1 Fifth Avenue, Suite 100" className="flex-1 bg-transparent text-xs outline-none text-[color:var(--t-text-70)] placeholder:text-[color:var(--t-text-30)]" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField label="City" placeholder="New York" />
            <div className="space-y-1.5">
              <label className="t-text-50 text-xs font-medium">Country</label>
              <select value={country} onChange={e => setCountry(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border text-xs outline-none t-text-70 transition-colors focus:border-[var(--t-accent)]"
                style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }}>
                <option value="">Select country</option>
                {["United States","United Kingdom","France","Japan","Switzerland","UAE"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <InputField label="ZIP / Postal Code" placeholder="10001" />
          </div>
          <div className="flex justify-end gap-2">
            <button className="h-9 px-4 rounded-lg border text-xs font-medium t-text-60 hover:bg-[var(--t-hover)]" style={{ borderColor: "var(--t-border-2)" }}>Reset</button>
            <button className="h-9 px-4 rounded-lg text-white text-xs font-medium" style={{ backgroundColor: "var(--t-accent)" }}>Submit</button>
          </div>
        </div>
      </div>

      {/* Collapsible sections */}
      <div className="panel">
        <SectionHeader title="Section-based Layout" sub="Form divided into logical collapsible groups" />
        <div className="p-5 space-y-5">
          {[
            { label: "Personal Information", fields: [["Full Name", "James Worthington"], ["Job Title", "Senior Account Manager"], ["Department", "Luxury Sales"]] },
            { label: "Contact Details", fields: [["Business Email", "j.worthington@luxe.com"], ["Mobile", "+1 (212) 555-0100"], ["Office Extension", "4201"]] },
          ].map((section) => (
            <div key={section.label}>
              <h4 className="t-text-60 text-xs font-semibold mb-3 pb-2" style={{ borderBottom: "1px solid var(--t-border)" }}>{section.label}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {section.fields.map(([label, placeholder]) => (
                  <InputField key={label} label={label} placeholder={placeholder} />
                ))}
              </div>
            </div>
          ))}
          <div>
            <h4 className="t-text-60 text-xs font-semibold mb-3 pb-2" style={{ borderBottom: "1px solid var(--t-border)" }}>Preferences</h4>
            <div className="space-y-2">
              {["Receive email notifications", "Enable two-factor authentication", "Subscribe to product updates"].map((opt) => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" defaultChecked={opt.includes("two-factor")} />
                    <div className="w-4 h-4 rounded border-2 peer-checked:bg-violet-500 peer-checked:border-violet-500 transition-colors" style={{ borderColor: "var(--t-border-2)" }} />
                  </div>
                  <span className="t-text-60 text-xs">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button className="h-9 px-4 rounded-lg border text-xs font-medium t-text-60 hover:bg-[var(--t-hover)]" style={{ borderColor: "var(--t-border-2)" }}>Cancel</button>
            <button className="h-9 px-4 rounded-lg text-white text-xs font-medium" style={{ backgroundColor: "var(--t-accent)" }}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
