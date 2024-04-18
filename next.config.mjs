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
    BASE_META_TITLE: "HITORI WELLNESS",
    BASE_META_DESCRIPTION: "Gym Reservation",
    BASE_IMAGE_URL: "storage.googleapis.com/gym-reservation/",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com/gym-reservation/",
        port: "",
        pathname: "/gym/**",
      },
    ],
  },
};

export default nextConfig;
