import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AppProvider from "./_provider/AppProvider";

const fontFamily = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata = {
  title: "Mirror Fit",
  description: "Gym Reservation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontFamily.className}>
        <AntdRegistry>
          <AppProvider fontFamily={fontFamily}>{children}</AppProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
