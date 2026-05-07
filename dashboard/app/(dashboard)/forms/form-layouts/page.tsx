"use client";

import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import {
  User, Mail, Phone, MapPin, Building, Globe, type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input, InputAddon, InputGroup } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

function SectionHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--t-border)" }}>
      <h3 className="t-text font-semibold text-sm">{title}</h3>
      <p className="t-text-40 text-xs mt-0.5">{sub}</p>
    </div>
  );
}

function Field({
  id, label, placeholder, type = "text", icon: Icon, name,
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  icon?: LucideIcon;
  name?: string;
}) {
  const fieldName = name ?? id;
  if (Icon) {
    return (
      <Form.Field name={fieldName} className="space-y-1.5">
        <Form.Label asChild>
          <Label htmlFor={id}>{label}</Label>
        </Form.Label>
        <InputGroup>
          <InputAddon><Icon /></InputAddon>
          <Form.Control asChild>
            <Input id={id} type={type} placeholder={placeholder} />
          </Form.Control>
        </InputGroup>
      </Form.Field>
    );
  }
  return (
    <Form.Field name={fieldName} className="space-y-1.5">
      <Form.Label asChild>
        <Label htmlFor={id}>{label}</Label>
      </Form.Label>
      <Form.Control asChild>
        <Input id={id} type={type} placeholder={placeholder} />
      </Form.Control>
    </Form.Field>
  );
}

const COUNTRIES = ["United States", "United Kingdom", "France", "Japan", "Switzerland", "UAE"];

const SECTIONS = [
  {
    label: "Personal Information",
    fields: [
      ["personal-fullname", "Full Name", "James Worthington"],
      ["personal-job", "Job Title", "Senior Account Manager"],
      ["personal-dept", "Department", "Luxury Sales"],
    ],
  },
  {
    label: "Contact Details",
    fields: [
      ["contact-email", "Business Email", "j.worthington@luxe.com"],
      ["contact-mobile", "Mobile", "+1 (212) 555-0100"],
      ["contact-ext", "Office Extension", "4201"],
    ],
  },
] as const;

const PREFERENCES = [
  { id: "pref-email", label: "Receive email notifications", checked: false },
  { id: "pref-2fa", label: "Enable two-factor authentication", checked: true },
  { id: "pref-updates", label: "Subscribe to product updates", checked: false },
];

export default function FormLayoutsPage() {
  const [country, setCountry] = useState("");

  return (
    <div className="space-y-3 pb-0">
      {/* Basic layout */}
      <div className="panel">
        <SectionHeader title="Basic Form Layout" sub="Simple single-column form with labeled inputs" />
        <Form.Root className="p-5 space-y-3 max-w-sm">
          <Field id="basic-name" label="Full Name" placeholder="James Worthington" icon={User} />
          <Field id="basic-email" label="Email Address" placeholder="j.worthington@luxe.com" type="email" icon={Mail} />
          <Field id="basic-phone" label="Phone Number" placeholder="+1 (212) 555-0100" type="tel" icon={Phone} />
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="lg" type="button">Cancel</Button>
            <Form.Submit asChild>
              <Button size="lg" className="bg-[color:var(--t-accent)] text-white hover:bg-[color:var(--t-accent-h)]">Save</Button>
            </Form.Submit>
          </div>
        </Form.Root>
      </div>

      {/* Two-column layout */}
      <div className="panel">
        <SectionHeader title="Two Column Layout" sub="Side-by-side fields for compact data entry" />
        <Form.Root className="p-5 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field id="two-first" label="First Name" placeholder="James" icon={User} />
            <Field id="two-last" label="Last Name" placeholder="Worthington" />
            <Field id="two-email" label="Email" placeholder="j.worthington@luxe.com" type="email" icon={Mail} />
            <Field id="two-phone" label="Phone" placeholder="+1 (212) 555-0100" type="tel" icon={Phone} />
            <Field id="two-company" label="Company" placeholder="LUXE Commerce Inc." icon={Building} />
            <Field id="two-website" label="Website" placeholder="https://luxe.com" icon={Globe} />
          </div>

          <Form.Field name="two-address" className="space-y-1.5">
            <Form.Label asChild>
              <Label htmlFor="two-address">Address</Label>
            </Form.Label>
            <InputGroup>
              <InputAddon><MapPin /></InputAddon>
              <Form.Control asChild>
                <Input id="two-address" placeholder="1 Fifth Avenue, Suite 100" />
              </Form.Control>
            </InputGroup>
          </Form.Field>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Field id="two-city" label="City" placeholder="New York" />
            <Form.Field name="two-country" className="space-y-1.5">
              <Form.Label asChild>
                <Label htmlFor="two-country">Country</Label>
              </Form.Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger id="two-country" className="w-full h-9">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Form.Field>
            <Field id="two-zip" label="ZIP / Postal Code" placeholder="10001" />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="lg" type="reset">Reset</Button>
            <Form.Submit asChild>
              <Button size="lg" className="bg-[color:var(--t-accent)] text-white hover:bg-[color:var(--t-accent-h)]">Submit</Button>
            </Form.Submit>
          </div>
        </Form.Root>
      </div>

      {/* Section-based layout */}
      <div className="panel">
        <SectionHeader title="Section-based Layout" sub="Form divided into logical groups" />
        <Form.Root className="p-5 space-y-5">
          {SECTIONS.map((section) => (
            <div key={section.label}>
              <h4
                className="t-text-60 text-xs font-semibold mb-3 pb-2"
                style={{ borderBottom: "1px solid var(--t-border)" }}
              >
                {section.label}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {section.fields.map(([id, label, placeholder]) => (
                  <Field key={id} id={id} label={label} placeholder={placeholder} />
                ))}
              </div>
            </div>
          ))}

          <div>
            <h4
              className="t-text-60 text-xs font-semibold mb-3 pb-2"
              style={{ borderBottom: "1px solid var(--t-border)" }}
            >
              Preferences
            </h4>
            <div className="space-y-2.5">
              {PREFERENCES.map((opt) => (
                <Form.Field key={opt.id} name={opt.id} className="flex items-center gap-2.5">
                  <Form.Control asChild>
                    <Checkbox id={opt.id} defaultChecked={opt.checked} />
                  </Form.Control>
                  <Form.Label asChild>
                    <Label htmlFor={opt.id} className="text-[color:var(--t-text-60)] cursor-pointer">
                      {opt.label}
                    </Label>
                  </Form.Label>
                </Form.Field>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="lg" type="button">Cancel</Button>
            <Form.Submit asChild>
              <Button size="lg" className="bg-[color:var(--t-accent)] text-white hover:bg-[color:var(--t-accent-h)]">
                Save Changes
              </Button>
            </Form.Submit>
          </div>
        </Form.Root>
      </div>
    </div>
  );
}
