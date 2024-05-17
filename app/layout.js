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
      {/* <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-B53SHX53M8"
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-B53SHX53M8');`}
        </Script>
      </head> */}
      <body className={fontFamily.className}>
        <AntdRegistry>
          <ToastContainer pauseOnFocusLoss={false} />
          <AppProvider fontFamily={fontFamily}>{children}</AppProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
