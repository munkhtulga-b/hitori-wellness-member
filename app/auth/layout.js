"use client";

import MainHeader from "../_components/auth/MainHeader";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

export default function AuthLayout({ children }) {
  const pathName = usePathname();

  return (
    <div className="tw-flex tw-flex-col tw-overflow-auto">
      <>
        <Suspense fallback={<></>}>
          <MainHeader />
        </Suspense>
        <motion.div
          key={pathName}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Suspense fallback={<></>}>{children}</Suspense>
        </motion.div>
      </>
    </div>
  );
}
