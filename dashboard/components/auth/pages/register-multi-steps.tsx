"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, CreditCard, FileText, User } from "lucide-react";

import * as Form from "@radix-ui/react-form";
import { AuthLabeledInput, AuthLabeledPassword } from "@/components/auth/auth-fields";
import { AuthLogoLink, AuthPrimaryButton } from "@/components/auth/auth-ui";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AUTH_ASSETS } from "@/lib/auth-assets";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const STEPS = [
  { title: "Account", sub: "Enter your Account Details", Icon: FileText },
  { title: "Personal", sub: "Setup Information", Icon: User },
  { title: "Billing", sub: "Add Social Links", Icon: CreditCard },
] as const;

const US_STATES = [
  { value: "new-york", label: "New York" },
  { value: "california", label: "California" },
  { value: "texas", label: "Texas" },
  { value: "florida", label: "Florida" },
  { value: "washington", label: "Washington" },
];

export default function RegisterMultiStepsPage() {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const maskSrc = dark ? AUTH_ASSETS.regMultiMask.dark : AUTH_ASSETS.regMultiMask.light;

  const [step, setStep] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [profileLink, setProfileLink] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pin, setPin] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("new-york");
  const [plan, setPlan] = useState("standard");
  const [cardNo, setCardNo] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  return (
    <div className="flex min-h-dvh w-full flex-col bg-[color:var(--t-bg)] lg:flex-row">
      <div className="relative hidden min-h-dvh w-full max-w-[380px] flex-col items-center justify-center overflow-hidden border-r border-[color:var(--t-border)] px-6 lg:flex xl:max-w-[450px]">
        <Image
          src={AUTH_ASSETS.regMultiCharacter}
          alt=""
          width={440}
          height={560}
          className="relative z-[2] mx-auto my-12 h-auto w-full max-w-[320px] object-contain"
          priority
        />
        <Image
          src={maskSrc}
          alt=""
          width={800}
          height={260}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-auto max-h-[40%] w-full object-cover object-bottom opacity-90"
        />
      </div>

      <div className="relative flex min-h-dvh flex-1 flex-col bg-[color:var(--t-surface)] px-6 py-10 lg:px-12">
        <div className="absolute left-6 top-5 lg:left-10 lg:top-9">
          <AuthLogoLink className="mb-0" />
        </div>

        <div className="mx-auto flex w-full max-w-[740px] flex-1 flex-col justify-center pt-16 lg:pt-10">
          <nav aria-label="Registration progress" className="mb-10">
            <ol className="grid gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center md:gap-2">
              {STEPS.map((s, i) => {
                const Icon = s.Icon;
                const active = step === i;
                const done = step > i;
                return (
                  <li key={s.title} className="contents">
                    <div className="flex items-start gap-3 md:flex-col md:items-center md:text-center">
                      <span
                        className={cn(
                          "inline-flex size-10 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold",
                          done || active
                            ? "border-[color:var(--t-accent)] bg-[color:var(--t-accent-soft)] text-[color:var(--t-accent)]"
                            : "border-[color:var(--t-border-2)] bg-[color:var(--t-surface-2)] text-[color:var(--t-text-40)]",
                        )}
                      >
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1 md:w-full">
                        <p
                          className={cn(
                            "text-[11px] font-semibold uppercase tracking-wider",
                            active ? "text-[color:var(--t-accent)]" : "text-[color:var(--t-text-40)]",
                          )}
                        >
                          {s.title}
                        </p>
                        <p className="text-sm font-medium text-[color:var(--t-text)]">{s.sub}</p>
                      </div>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="hidden md:flex md:items-center md:justify-center" aria-hidden>
                        <ChevronRight className="size-5 text-[color:var(--t-text-30)]" />
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          {step === 0 && (
            <section className="space-y-5" aria-labelledby="step-account-heading">
              <div>
                <h2 id="step-account-heading" className="text-xl font-bold text-[color:var(--t-text)]">
                  Account Information
                </h2>
                <p className="text-sm text-[color:var(--t-text-50)]">Enter Your Account Details</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <AuthLabeledInput
                  id="rms-user"
                  label="Username"
                  value={username}
                  onChange={setUsername}
                  placeholder="johnDoe"
                  autoComplete="username"
                  autoFocus
                />
                <AuthLabeledInput
                  id="rms-email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="john.deo@gmail.com"
                  autoComplete="email"
                />
                <AuthLabeledPassword
                  id="rms-p1"
                  label="Password"
                  value={pass}
                  onChange={setPass}
                  shown={show1}
                  onToggle={() => setShow1((x) => !x)}
                />
                <AuthLabeledPassword
                  id="rms-p2"
                  label="Confirm Password"
                  value={pass2}
                  onChange={setPass2}
                  shown={show2}
                  onToggle={() => setShow2((x) => !x)}
                />
                <div className="sm:col-span-2">
                  <AuthLabeledInput
                    id="rms-profile"
                    label="Profile Link"
                    value={profileLink}
                    onChange={setProfileLink}
                    placeholder="johndoe/profile"
                  />
                </div>
              </div>
              <div className="flex flex-wrap justify-between gap-3 pt-2">
                <button
                  type="button"
                  disabled
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-[color:var(--t-border-2)] px-4 text-sm text-[color:var(--t-text-30)] opacity-50"
                >
                  <ChevronLeft className="size-4" /> Previous
                </button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-[color:var(--t-accent)] bg-[color:var(--t-accent-soft)] px-4 text-sm font-medium text-[color:var(--t-accent)]"
                >
                  Next <ChevronRight className="size-4" />
                </button>
              </div>
            </section>
          )}

          {step === 1 && (
            <Form.Root className="space-y-5" aria-labelledby="step-personal-heading">
              <div>
                <h2 id="step-personal-heading" className="text-xl font-bold text-[color:var(--t-text)]">
                  Personal Information
                </h2>
                <p className="text-sm text-[color:var(--t-text-50)]">Enter Your Personal Information</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <AuthLabeledInput
                  id="rms-fn"
                  label="First Name"
                  value={firstName}
                  onChange={setFirstName}
                  placeholder="John"
                  autoComplete="given-name"
                />
                <AuthLabeledInput
                  id="rms-ln"
                  label="Last Name"
                  value={lastName}
                  onChange={setLastName}
                  placeholder="Doe"
                  autoComplete="family-name"
                />
                <Form.Field name="mobile" className="space-y-1.5 sm:col-span-2">
                  <Form.Label asChild>
                    <Label htmlFor="rms-mobile" className="text-sm text-[color:var(--t-text-50)]">
                      Mobile
                    </Label>
                  </Form.Label>
                  <div className="flex rounded-lg border border-[color:var(--t-border-2)] bg-[color:var(--t-input-bg)] focus-within:border-[color:var(--t-accent)] focus-within:ring-2 focus-within:ring-[color:var(--t-ring)]/30">
                    <span className="flex shrink-0 items-center border-r border-[color:var(--t-border-2)] px-3 text-xs text-[color:var(--t-text-50)]">
                      US (+1)
                    </span>
                    <Form.Control asChild>
                      <Input
                        id="rms-mobile"
                        type="tel"
                        inputMode="numeric"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="202 555 0111"
                        className="h-10 flex-1 rounded-l-none border-0 bg-transparent shadow-none focus-visible:ring-0"
                      />
                    </Form.Control>
                  </div>
                </Form.Field>
                <AuthLabeledInput
                  id="rms-pin"
                  label="Pin Code"
                  value={pin}
                  onChange={setPin}
                  placeholder="689421"
                />
                <div className="sm:col-span-2">
                  <AuthLabeledInput
                    id="rms-addr"
                    label="Address"
                    value={address}
                    onChange={setAddress}
                    placeholder="1456, Liberty Street"
                  />
                </div>
                <div className="sm:col-span-2">
                  <AuthLabeledInput
                    id="rms-lm"
                    label="Landmark"
                    value={landmark}
                    onChange={setLandmark}
                    placeholder="Nr. Wall Street"
                  />
                </div>
                <AuthLabeledInput id="rms-city" label="City" value={city} onChange={setCity} placeholder="Miami" />
                <Form.Field name="state" className="space-y-1.5">
                  <Form.Label asChild>
                    <Label htmlFor="rms-state" className="text-sm text-[color:var(--t-text-50)]">
                      State
                    </Label>
                  </Form.Label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger id="rms-state" className="h-10 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {US_STATES.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Form.Field>
              </div>
              <div className="flex flex-wrap justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-[color:var(--t-border-2)] bg-[color:var(--t-surface-2)] px-4 text-sm text-[color:var(--t-text)] hover:bg-[color:var(--t-hover)]"
                >
                  <ChevronLeft className="size-4" /> Previous
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-[color:var(--t-accent)] bg-[color:var(--t-accent-soft)] px-4 text-sm font-medium text-[color:var(--t-accent)]"
                >
                  Next <ChevronRight className="size-4" />
                </button>
              </div>
            </Form.Root>
          )}

          {step === 2 && (
            <section className="space-y-8" aria-labelledby="step-billing-heading">
              <div>
                <h2 id="step-billing-heading" className="text-xl font-bold text-[color:var(--t-text)]">
                  Select Plan
                </h2>
                <p className="text-sm text-[color:var(--t-text-50)]">Select plan as per your requirement</p>
              </div>

              <RadioGroup value={plan} onValueChange={setPlan} className="grid gap-4 sm:grid-cols-3">
                {[
                  { id: "basic", title: "Basic", line: "A simple start for start ups & Students", price: "0" },
                  { id: "standard", title: "Standard", line: "For small to medium businesses", price: "99" },
                  { id: "enterprise", title: "Enterprise", line: "Solution for enterprise & organizations", price: "499" },
                ].map((p) => (
                  <div key={p.id}>
                    <RadioGroupItem value={p.id} id={`plan-${p.id}`} className="peer sr-only" />
                    <Label
                      htmlFor={`plan-${p.id}`}
                      className={cn(
                        "flex cursor-pointer flex-col rounded-xl border p-4 transition-colors",
                        plan === p.id
                          ? "border-[color:var(--t-accent)] bg-[color:var(--t-accent-soft)]"
                          : "border-[color:var(--t-border-2)] bg-[color:var(--t-surface-2)] hover:border-[color:var(--t-border-3)]",
                      )}
                    >
                      <span className="text-sm font-semibold text-[color:var(--t-text)]">{p.title}</span>
                      <span className="mt-1 text-xs text-[color:var(--t-text-50)]">{p.line}</span>
                      <div className="mt-3 flex items-baseline gap-0.5">
                        <span className="text-xs font-medium text-[color:var(--t-accent)]">$</span>
                        <span className="text-2xl font-bold text-[color:var(--t-accent)]">{p.price}</span>
                        <span className="text-xs text-[color:var(--t-text-30)]">/month</span>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div>
                <h3 className="text-lg font-bold text-[color:var(--t-text)]">Payment Information</h3>
                <p className="text-sm text-[color:var(--t-text-50)]">Enter your card information</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <AuthLabeledInput
                    id="rms-card"
                    label="Card Number"
                    value={cardNo}
                    onChange={setCardNo}
                    placeholder="1356 3215 6548 7898"
                  />
                </div>
                <AuthLabeledInput
                  id="rms-cname"
                  label="Name On Card"
                  value={cardName}
                  onChange={setCardName}
                  placeholder="John Doe"
                />
                <AuthLabeledInput
                  id="rms-exp"
                  label="Expiry Date"
                  value={expiry}
                  onChange={setExpiry}
                  placeholder="MM/YY"
                />
                <AuthLabeledInput id="rms-cvv" label="CVV Code" value={cvv} onChange={setCvv} placeholder="654" />
              </div>

              <div className="flex flex-wrap justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-[color:var(--t-border-2)] bg-[color:var(--t-surface-2)] px-4 text-sm text-[color:var(--t-text)] hover:bg-[color:var(--t-hover)]"
                >
                  <ChevronLeft className="size-4" /> Previous
                </button>
                <AuthPrimaryButton
                  type="button"
                  className="w-auto min-w-[120px]"
                  onClick={() => alert("Submitted..!!")}
                  style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}
                >
                  Submit
                </AuthPrimaryButton>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
