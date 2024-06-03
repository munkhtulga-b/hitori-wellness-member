// import Script from "next/script";
import Head from "next/head";
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
      <Head>
        {
          <meta
            name="robots"
            content={process.env.NEXT_PUBLIC_META_CONTENT}
          ></meta>
        }
      </Head>
      <body className={fontFamily.className}>
        <AntdRegistry>
          <ToastContainer pauseOnFocusLoss={false} />
          <AppProvider fontFamily={fontFamily}>{children}</AppProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
