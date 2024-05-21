"use server";

import $api from "@/app/_api";
import { cookies } from "next/headers";

export const authLogin = async (params) => {
  const { isOk, data } = await $api.auth.login(params);
  if (isOk) {
    cookies().set("token", data?.tokens?.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      //   sameSite: "strict",
    });
    cookies().set("access_token", data?.tokens?.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      //   sameSite: "strict",
    });
    return { isOk, data };
  }
  return null;
};
