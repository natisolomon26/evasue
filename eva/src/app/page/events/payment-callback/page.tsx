// src/app/events/payment-callback/page.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const status = searchParams.get("status");
    const trx_ref = searchParams.get("trx_ref");

    if (status === "success") {
      alert(`Payment successful! Transaction: ${trx_ref}`);
    } else {
      alert(`Payment failed or cancelled. Transaction: ${trx_ref}`);
    }

    // Redirect to events page after callback
    router.push("/events");
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-medium">Processing payment...</p>
    </div>
  );
}
