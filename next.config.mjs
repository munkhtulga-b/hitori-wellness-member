/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: "/",
      destination: "/home",
      permanent: true,
    },
  ],
  env: {
    APP_VERSION: "1.0.0",
  },
};

export default nextConfig;
