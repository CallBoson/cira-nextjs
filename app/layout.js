import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import "./globals.css";
import { Navbar } from "./components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GlobalChatPro",
  description: "语境智能回应助手",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body className={`${inter.className} dark`}>
        <NextUIProvider>
          <Navbar />
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
