"use client";

import { usePurchaseStore } from "@/app/_store/purchase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Template({ children }) {
  const router = useRouter();
  const purchaseBody = usePurchaseStore((state) => state.getBody());

  useEffect(() => {
    if (purchaseBody) {
      setTimeout(() => {
        if (!purchaseBody.branch) {
          router.push("/home/profile/purchase");
        }
      }, 1000);
      // if (purchaseBody.branch && !purchaseBody.plan) {
      //   router.push("/home/profile/purchase/plan");
      // }
    } else {
      router.push("/home/profile");
    }
  }, [purchaseBody]);

  return <>{children}</>;
}
