"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  User, Mail, Phone, MapPin, Calendar, Shield,
  TrendingUp, ShoppingBag, Clock, Edit3, Camera,
  Key, LogOut, Star, Award, CheckCircle2, Save, Check,
} from "lucide-react";

const ACTIVITY = [
  { action: "주문 승인", detail: "ORD-7821 · Patek Philippe · $142,000", time: "2분 전", icon: CheckCircle2, color: "text-emerald-400" },
  { action: "고객 등업", detail: "Mei Lin Zhang → Platinum 티어 승급", time: "34분 전", icon: Star, color: "text-amber-400" },
  { action: "인보이스 발행", detail: "INV-2026-0142 · James Worthington", time: "2시간 전", icon: Award, color: "text-violet-400" },
  { action: "설정 변경", detail: "2FA 인증 활성화", time: "1일 전", icon: Shield, color: "text-sky-400" },
  { action: "보고서 조회", detail: "4월 월간 매출 보고서 열람", time: "2일 전", icon: TrendingUp, color: "text-emerald-400" },
];

const STATS = [
  { label: "총 승인 주문", value: "2,841", icon: ShoppingBag, color: "text-violet-400" },
  { label: "관리 고객 수", value: "284",   icon: User,        color: "text-sky-400"    },
  { label: "이번달 처리", value: "147",    icon: CheckCircle2,color: "text-emerald-400" },
  { label: "평균 응답 시간", value: "4분", icon: Clock,       color: "text-amber-400"  },
];

