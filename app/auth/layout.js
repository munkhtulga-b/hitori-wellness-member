"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import MainHeader from "../_components/auth/MainHeader";

export default function AuthLayout({ children }) {
  const path = usePathname();
  return (
    <main className="tw-flex tw-flex-col">
      {path === "/auth/login" && <MainHeader />}
      <motion.div
        key={path}
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </main>
  );
}
