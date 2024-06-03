export default function robots() {
  return {
    rules: {
      userAgent: "*",
      [process.env.NEXT_PUBLIC_APP_ENV === "prod" ? "allow" : "disallow"]: "/",
    },
    sitemap: null,
  };
}
