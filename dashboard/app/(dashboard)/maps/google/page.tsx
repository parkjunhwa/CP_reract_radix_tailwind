import {
  Building2,
  Car,
  Clock3,
  ExternalLink,
  Layers,
  LocateFixed,
  MapPin,
  Navigation,
  Route,
  Search,
  Store,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const mapViews = [
  {
    title: "Flagship Store Locator",
    description: "Search-ready embed focused on the Ginza retail district.",
    src: "https://www.google.com/maps?q=Ginza%20Tokyo%20luxury%20shopping&output=embed",
    icon: Search,
    badge: "Search",
    cls: "bg-sky-500/10 text-sky-500 border-sky-500/20",
  },
  {
    title: "Paris Clienteling Zone",
    description: "A compact map frame for client visit planning near Champs-Elysees.",
    src: "https://www.google.com/maps?q=Champs-Elysees%20Paris%20luxury%20stores&output=embed",
    icon: Users,
    badge: "Clienteling",
    cls: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  },
  {
    title: "NYC Pickup Coverage",
    description: "Delivery and pickup planning around Madison Avenue.",
    src: "https://www.google.com/maps?q=Madison%20Avenue%20New%20York%20luxury%20shopping&output=embed",
    icon: Car,
    badge: "Delivery",
    cls: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
];

const stores = [
  {
    name: "Tokyo Ginza Flagship",
    address: "6 Chome-10 Ginza, Chuo City",
    city: "Tokyo",
    status: "Open",
    orders: 128,
    eta: "8 min",
    cls: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  {
    name: "Paris Avenue Studio",
    address: "Avenue des Champs-Elysees",
    city: "Paris",
    status: "Busy",
    orders: 94,
    eta: "14 min",
    cls: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  {
    name: "New York Madison",
    address: "Madison Ave, Upper East Side",
    city: "New York",
    status: "Open",
    orders: 112,
    eta: "11 min",
    cls: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  {
    name: "London Mayfair",
    address: "New Bond Street, Mayfair",
    city: "London",
    status: "Limited",
    orders: 76,
    eta: "19 min",
    cls: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  },
];

const routePlans = [
  { from: "Tokyo Ginza", to: "Narita VIP Lounge", distance: "68 km", time: "54 min", priority: "High" },
  { from: "Paris Studio", to: "CDG Private Terminal", distance: "31 km", time: "42 min", priority: "Medium" },
  { from: "NY Madison", to: "JFK Concierge Desk", distance: "26 km", time: "38 min", priority: "High" },
];

const layerOptions = [
  { label: "Traffic", value: "Live ETA", icon: Navigation, cls: "text-sky-500 bg-sky-500/10" },
  { label: "Stores", value: "42 pins", icon: Store, cls: "text-violet-500 bg-violet-500/10" },
  { label: "Delivery", value: "18 routes", icon: Route, cls: "text-emerald-500 bg-emerald-500/10" },
  { label: "Territory", value: "6 zones", icon: Layers, cls: "text-amber-500 bg-amber-500/10" },
];

function MapFrame({ title, src }: { title: string; src: string }) {
  return (
    <div className="flex flex-1 min-h-[220px] flex-col justify-center overflow-hidden rounded-xl border border-(--t-border) bg-(--t-hover)">
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="flex-1 min-h-[220px] w-full border-0"
      />
    </div>
  );
}

export default function GoogleMapsPage() {
  return (
    <div className="space-y-3 pb-0">
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="panel p-5">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="t-text text-sm font-semibold">Google Maps Embed</h3>
              <p className="t-text-40 mt-1 text-xs">
                API key 없이 동작하는 Google Maps embed 예시입니다. Store locator, delivery coverage, route planning에 맞춰 쓸 수 있습니다.
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Ginza%20Tokyo%20luxury%20shopping"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-(--t-border-2) px-3 text-xs font-medium t-text-60 transition-colors hover:bg-(--t-hover)"
            >
              Open Google Maps <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <MapFrame title="Google map of Ginza Tokyo luxury shopping" src={mapViews[0].src} />
        </div>

        <div className="space-y-3">
          <div className="panel p-5">
            <h3 className="t-text text-sm font-semibold">Map Layers</h3>
            <p className="t-text-40 mt-1 text-xs">Common layer toggles for operations screens.</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {layerOptions.map(({ label, value, icon: Icon, cls }) => (
                <div key={label} className="rounded-xl border border-(--t-border) p-3">
                  <div className={cn("mb-3 flex h-8 w-8 items-center justify-center rounded-lg", cls)}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="t-text-70 text-xs font-semibold">{label}</p>
                  <p className="t-text-30 mt-0.5 text-[10px]">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-5">
            <h3 className="t-text text-sm font-semibold">Coverage Snapshot</h3>
            <div className="mt-4 space-y-3">
              {[
                ["Stores online", "38 / 42", "text-emerald-500"],
                ["Avg delivery ETA", "16 min", "text-sky-500"],
                ["VIP appointments", "127", "text-violet-500"],
              ].map(([label, value, cls]) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="t-text-40 text-xs">{label}</span>
                  <span className={cn("text-xs font-semibold", cls)}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
        {mapViews.map(({ title, description, src, icon: Icon, badge, cls }) => (
          <div key={title} className="panel p-5">
            <div className="mb-3 flex items-start justify-between gap-2">
              <div>
                <h3 className="t-text text-sm font-semibold">{title}</h3>
                <p className="t-text-40 mt-1 text-xs">{description}</p>
              </div>
              <Badge className={cn("shrink-0 border px-2 text-[10px]", cls)}>
                <Icon className="h-3 w-3" />
                {badge}
              </Badge>
            </div>
            <MapFrame title={title} src={src} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1fr_0.9fr]">
        <div className="panel overflow-hidden">
          <div className="border-b border-(--t-border) px-5 py-4">
            <h3 className="t-text text-sm font-semibold">Store Locator List</h3>
            <p className="t-text-40 mt-1 text-xs">Pinned locations paired with operating status and last-mile ETA.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-(--t-border)">
                  {["Store", "City", "Status", "Orders", "Courier ETA"].map((heading) => (
                    <th key={heading} className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider t-text-30">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stores.map((store) => (
                  <tr key={store.name} className="border-b border-(--t-border) last:border-b-0">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="t-text-70 text-xs font-semibold">{store.name}</p>
                          <p className="t-text-30 text-[10px]">{store.address}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs t-text-50">{store.city}</td>
                    <td className="px-5 py-3.5">
                      <Badge className={cn("border px-2 text-[10px]", store.cls)}>{store.status}</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-xs font-semibold t-text-70">{store.orders}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-500">
                        <Clock3 className="h-3 w-3" />
                        {store.eta}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="t-text text-sm font-semibold">Route Planning Cards</h3>
              <p className="t-text-40 mt-1 text-xs">Example records for a directions workflow.</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
              <LocateFixed className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-3">
            {routePlans.map((plan) => (
              <div key={`${plan.from}-${plan.to}`} className="rounded-xl border border-(--t-border) p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-500">
                    <Route className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold t-text-70">{plan.from}</p>
                    <p className="truncate text-xs t-text-40">to {plan.to}</p>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-[10px]">
                      <div>
                        <p className="t-text-30">Distance</p>
                        <p className="t-text-70 font-semibold">{plan.distance}</p>
                      </div>
                      <div>
                        <p className="t-text-30">ETA</p>
                        <p className="t-text-70 font-semibold">{plan.time}</p>
                      </div>
                      <div>
                        <p className="t-text-30">Priority</p>
                        <p className="font-semibold text-amber-500">{plan.priority}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="t-text text-sm font-semibold">Implementation Notes</h3>
            <p className="t-text-40 mt-1 text-xs">
              These examples use public Google Maps embed URLs. Swap the iframe source with the official Maps JavaScript API when API-key driven markers, clustering, or drawing tools are needed.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Store locator", "Route planner", "Coverage zones", "Client appointments"].map((item) => (
              <Badge key={item} className="border border-violet-500/20 bg-violet-500/10 px-2 text-[10px] text-violet-500">
                <Building2 className="h-3 w-3" />
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
