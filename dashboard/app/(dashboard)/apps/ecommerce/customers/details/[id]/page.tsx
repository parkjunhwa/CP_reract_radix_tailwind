import Link from "next/link";

type Props = { params: Promise<{ id: string }> };

export default async function EcommerceCustomerDetailsPage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="space-y-4 pb-4 max-w-2xl">
      <div className="panel p-5">
        <p className="t-text-40 text-xs uppercase tracking-wide mb-1">Customer</p>
        <h2 className="t-text font-semibold text-lg">ID · {id}</h2>
        <p className="t-text-40 text-sm mt-2">
          Profile placeholder — map to Vuexy&apos;s `/apps/ecommerce/customers/details/[id]` shell when porting CRM data.
        </p>
        <Link href="/apps/ecommerce/customers/list" className="inline-block mt-4 text-xs text-violet-400 font-semibold hover:underline">
          Back to list
        </Link>
      </div>
    </div>
  );
}
