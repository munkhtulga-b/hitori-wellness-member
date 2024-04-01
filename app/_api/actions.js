"use server";

import { redirect } from "next/navigation";

export const authRedirect = () => {
  redirect("/auth/login");
};
