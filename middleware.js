import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("token")?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const refreshReponse = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_DEV_BASE_URL
        : process.env.NEXT_PUBLIC_PROD_BASE_URL
    }/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    }
  );

  const data = await refreshReponse.json();

  if (refreshReponse.ok && refreshReponse.status !== 401) {
    const response = NextResponse.next();
    response.cookies.set("access_token", data.access_token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    return response;
  } else {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/home/:path*",
};
