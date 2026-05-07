"use client";

import * as Form from "@radix-ui/react-form";
import { Eye, EyeOff } from "lucide-react";

import { Input, InputAddon, InputGroup } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuthLabeledInput(
  props: {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    autoComplete?: string;
    autoFocus?: boolean;
    name?: string;
  },
) {
  const { id, label, type = "text", value, onChange, placeholder, autoComplete, autoFocus, name } = props;
  return (
    <Form.Field name={name ?? id} className="space-y-1.5">
      <Form.Label asChild>
        <Label htmlFor={id} className="text-sm text-[color:var(--t-text-50)]">
          {label}
        </Label>
      </Form.Label>
      <Form.Control asChild>
        <Input
          id={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          size="lg"
          className="h-10 rounded-lg text-sm px-3.5"
        />
      </Form.Control>
    </Form.Field>
  );
}

export function AuthLabeledPassword({
  id,
  label,
  value,
  onChange,
  shown,
  onToggle,
  placeholder = "············",
  name,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  shown: boolean;
  onToggle: () => void;
  placeholder?: string;
  name?: string;
}) {
  return (
    <Form.Field name={name ?? id} className="space-y-1.5">
      <Form.Label asChild>
        <Label htmlFor={id} className="text-sm text-[color:var(--t-text-50)]">
          {label}
        </Label>
      </Form.Label>
      <InputGroup inputSize="lg" className="h-10 rounded-lg px-3">
        <Form.Control asChild>
          <Input
            id={id}
            type={shown ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            autoComplete="current-password"
            className="text-sm border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
        </Form.Control>
        <InputAddon>
          <button
            type="button"
            onClick={onToggle}
            className="rounded-md p-1.5 text-[color:var(--t-text-40)] hover:text-[color:var(--t-text)] transition-colors"
            aria-label={shown ? "Hide password" : "Show password"}
          >
            {shown ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </InputAddon>
      </InputGroup>
    </Form.Field>
  );
}
