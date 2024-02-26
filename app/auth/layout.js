"use client";

import Cookies from "js-cookie";
import MainHeader from "../_components/auth/MainHeader";
import { motion } from "framer-motion";
import { usePathname, redirect } from "next/navigation";

export default function AuthLayout({ children }) {
  const token = Cookies.get("token");

  if (token) {
    redirect("/");
  }

  const pathName = usePathname();

  return (
    <main className="tw-flex tw-flex-col">
      <MainHeader />
      <motion.div
        key={pathName}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </main>
  );
}
