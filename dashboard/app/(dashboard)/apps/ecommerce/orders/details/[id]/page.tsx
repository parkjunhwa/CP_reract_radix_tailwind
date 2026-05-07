import Link from "next/link";

type Props = { params: Promise<{ id: string }> };

export default async function EcommerceOrderDetailsPage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="space-y-3 pb-0">
      <div className="panel p-5">
        <p className="t-text-40 text-sm">
          Detail view placeholder for order <span className="t-text font-semibold">#{id}</span> — full-version uses live order payload and timeline components.
        </p>
        <Link href="/apps/ecommerce/orders/list" className="inline-block mt-4 text-xs text-violet-400 font-semibold hover:underline">
          Back to list
        </Link>
      </div>
    </div>
  );
}
