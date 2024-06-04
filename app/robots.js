export default function robots() {
  return {
    rules: {
      userAgent: "*",
      // made it dynamic for future use
      [process.env.NEXT_PUBLIC_APP_ENV === "prod" ? "disallow" : "disallow"]:
        "/",
    },
    sitemap: null,
  };
}
