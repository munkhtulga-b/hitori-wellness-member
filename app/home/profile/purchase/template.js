"use client";

import { usePurchaseStore } from "@/app/_store/purchase";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Template({ children }) {
  const router = useRouter();
  const purchaseBody = usePurchaseStore((state) => state.getBody());

  useLayoutEffect(() => {
    if (purchaseBody) {
      if (!purchaseBody.branch) {
        router.push("/home/profile/purchase");
      }
      // if (purchaseBody.branch && !purchaseBody.plan) {
      //   router.push("/home/profile/purchase/plan");
      // }
    } else {
      router.push("/home/profile");
    }
  }, []);

  return <>{children}</>;
}
