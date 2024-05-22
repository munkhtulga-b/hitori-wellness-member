"use server";

// import $api from "@/app/_api";
import { cookies } from "next/headers";

const cookieStore = cookies();

export const authLogin = async (testToken) => {
  cookieStore.set("test-token", testToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};
