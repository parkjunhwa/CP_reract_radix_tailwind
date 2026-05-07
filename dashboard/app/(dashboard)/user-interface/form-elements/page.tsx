"use client";

import { useState } from "react";
import {
  User, Mail, Lock, Eye, EyeOff, Search, Calendar as CalendarIcon,
  Upload, X,
} from "lucide-react";

import * as Form from "@radix-ui/react-form";

import { Input, InputAddon, InputGroup } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="panel flex h-full min-h-0 flex-col">
      <header className="shrink-0 border-b t-border px-5 py-3.5">
        <h3 className="t-text font-semibold text-sm">{title}</h3>
        {description && <p className="t-text-40 text-xs mt-0.5">{description}</p>}
      </header>
      <div className="min-h-0 flex-1 overflow-auto p-5">{children}</div>
    </section>
  );
}

function TextFieldDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
      <div className="space-y-1.5">
        <Label htmlFor="fe-default">Default</Label>
        <Input id="fe-default" placeholder="Enter your name" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="fe-icon">With leading icon</Label>
        <InputGroup>
          <InputAddon><User /></InputAddon>
          <Input id="fe-icon" placeholder="Enter your name" />
        </InputGroup>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="fe-email">Email</Label>
        <InputGroup>
          <InputAddon><Mail /></InputAddon>
          <Input id="fe-email" type="email" placeholder="you@luxe.com" />
        </InputGroup>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="fe-help">With helper text</Label>
        <Input id="fe-help" placeholder="https://" aria-describedby="fe-help-desc" />
        <p id="fe-help-desc" className="t-text-40 text-xs">We&apos;ll never share this URL.</p>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="fe-error">With error</Label>
        <Input id="fe-error" invalid defaultValue="invalid value" />
        <p className="text-red-500 text-xs">This field is required.</p>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="fe-success">With success</Label>
        <Input id="fe-success" valid defaultValue="great@luxe.com" />
        <p className="text-emerald-500 text-xs">Looks good!</p>
      </div>
      <div className="space-y-1.5 md:col-span-2">
        <Label htmlFor="fe-disabled">Disabled</Label>
        <Input id="fe-disabled" disabled defaultValue="Read only value" />
      </div>
    </div>
  );
}

function PasswordDemo() {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-1.5 max-w-sm">
      <Label htmlFor="fe-password">Password</Label>
      <InputGroup>
        <InputAddon><Lock /></InputAddon>
        <Input id="fe-password" type={show ? "text" : "password"} placeholder="••••••••" />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="t-text-50 t-hover-2 rounded p-1"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        </button>
      </InputGroup>
    </div>
  );
}

function SelectDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="space-y-1.5 max-w-sm">
      <Label htmlFor="fe-country">Country</Label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger id="fe-country" className="w-full h-9">
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          {["United States", "United Kingdom", "France", "Japan", "Switzerland", "UAE"].map((c) => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function CheckboxDemo() {
  return (
    <div className="space-y-2.5 max-w-sm">
      {[
        { id: "fe-cb-1", label: "Subscribe to newsletter", checked: true },
        { id: "fe-cb-2", label: "Enable weekly digest",     checked: false },
        { id: "fe-cb-3", label: "Disabled option",          checked: false, disabled: true },
      ].map((c) => (
        <div key={c.id} className="flex items-center gap-2.5">
          <Checkbox id={c.id} defaultChecked={c.checked} disabled={c.disabled} />
          <Label htmlFor={c.id} className="t-text-60 cursor-pointer">{c.label}</Label>
        </div>
      ))}
    </div>
  );
}

function RadioDemo() {
  return (
    <RadioGroup defaultValue="annual" className="space-y-2.5 max-w-sm">
      {[
        { id: "fe-rd-monthly", value: "monthly", label: "Billed monthly" },
        { id: "fe-rd-annual",  value: "annual",  label: "Billed annually (save 20%)" },
        { id: "fe-rd-custom",  value: "custom",  label: "Custom contract" },
      ].map((r) => (
        <div key={r.id} className="flex items-center gap-2.5">
          <RadioGroupItem id={r.id} value={r.value} />
          <Label htmlFor={r.id} className="t-text-60 cursor-pointer">{r.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}

function CustomInputDemo() {
  const [option, setOption] = useState("annual");
  const options = [
    { value: "monthly", title: "Monthly",  price: "$24",  desc: "Pay-as-you-go pricing" },
    { value: "annual",  title: "Annual",   price: "$220", desc: "Save 20% with yearly billing" },
    { value: "lifetime",title: "Lifetime", price: "$899", desc: "One-time payment, lifetime access" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
      {options.map((o) => {
        const active = option === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => setOption(o.value)}
            className={`text-left p-4 rounded-xl transition-colors ${active ? "" : "t-hover"}`}
            style={{
              border: `1px solid ${active ? "var(--t-accent)" : "var(--t-border)"}`,
              backgroundColor: active ? "var(--t-accent-soft)" : "transparent",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="t-text font-semibold text-sm">{o.title}</span>
              <span
                className="h-4 w-4 rounded-full"
                style={{
                  border: `1px solid ${active ? "var(--t-accent)" : "var(--t-border-2)"}`,
                  backgroundColor: active ? "var(--t-accent)" : "transparent",
                }}
              />
            </div>
            <div className="t-text font-bold text-lg mt-1">{o.price}</div>
            <div className="t-text-40 text-xs mt-1">{o.desc}</div>
          </button>
        );
      })}
    </div>
  );
}

function TextareaDemo() {
  return (
    <div className="space-y-1.5 max-w-2xl">
      <Label htmlFor="fe-bio">Bio</Label>
      <Textarea id="fe-bio" rows={4} placeholder="Tell us a bit about yourself..." />
    </div>
  );
}

function AutocompleteDemo() {
  const all = [
    "Switzerland", "United States", "United Kingdom", "Sweden", "Spain",
    "Singapore", "Saudi Arabia", "South Korea", "South Africa",
  ];
  const [query, setQuery] = useState("S");
  const [open, setOpen] = useState(false);
  const matches = all.filter((c) => c.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="relative max-w-sm space-y-1.5">
      <Label htmlFor="fe-ac">Country</Label>
      <InputGroup>
        <InputAddon><Search /></InputAddon>
        <Input
          id="fe-ac"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          placeholder="Search countries"
        />
      </InputGroup>
      {open && matches.length > 0 && (
        <div
          className="absolute left-0 right-0 mt-1 rounded-lg overflow-hidden z-10"
          style={{ backgroundColor: "var(--t-surface)", border: "1px solid var(--t-border)", boxShadow: "var(--t-shadow)" }}
        >
          {matches.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => { setQuery(m); setOpen(false); }}
              className="w-full text-left px-3 py-2 t-text text-sm t-hover"
            >
              {m}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PickerDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl">
      <div className="space-y-1.5">
        <Label htmlFor="fe-date">Date</Label>
        <InputGroup>
          <InputAddon><CalendarIcon /></InputAddon>
          <Input id="fe-date" type="date" />
        </InputGroup>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="fe-time">Time</Label>
        <Input id="fe-time" type="time" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="fe-month">Month</Label>
        <Input id="fe-month" type="month" />
      </div>
    </div>
  );
}

function SwitchDemo() {
  return (
    <div className="space-y-3 max-w-sm">
      {[
        { id: "fe-sw-1", label: "Email notifications",   defaultChecked: true },
        { id: "fe-sw-2", label: "Push notifications",    defaultChecked: false },
        { id: "fe-sw-3", label: "Weekly summary",        defaultChecked: true },
        { id: "fe-sw-4", label: "Disabled toggle",       defaultChecked: false, disabled: true },
      ].map((s) => (
        <div key={s.id} className="flex items-center justify-between">
          <Label htmlFor={s.id} className="t-text-60 cursor-pointer">{s.label}</Label>
          <Switch id={s.id} defaultChecked={s.defaultChecked} disabled={s.disabled} />
        </div>
      ))}
    </div>
  );
}

function FileUploaderDemo() {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <Form.Root className="space-y-3 max-w-2xl">
      <Form.Field name="files">
        <Form.Label
          htmlFor="fe-file"
          className="flex flex-col items-center justify-center gap-2 py-8 rounded-xl cursor-pointer t-hover"
          style={{ border: "1px dashed var(--t-border-3)" }}
        >
          <Upload className="w-6 h-6 t-text-50" />
          <span className="t-text-60 text-sm">Click to upload or drag &amp; drop</span>
          <span className="t-text-40 text-xs">PNG, JPG, PDF up to 10MB</span>
          <Form.Control asChild>
            <input
              id="fe-file"
              type="file"
              multiple
              aria-label="Upload files"
              className="sr-only"
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
            />
          </Form.Control>
        </Form.Label>
      </Form.Field>
      {files.length > 0 && (
        <ul className="space-y-1.5">
          {files.map((f) => (
            <li
              key={f.name}
              className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg"
              style={{ backgroundColor: "var(--t-surface-2)" }}
            >
              <span className="t-text text-sm truncate">{f.name}</span>
              <button
                type="button"
                onClick={() => setFiles(files.filter((x) => x !== f))}
                className="t-text-50 t-hover-2 p-1 rounded"
                aria-label={`Remove ${f.name}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Form.Root>
  );
}

function EditorDemo() {
  const [value, setValue] = useState("Welcome to the LUXE editor preview.\n\nUse this space to draft long-form content.");
  return (
    <Form.Root className="rounded-lg overflow-hidden max-w-3xl" style={{ border: "1px solid var(--t-border)" }}>
      <div className="flex items-center gap-1 px-2 py-1.5" style={{ backgroundColor: "var(--t-surface-2)", borderBottom: "1px solid var(--t-border)" }}>
        {["B", "I", "U", "•", "1.", "—", "”"].map((tok) => (
          <Button key={tok} variant="ghost" size="icon-xs" aria-label={`Editor action ${tok}`}>
            <span className="t-text text-xs font-semibold">{tok}</span>
          </Button>
        ))}
      </div>
      <Form.Field name="editor">
        <Form.Label className="sr-only">Editor</Form.Label>
        <Form.Control asChild>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={6}
            aria-label="Editor"
            className="w-full p-3 t-text text-sm bg-transparent outline-none resize-y"
          />
        </Form.Control>
      </Form.Field>
    </Form.Root>
  );
}

function SliderDemo() {
  const [value, setValue] = useState(40);
  return (
    <Form.Root className="space-y-3 max-w-sm">
      <Form.Field name="volume" className="space-y-3">
        <div className="flex items-center justify-between t-text-60 text-xs">
          <Form.Label asChild>
            <Label htmlFor="fe-slider">Volume</Label>
          </Form.Label>
          <span className="t-text font-medium">{value}</span>
        </div>
        <Form.Control asChild>
          <input
            id="fe-slider"
            type="range"
            min={0}
            max={100}
            value={value}
            aria-label="Volume"
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full accent-[color:var(--t-accent)]"
          />
        </Form.Control>
      </Form.Field>
    </Form.Root>
  );
}

export default function FormElementsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      <Section title="Text Field" description="Single-line input with adornment, helper, and validation states.">
        <TextFieldDemo />
      </Section>

      <Section title="Password" description="Text field with reveal/hide toggle.">
        <PasswordDemo />
      </Section>

      <Section title="Select" description="Drop-down list of options powered by Radix Select.">
        <SelectDemo />
      </Section>

      <Section title="Checkbox" description="Independent boolean choices.">
        <CheckboxDemo />
      </Section>

      <Section title="Radio" description="Mutually exclusive choices.">
        <RadioDemo />
      </Section>

      <Section title="Custom Inputs" description="Card-style picker with rich content.">
        <CustomInputDemo />
      </Section>

      <Section title="Textarea" description="Multi-line text input.">
        <TextareaDemo />
      </Section>

      <Section title="Autocomplete" description="Searchable list with keyboard-friendly suggestions.">
        <AutocompleteDemo />
      </Section>

      <Section title="Picker" description="Date, time, and month inputs.">
        <PickerDemo />
      </Section>

      <Section title="Switch" description="On/off toggles for settings.">
        <SwitchDemo />
      </Section>

      <Section title="File Uploader" description="Drag-and-drop file selector with file chip list.">
        <FileUploaderDemo />
      </Section>

      <Section title="Editor" description="Lightweight rich-text-style editor scaffold.">
        <EditorDemo />
      </Section>

      <Section title="Slider" description="Range input with accent fill.">
        <SliderDemo />
      </Section>
    </div>
  );
}
