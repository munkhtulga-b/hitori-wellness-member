"use client";

import { usePurchaseStore } from "@/app/_store/purchase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Template({ children }) {
  const router = useRouter();
  const purchaseBody = usePurchaseStore((state) => state.getBody());

  useEffect(() => {
    setTimeout(() => {
      if (!purchaseBody.branch) {
        router.push("/home/");
      }
    }, 1500);
  }, [purchaseBody]);

  return <>{children}</>;
}
