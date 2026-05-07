"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

type EventColor = "violet" | "sky" | "emerald" | "amber" | "rose";

interface CalEvent { id: string; title: string; date: number; time: string; color: EventColor; allDay?: boolean }

const colorMap: Record<EventColor, string> = {
  violet: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  sky:    "bg-sky-500/20 text-sky-300 border-sky-500/30",
  emerald:"bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  amber:  "bg-amber-500/20 text-amber-300 border-amber-500/30",
  rose:   "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

const EVENTS: CalEvent[] = [
  { id: "ev1", title: "AP Royal Oak Meeting", date: 7, time: "2:00 PM", color: "violet" },
  { id: "ev2", title: "Invoice Review", date: 7, time: "4:00 PM", color: "sky" },
  { id: "ev3", title: "Q2 Board Presentation", date: 12, time: "10:00 AM", color: "emerald", allDay: false },
  { id: "ev4", title: "Chanel Viewing — Milan", date: 15, time: "All Day", color: "amber", allDay: true },
  { id: "ev5", title: "Logistics Review", date: 16, time: "9:00 AM", color: "rose" },
  { id: "ev6", title: "New Client Onboarding", date: 20, time: "11:00 AM", color: "violet" },
  { id: "ev7", title: "Rolex Auction — Geneva", date: 22, time: "All Day", color: "amber", allDay: true },
  { id: "ev8", title: "Team Standup", date: 22, time: "9:00 AM", color: "sky" },
  { id: "ev9", title: "Inventory Audit", date: 28, time: "3:00 PM", color: "emerald" },
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const upcomingEvents = [
  { title: "AP Royal Oak Meeting", date: "May 7", time: "2:00 PM", color: "violet" as EventColor },
  { title: "Invoice Review", date: "May 7", time: "4:00 PM", color: "sky" as EventColor },
  { title: "Q2 Board Presentation", date: "May 12", time: "10:00 AM", color: "emerald" as EventColor },
  { title: "Chanel Viewing — Milan", date: "May 15", time: "All Day", color: "amber" as EventColor },
  { title: "Logistics Review", date: "May 16", time: "9:00 AM", color: "rose" as EventColor },
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1)); // May 2026
  const [selectedDay, setSelectedDay] = useState(7);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getEventsForDay = (day: number) => EVENTS.filter(e => e.date === day);

  return (
    <div className="space-y-4 pb-4">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* Calendar grid */}
        <div className="xl:col-span-3 panel p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="t-text font-bold text-base">{MONTHS[month]} {year}</h2>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg border flex items-center justify-center t-text-40 hover:t-text-70 hover:bg-[var(--t-hover)] transition-colors" style={{ borderColor: "var(--t-border-2)" }} onClick={prevMonth}>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="h-8 px-3 rounded-lg text-xs font-medium border t-text-60 hover:bg-[var(--t-hover)] transition-colors" style={{ borderColor: "var(--t-border-2)" }}
                onClick={() => setCurrentDate(new Date(2026, 4, 1))}>Today</button>
              <button className="w-8 h-8 rounded-lg border flex items-center justify-center t-text-40 hover:t-text-70 hover:bg-[var(--t-hover)] transition-colors" style={{ borderColor: "var(--t-border-2)" }} onClick={nextMonth}>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button className="h-8 px-3 rounded-lg text-xs font-medium text-white ml-2 flex items-center gap-1.5" style={{ backgroundColor: "var(--t-accent)" }}>
                <Plus className="w-3.5 h-3.5" /> Event
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[10px] font-medium uppercase tracking-wide t-text-30 py-2">{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} />;
              const dayEvents = getEventsForDay(day);
              const isToday = day === 7 && month === 4 && year === 2026;
              const isSelected = day === selectedDay;
              return (
                <div key={day} onClick={() => setSelectedDay(day)}
                  className={cn("rounded-lg p-1.5 min-h-[70px] cursor-pointer transition-colors border",
                    isSelected ? "border-[var(--t-accent)]" : "border-transparent hover:bg-[var(--t-hover)]"
                  )}>
                  <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mb-1",
                    isToday ? "text-white" : "t-text-60"
                  )} style={isToday ? { backgroundColor: "var(--t-accent)" } : {}}>
                    {day}
                  </div>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 2).map(ev => (
                      <div key={ev.id} className={cn("text-[9px] px-1 py-0.5 rounded truncate border", colorMap[ev.color])}>
                        {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[9px] t-text-30 px-1">+{dayEvents.length - 2} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming events */}
        <div className="panel p-5 space-y-4">
          <h3 className="t-text font-semibold text-sm">Upcoming Events</h3>
          <div className="space-y-2">
            {upcomingEvents.map((ev, i) => (
              <div key={i} className={cn("rounded-lg p-3 border", colorMap[ev.color])}>
                <p className="text-xs font-semibold">{ev.title}</p>
                <p className="text-[10px] mt-1 opacity-70">{ev.date} · {ev.time}</p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="t-text font-semibold text-sm mb-3">Legend</h3>
            {[
              { label: "Meetings", color: "violet" as EventColor },
              { label: "Client Events", color: "amber" as EventColor },
              { label: "Internal", color: "sky" as EventColor },
              { label: "Business", color: "emerald" as EventColor },
              { label: "Operations", color: "rose" as EventColor },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-2 mb-1.5">
                <div className={cn("w-2.5 h-2.5 rounded-full border", colorMap[color])} />
                <span className="t-text-40 text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
