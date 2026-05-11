/** Static invoice fixtures for the LUXE Commerce dashboard. */

export type InvoiceStatus = "Paid" | "Sent" | "Draft" | "Downloaded" | "Past Due" | "Partial Payment";

export interface Invoice {
  id: string;
  name: string;
  company: string;
  companyEmail: string;
  country: string;
  contact: string;
  address: string;
  service: string;
  total: number;
  /** 0 means fully paid; otherwise outstanding amount in USD. */
  balance: number;
  issuedDate: string;
  dueDate: string;
  invoiceStatus: InvoiceStatus;
  avatarColor: string;
}

export const STATUS_STYLES: Record<InvoiceStatus, { cls: string; dot: string }> = {
  Paid: { cls: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20", dot: "bg-emerald-500" },
  Sent: { cls: "bg-sky-500/10 text-sky-500 border-sky-500/20", dot: "bg-sky-500" },
  Draft: { cls: "bg-slate-500/10 text-slate-500 border-slate-500/20", dot: "bg-slate-500" },
  Downloaded: { cls: "bg-violet-500/10 text-violet-500 border-violet-500/20", dot: "bg-violet-500" },
  "Past Due": { cls: "bg-red-500/10 text-red-500 border-red-500/20", dot: "bg-red-500" },
  "Partial Payment": { cls: "bg-amber-500/10 text-amber-500 border-amber-500/20", dot: "bg-amber-500" },
};

export const INVOICES: Invoice[] = [
  { id: "4987", name: "Jordan Stevenson", company: "Hall-Robbins PLC", companyEmail: "don85@johnson.com", country: "USA", contact: "(616) 865-4180", address: "7777 Mendez Plains, San Diego CA", service: "Software Development", total: 3428, balance: 724, issuedDate: "13 May 2026", dueDate: "23 May 2026", invoiceStatus: "Past Due", avatarColor: "from-violet-500 to-purple-700" },
  { id: "4988", name: "Stephanie Burns", company: "Mccann LLC and Sons", companyEmail: "brenda49@taylor.info", country: "Haiti", contact: "(226) 204-8287", address: "04033 Wesley Wall Apt. 961", service: "UI/UX Design & Development", total: 5219, balance: 0, issuedDate: "17 May 2026", dueDate: "15 May 2026", invoiceStatus: "Downloaded", avatarColor: "from-sky-500 to-blue-700" },
  { id: "4989", name: "Tony Herrera", company: "Leonard-Garcia and Sons", companyEmail: "smithtiffany@powers.com", country: "Denmark", contact: "(955) 676-1076", address: "5345 Robert Squares", service: "Unlimited Extended License", total: 3719, balance: 0, issuedDate: "19 May 2026", dueDate: "03 May 2026", invoiceStatus: "Paid", avatarColor: "from-emerald-500 to-teal-700" },
  { id: "4990", name: "Kevin Patton", company: "Smith, Miller and Henry LLC", companyEmail: "mejiageorge@lee-perez.com", country: "Cambodia", contact: "(832) 323-6914", address: "19022 Clark Parks Suite 149", service: "Software Development", total: 4749, balance: 0, issuedDate: "06 May 2026", dueDate: "11 May 2026", invoiceStatus: "Sent", avatarColor: "from-amber-500 to-orange-700" },
  { id: "4991", name: "Mrs. Julie Donovan MD", company: "Garcia-Cameron and Sons", companyEmail: "brandon07@pierce.com", country: "Martinique", contact: "(970) 982-3353", address: "8534 Saunders Hill Apt. 583", service: "UI/UX Design & Development", total: 4056, balance: 815, issuedDate: "08 May 2026", dueDate: "30 May 2026", invoiceStatus: "Draft", avatarColor: "from-rose-500 to-pink-700" },
  { id: "4992", name: "Amanda Phillips", company: "Burnett-Young PLC", companyEmail: "guerrerobrandy@beasley-harper.com", country: "Botswana", contact: "(511) 938-9617", address: "661 Perez Run Apt. 778", service: "UI/UX Design & Development", total: 2771, balance: 0, issuedDate: "26 May 2026", dueDate: "24 May 2026", invoiceStatus: "Paid", avatarColor: "from-fuchsia-500 to-purple-700" },
  { id: "4993", name: "Christina Collier", company: "Wilson-Lee LLC", companyEmail: "williamshenry@moon-smith.com", country: "Ecuador", contact: "(593) 542-0426", address: "074 Long Union", service: "Template Customization", total: 2713, balance: 815, issuedDate: "17 May 2026", dueDate: "14 May 2026", invoiceStatus: "Partial Payment", avatarColor: "from-cyan-500 to-teal-700" },
  { id: "4994", name: "David Sanchez", company: "Marshall-Lewis Group", companyEmail: "scott37@johnson.com", country: "Greenland", contact: "(965) 363-1320", address: "5763 Ortega Wells Suite 100", service: "Website Redesign", total: 5293, balance: 0, issuedDate: "11 May 2026", dueDate: "21 May 2026", invoiceStatus: "Paid", avatarColor: "from-indigo-500 to-violet-700" },
  { id: "4995", name: "Mrs. Helen Clark", company: "Manning-Schmidt PLC", companyEmail: "ravensally@bell.com", country: "Heard Island", contact: "(366) 295-9408", address: "73666 Pace Brook", service: "UI/UX Design & Development", total: 5612, balance: -202, issuedDate: "13 May 2026", dueDate: "07 May 2026", invoiceStatus: "Paid", avatarColor: "from-emerald-500 to-teal-700" },
  { id: "4996", name: "Mark Howard", company: "Pollard-Garcia LLC", companyEmail: "elizabethstone@hayes.com", country: "Belarus", contact: "(283) 633-1721", address: "3528 Wesley Walks Suite 057", service: "Software Development", total: 4131, balance: 815, issuedDate: "23 May 2026", dueDate: "10 May 2026", invoiceStatus: "Past Due", avatarColor: "from-violet-500 to-purple-700" },
  { id: "4997", name: "Jennifer Diaz", company: "Wagner LLC", companyEmail: "powelldavid@harris-medina.biz", country: "Sao Tome and Principe", contact: "(584) 232-5301", address: "5891 Wright Cove Suite 333", service: "UI/UX Design & Development", total: 4620, balance: 0, issuedDate: "07 May 2026", dueDate: "03 May 2026", invoiceStatus: "Paid", avatarColor: "from-rose-500 to-pink-700" },
  { id: "5001", name: "Marcus Thompson", company: "LUXE Brand Holdings", companyEmail: "marcus@luxeholdings.com", country: "United Kingdom", contact: "(415) 555-0142", address: "1 Mayfair Place, London", service: "Watches & Jewelry · Royal Oak", total: 142000, balance: 142000, issuedDate: "07 May 2026", dueDate: "21 May 2026", invoiceStatus: "Sent", avatarColor: "from-amber-500 to-orange-700" },
];

export const INVOICE_LINE_ITEMS = [
  { item: "Premium Branding Package", description: "Branding & Promotion", hours: 48, qty: 1, total: 32 },
  { item: "Social Media", description: "Social media templates", hours: 42, qty: 1, total: 28 },
  { item: "Web Design", description: "Web designing package", hours: 46, qty: 1, total: 24 },
  { item: "SEO", description: "Search engine optimization", hours: 40, qty: 1, total: 22 },
];

export function getInvoiceById(id: string): Invoice | undefined {
  return INVOICES.find((i) => i.id === id);
}

export function fmtMoney(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}
