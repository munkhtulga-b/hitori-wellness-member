"use client";

import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import NavigationBar from "../_components/home/NavigationBar";

const UserAuthenticatedLayout = ({ children }) => {
  const token = Cookies.get("token");

  if (!token) {
    redirect("/auth/login");
  }

  return (
    <div className="tw-flex tw-flex-col">
      <NavigationBar />
      <div className="tw-p-4">{children}</div>
    </div>
  );
};

export default UserAuthenticatedLayout;
