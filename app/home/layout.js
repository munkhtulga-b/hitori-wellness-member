"use client";

import Cookies from "js-cookie";
import NavigationBar from "../_components/home/NavigationBar";
import { useLayoutEffect, useState } from "react";
import { redirect } from "next/navigation";

const UserAuthenticatedLayout = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      redirect("/auth/login");
    }
    setIsMounted(true);
  }, []);

  return (
    <div className="tw-flex tw-flex-col">
      {isMounted ? (
        <>
          <NavigationBar />
          <div className="tw-p-4">{children}</div>
        </>
      ) : null}
    </div>
  );
};

export default UserAuthenticatedLayout;
