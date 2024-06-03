// import Script from "next/script";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AppProvider from "./_provider/AppProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fontFamily = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: process.env.BASE_META_TITLE,
    template: "%s | " + process.env.BASE_META_TITLE,
  },
  description: process.env.BASE_META_DESCRIPTION,
  robots: {
    index: process.env.NEXT_PUBLIC_APP_ENV === "prod" ? true : false,
    follow: process.env.NEXT_PUBLIC_APP_ENV === "prod" ? true : false,
    googleBot: {
      index: process.env.NEXT_PUBLIC_APP_ENV === "prod" ? true : false,
      follow: process.env.NEXT_PUBLIC_APP_ENV === "prod" ? true : false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontFamily.className}>
        <AntdRegistry>
          <ToastContainer pauseOnFocusLoss={false} />
          <AppProvider fontFamily={fontFamily}>{children}</AppProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
