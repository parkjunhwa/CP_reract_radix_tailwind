"use client";

import * as Form from "@radix-ui/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EcommerceProductAddPage() {
  return (
    <div className="space-y-3 pb-0">
      <Form.Root className="panel p-5 space-y-3">
        {(
          [
            ["Product name", "text", "Limited edition tote", "product_name"],
            ["SKU", "text", "LX-NEW-101", "sku"],
            ["Base price (USD)", "number", "1299", "base_price"],
          ] as const
        ).map(([label, type, ph, name]) => (
          <Form.Field key={name} name={name} className="block space-y-1.5">
            <Form.Label asChild>
              <Label className="t-text-50 text-xs font-medium">{label}</Label>
            </Form.Label>
            <Form.Control asChild>
              <Input type={type} placeholder={ph} className="h-10 text-sm" />
            </Form.Control>
          </Form.Field>
        ))}
        <Form.Submit asChild>
          <Button type="submit" className="w-full sm:w-auto">Save draft</Button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
