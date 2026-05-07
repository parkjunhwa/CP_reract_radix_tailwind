"use client";

export default function EcommerceSettingsPage() {
  return (
    <div className="space-y-4 pb-4 max-w-2xl">
      <div className="panel p-5">
        <h2 className="t-text font-semibold text-lg">eCommerce · Settings</h2>
        <p className="t-text-40 text-sm mt-1">Regional tax, gateways, and shipping profiles (static shell).</p>
      </div>
      <div className="panel p-5 space-y-4">
        <label className="flex items-center justify-between gap-4 cursor-pointer">
          <span className="t-text-70 text-sm">Enable Apple Pay checkout</span>
          <input type="checkbox" defaultChecked className="accent-violet-500" />
        </label>
        <label className="flex items-center justify-between gap-4 cursor-pointer">
          <span className="t-text-70 text-sm">Require signature over $10k cart</span>
          <input type="checkbox" defaultChecked className="accent-violet-500" />
        </label>
        <label className="flex items-center justify-between gap-4 cursor-pointer">
          <span className="t-text-70 text-sm">Expose referral codes during checkout</span>
          <input type="checkbox" className="accent-violet-500" />
        </label>
      </div>
    </div>
  );
}