const ROLES = [
  { name: "Administrator", active: true  },
  { name: "Order Manager", active: true  },
  { name: "Analytics",     active: true  },
  { name: "Client Manager",active: true  },
  { name: "Finance",       active: false },
];

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name:     "Junhwa Park",
    email:    "junhwa.park@gmail.com",
    phone:    "+82 10 1234 5678",
    location: "Seoul, South Korea",
    title:    "Administrator",
    bio:      "LUXE Commerce 플랫폼을 관리하는 시니어 어드민입니다. 고가 럭셔리 상품의 거래 승인과 VIP 고객 관리를 담당합니다.",
  });

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputCls = (editable: boolean) => cn(
    "w-full rounded-lg px-3 py-2 text-sm transition-colors outline-none",
    editable
      ? "border focus:border-violet-500/60"
      : "border-transparent cursor-default",
    "border",
  );

  return (
    <div className="space-y-6 pb-6">
      {/* Profile hero card */}
      <div
        className="rounded-xl border p-6"
        style={{ backgroundColor: "var(--luxe-surface)", borderColor: "var(--luxe-border)" }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-700 text-white text-2xl font-bold">
                JP
              </AvatarFallback>
            </Avatar>
            <button
              aria-label="프로필 사진 변경"
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              style={{ backgroundColor: "var(--luxe-surface-2)", borderColor: "var(--luxe-bg)" }}
            >
              <Camera className="w-3.5 h-3.5" style={{ color: "var(--luxe-text-50)" }} aria-hidden="true" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="text-xl font-bold" style={{ color: "var(--luxe-text)" }}>{form.name}</h2>
              <Badge className="bg-violet-600/20 text-violet-300 border-violet-500/20 text-[10px]">Admin</Badge>
              {saved && (
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] flex items-center gap-1">
                  <Check className="w-2.5 h-2.5" aria-hidden="true" /> 저장됨
                </Badge>
              )}
            </div>
            <p className="text-sm mb-3" style={{ color: "var(--luxe-text-40)" }}>{form.title}</p>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Mail,    val: form.email },
                { icon: Phone,   val: form.phone },
                { icon: MapPin,  val: form.location },
                { icon: Calendar,val: "2019년 3월 입사" },
              ].map(({ icon: Icon, val }) => (
                <div key={val} className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" style={{ color: "var(--luxe-text-30)" }} />
                  <span className="text-xs" style={{ color: "var(--luxe-text-50)" }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {editing ? (
              <>
                <button
                  onClick={() => setEditing(false)}
                  className="px-3 py-1.5 rounded-lg border text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  style={{ borderColor: "var(--luxe-border-2)", color: "var(--luxe-text-50)" }}
                >
                  취소
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                >
                  <Save className="w-3.5 h-3.5" aria-hidden="true" /> 저장
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                aria-label="프로필 편집"
                className="px-4 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                style={{ borderColor: "var(--luxe-border-2)", color: "var(--luxe-text-50)" }}
              >
                <Edit3 className="w-3.5 h-3.5" aria-hidden="true" /> 편집
              </button>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="mt-5 pt-5" style={{ borderTop: "1px solid var(--luxe-border)" }}>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--luxe-text-40)" }}>자기소개</label>
          {editing ? (
            <textarea
              value={form.bio}
              onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
              rows={3}
              className="w-full rounded-lg px-3 py-2 text-sm border resize-none outline-none focus:border-violet-500/60 transition-colors"
              style={{ backgroundColor: "var(--luxe-surface-2)", borderColor: "var(--luxe-border-2)", color: "var(--luxe-text-60)" }}
            />
          ) : (
            <p className="text-sm leading-relaxed" style={{ color: "var(--luxe-text-50)" }}>{form.bio}</p>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl border p-4 flex items-center gap-3"
            style={{ backgroundColor: "var(--luxe-surface)", borderColor: "var(--luxe-border)" }}
          >
            <Icon className={cn("w-5 h-5 flex-shrink-0", color)} aria-hidden="true" />
            <div>
              <p className="font-bold text-xl" style={{ color: "var(--luxe-text)" }}>{value}</p>
              <p className="text-xs" style={{ color: "var(--luxe-text-40)" }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal info form */}
        <div
          className="lg:col-span-2 rounded-xl border p-6"
          style={{ backgroundColor: "var(--luxe-surface)", borderColor: "var(--luxe-border)" }}
        >
          <h3 className="font-semibold text-sm mb-5" style={{ color: "var(--luxe-text)" }}>개인 정보</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {([
              { label: "이름",        key: "name"     as const },
              { label: "이메일",      key: "email"    as const },
              { label: "직함",        key: "title"    as const },
              { label: "전화번호",    key: "phone"    as const },
              { label: "위치",        key: "location" as const },
            ]).map(({ label, key }) => (
              <div key={key}>
                <label
                  htmlFor={`field-${key}`}
                  className="text-xs mb-1.5 block"
                  style={{ color: "var(--luxe-text-40)" }}
                >
                  {label}
                </label>
                <input
                  id={`field-${key}`}
                  value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  readOnly={!editing}
                  className={cn(
                    "w-full rounded-lg px-3 py-2 text-sm outline-none border transition-colors",
                    editing ? "focus:border-violet-500/60" : "cursor-default"
                  )}
                  style={{
                    backgroundColor: editing ? "var(--luxe-surface-2)" : "transparent",
                    borderColor: editing ? "var(--luxe-border-2)" : "var(--luxe-border)",
                    color: "var(--luxe-text-60)",
                  }}
                />
              </div>
            ))}
          </div>

          <Separator className="my-5" style={{ backgroundColor: "var(--luxe-border)" }} />

          {/* Security links */}
          <h3 className="font-semibold text-sm mb-4" style={{ color: "var(--luxe-text)" }}>보안 설정</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "비밀번호 변경", icon: Key, href: "/settings?tab=security" },
              { label: "2FA 관리",      icon: Shield, href: "/settings?tab=security" },
              { label: "API 키",        icon: Key, href: "/settings?tab=api" },
            ].map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                style={{ borderColor: "var(--luxe-border-2)", color: "var(--luxe-text-50)" }}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">
          {/* Roles & Permissions */}
          <div
            className="rounded-xl border p-5"
            style={{ backgroundColor: "var(--luxe-surface)", borderColor: "var(--luxe-border)" }}
          >
            <h3 className="font-semibold text-sm mb-4" style={{ color: "var(--luxe-text)" }}>권한 & 역할</h3>
            <ul className="space-y-2" aria-label="역할 목록">
              {ROLES.map(role => (
                <li key={role.name} className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--luxe-text-60)" }}>{role.name}</span>
                  <Badge className={cn(
                    "text-[10px] px-2 border",
                    role.active
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-white/5 text-white/25 border-white/10"
                  )}>
                    {role.active ? "활성" : "비활성"}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent activity */}
          <div
            className="rounded-xl border flex flex-col"
            style={{ backgroundColor: "var(--luxe-surface)", borderColor: "var(--luxe-border)" }}
          >
            <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--luxe-border)" }}>
              <h3 className="font-semibold text-sm" style={{ color: "var(--luxe-text)" }}>최근 활동</h3>
            </div>
            <ul aria-label="최근 활동 목록">
              {ACTIVITY.map((a, i) => {
                const Icon = a.icon;
                return (
                  <li
                    key={i}
                    className="flex items-start gap-3 px-5 py-3 transition-colors"
                    style={{ borderBottom: i < ACTIVITY.length - 1 ? "1px solid var(--luxe-border)" : "none" }}
                  >
                    <Icon className={cn("w-3.5 h-3.5 mt-0.5 flex-shrink-0", a.color)} aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium" style={{ color: "var(--luxe-text-70, var(--luxe-text-60))" }}>{a.action}</p>
                      <p className="text-[11px] truncate mt-0.5" style={{ color: "var(--luxe-text-40)" }}>{a.detail}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: "var(--luxe-text-30)" }}>
                        <time>{a.time}</time>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Danger zone */}
          <div
            className="rounded-xl border p-5"
            style={{ backgroundColor: "var(--luxe-surface)", borderColor: "rgba(239,68,68,0.2)" }}
          >
            <h3 className="font-semibold text-sm text-red-400 mb-3">위험 구역</h3>
            <button
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              aria-label="계정에서 로그아웃"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" /> 로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
