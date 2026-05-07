import Link from "next/link";

type Props = { params: Promise<{ id: string }> };

export default async function EcommerceCustomerDetailsPage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="space-y-3 pb-0">
      <div className="panel p-5">
        <p className="t-text-40 text-sm">
          Profile placeholder for customer <span className="t-text font-semibold">ID · {id}</span> — map to the full-version{" "}
          <code className="t-text-60">/apps/ecommerce/customers/details/[id]</code> shell when porting CRM data.
        </p>
        <Link href="/apps/ecommerce/customers/list" className="inline-block mt-4 text-xs text-violet-400 font-semibold hover:underline">
          Back to list
        </Link>
      </div>
    </div>
  );
}
