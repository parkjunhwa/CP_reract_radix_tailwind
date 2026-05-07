import Link from "next/link";

type Props = { params: Promise<{ id: string }> };

export default async function EcommerceOrderDetailsPage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="space-y-4 pb-4 max-w-2xl">
      <div className="panel p-5">
        <p className="t-text-40 text-xs uppercase tracking-wide mb-1">Order</p>
        <h2 className="t-text font-semibold text-lg">#{id}</h2>
        <p className="t-text-40 text-sm mt-2">
          Detail view placeholder — full-version uses live order payload and timeline components.
        </p>
        <Link href="/apps/ecommerce/orders/list" className="inline-block mt-4 text-xs text-violet-400 font-semibold hover:underline">
          Back to list
        </Link>
      </div>
    </div>
  );
}
