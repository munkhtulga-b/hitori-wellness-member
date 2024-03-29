"use client";

import Cookies from "js-cookie";
import MainHeader from "../_components/auth/MainHeader";
import { motion } from "framer-motion";
import { usePathname, redirect } from "next/navigation";
import { Suspense, useLayoutEffect, useState } from "react";

export default function AuthLayout({ children }) {
  const pathName = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      redirect("/home");
    }
    setIsMounted(true);
  }, []);

  return (
    <div className="tw-flex tw-flex-col">
      {isMounted ? (
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
      ) : null}
    </div>
  );
}
